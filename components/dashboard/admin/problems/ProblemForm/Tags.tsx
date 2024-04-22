import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { TagsInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { GetInputPropsReturnType } from '@mantine/form/lib/types';
import { Tag, addTag, useJwtData } from '@/data';

export function Tags({ value, onChange, onFocus, onBlur, error }: GetInputPropsReturnType) {
  const { t } = useTranslation();
  const { token, error: jwtError } = useJwtData();
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    setTags(value);
  }, [value]);
  const updateTags = async (newTags: string[]) => {
    if (!token || jwtError) {
      notifications.show({
        title: t('admin-problem-list-tags-error-title'),
        message: t('admin-problem-list-tags-error-message'),
        color: 'red',
      });
      return;
    }
    const added = newTags.filter((tag) => !tags.map((i: Tag) => i.name).includes(tag));
    const next = [...tags.filter((tag) => newTags.includes(tag.name))];
    Promise.all(added.map((tag) => addTag(token, tag)))
      .then((res) => {
        setTags([...next, ...res]);
        onChange([...next, ...res]);
      })
      .catch(() => {
        notifications.show({
          title: t('admin-problem-list-tags-error-title'),
          message: t('admin-problem-list-tags-error-message'),
          color: 'red',
        });
      });
  };
  return (
    <>
      {error && <div>{error}</div>}
      <TagsInput
        onFocus={onFocus}
        onBlur={onBlur}
        radius="md"
        value={tags.map((tag) => tag.name)}
        placeholder={t('admin-problem-add-form-tags-placeholder')}
        onChange={updateTags}
      />
    </>
  );
}
