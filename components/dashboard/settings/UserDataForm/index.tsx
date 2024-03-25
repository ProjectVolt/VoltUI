import { useEffect, useState } from 'react';
import { Box, Button, Flex, LoadingOverlay, TextInput } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useForm, yupResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import * as yup from 'yup';
import { useAtom } from 'jotai';
import { tokenAtom } from '@/atoms/tokenAtom';
import { updateUser, useUser } from '@/data';
import classes from './userDataForm.module.css';

export function UserDataForm() {
  const { t } = useTranslation();
  const [token] = useAtom(tokenAtom);
  const { user, error, isLoading } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (error) {
      notifications.show({
        title: t('user-menu-error-title'),
        message: t('user-menu-error-message'),
        color: 'red',
      });
    } else if (user) {
      setLoading(false);
      form.setValues({
        github: user.github ?? '',
        school: user.school ?? '',
      });
    }
  }, [user, error, isLoading]);

  const schema = yup.object().shape({
    github: yup.string().max(60, t('user-settings-update-github-max')),
    school: yup.string().max(60, t('user-settings-update-school-max')),
  });

  const form = useForm({
    initialValues: {
      github: '',
      school: '',
    },
    validate: yupResolver(schema),
  });

  const [updating, setUpdating] = useState(false);

  const update = async (values: { github: string; school: string }) => {
    setUpdating(true);
    updateUser(token ?? '', user!.id, values)
      .then(() => {
        setUpdating(false);
        notifications.show({
          title: t('user-settings-update-success-title'),
          message: t('user-settings-update-success-message'),
          color: 'teal',
        });
      })
      .catch((err) => {
        setUpdating(false);
        const msg =
          err.message === 'invalid-data'
            ? 'user-settings-update-invalid-data'
            : 'user-settings-update-failure-message';
        notifications.show({
          title: t('user-settings-update-failure-title'),
          message: t(msg),
          color: 'red',
        });
      });
  };

  return (
    <div className={classes.container}>
      <h3>{t('user-settings-header-subtitle')}</h3>
      <Box pos="relative" miw={280} maw={350}>
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
        <form onSubmit={form.onSubmit(update)}>
          <Flex direction="column" gap="lg">
            <TextInput
              label={t('user-settings-github-label')}
              size="md"
              radius="lg"
              color="teal"
              {...form.getInputProps('github')}
            />
            <TextInput
              label={t('user-settings-school-label')}
              size="md"
              radius="lg"
              color="teal"
              {...form.getInputProps('school')}
            />
            <Button
              loading={updating}
              mt="md"
              variant="outline"
              type="submit"
              color="teal"
              size="md"
              radius="xl"
            >
              {t('user-settings-save-button')}
            </Button>
          </Flex>
        </form>
      </Box>
    </div>
  );
}
