import { useEffect } from 'react';
import { Badge, Tooltip } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { IoPersonOutline } from 'react-icons/io5';
import { useUserById } from '@/data';

export function SubmissionAuthor({ authorId }: { authorId: number }) {
  const { t } = useTranslation();
  const { user, error, isLoading } = useUserById(authorId);
  useEffect(() => {
    if (!isLoading && error) {
      notifications.show({
        title: t('user-submission-view-author-error-title'),
        message: t('user-submission-view-author-error-message'),
        color: 'red',
      });
    }
  }, [isLoading]);
  return (
    <Tooltip
      color="gray"
      label={t('user-submission-view-tooltip-author')}
      position="bottom"
      withArrow
    >
      <Badge variant="light" color="gray" leftSection={<IoPersonOutline />}>
        {isLoading ? <>...</> : user?.username}
      </Badge>
    </Tooltip>
  );
}
