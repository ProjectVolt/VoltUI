'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@mantine/form';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useAtom } from 'jotai';
import Link from 'next/link';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Anchor, Button, Divider, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import classes from './form.module.css';
import { tokenAtom } from '@/atoms/tokenAtom';
import { login } from '@/data';
import { useAtomEffect } from '@/utils/useAtomEffect';

export function Form() {
  const { t } = useTranslation();
  const router = useRouter();
  const [, setToken] = useAtom(tokenAtom);

  useAtomEffect(
    useCallback(
      (get) => {
        const currentToken = get(tokenAtom);
        if (currentToken) {
          router.push('/dashboard');
        }
      },
      [tokenAtom]
    )
  );

  const schema = yup.object().shape({
    username: yup
      .string()
      .min(3, t('login-form-username-min'))
      .max(50, t('login-form-username-max'))
      .required(t('login-form-username-required')),
    password: yup
      .string()
      .min(8, t('login-form-password-min'))
      .max(250, t('login-form-password-max'))
      .required(t('login-form-password-required')),
  });

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: { username: string; password: string }) => {
    setLoading(true);
    login(values.username, values.password)
      .then((result: string) => {
        setToken(result);
      })
      .catch((error) => {
        setLoading(false);
        let message: string;
        let isInvalidCredentials = false;
        switch (error.message) {
          case 'invalid-credentials':
            message = t('login-failed-notification-message');
            isInvalidCredentials = true;
            break;
          case 'invalid-data':
            message = t('login-failed-bad-request-notification-message');
            break;
          case 'unexpected-error':
          case 'token-not-found':
          default:
            message = t('login-failed-server-error-notification-message');
            break;
        }
        if (isInvalidCredentials) {
          form.setErrors({
            username: message,
            password: message,
          });
        }
        notifications.show({
          title: t('login-failed-notification-title'),
          message,
          color: 'red',
        });
      });
  };

  return (
    <div className={classes.container}>
      <h2>{t('login-form-title')}</h2>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label={t('login-form-username-label')}
          size="md"
          radius="xl"
          color="teal"
          {...form.getInputProps('username')}
        />
        <TextInput
          label={t('login-form-password-label')}
          type="password"
          size="md"
          radius="xl"
          color="teal"
          {...form.getInputProps('password')}
        />
        <Button loading={loading} type="submit" color="teal" size="lg" radius="xl">
          {t('login-form-submit-button')}
        </Button>
        <Divider my="xs" label={t('login-form-no-account')} labelPosition="center" />
        <Button
          component={Link}
          href="/register"
          variant="outline"
          color="gray"
          size="lg"
          radius="xl"
        >
          {t('login-form-register')}
        </Button>
      </form>
      <Divider
        my="xs"
        style={{ width: '300px' }}
        label={
          <>
            {t('login-form-forgot-password')}
            &nbsp;
            <Anchor component="button" inherit>
              {t('login-form-forgot-password-reset')}
            </Anchor>
          </>
        }
        labelPosition="center"
      />
    </div>
  );
}
