'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@mantine/form';
import { yupResolver } from 'mantine-form-yup-resolver';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Button, Divider, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Link from 'next/link';
import { register } from '@/data/register';
import { useAtomEffect } from '@/utils/useAtomEffect';
import { tokenAtom } from '@/atoms/tokenAtom';
import classes from './form.module.css';

export function Form() {
  const { t } = useTranslation();
  const router = useRouter();

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
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9_!#$%&'*+/=?``{|}~^.-]+@[a-zA-Z0-9.-]+$/,
        t('register-form-email-invalid')
      )
      .required(t('register-form-email-required')),
    username: yup
      .string()
      .min(3, t('login-form-username-min'))
      .max(50, t('login-form-username-max'))
      .matches(/^[a-zA-Z0-9_]+$/, t('register-form-username-invalid'))
      .required(t('login-form-username-required')),
    password: yup
      .string()
      .min(8, t('login-form-password-min'))
      .max(250, t('login-form-password-max'))
      .required(t('login-form-password-required')),
    school: yup.string().max(100, t('register-form-school-max')).optional(),
  });

  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
      school: '',
    },

    validate: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: {
    email: string;
    username: string;
    password: string;
    school?: string;
  }) => {
    setLoading(true);
    register(values.email, values.username, values.password, values.school)
      .then(() => router.push('/login'))
      .catch((error) => {
        setLoading(false);
        let message: string;
        switch (error.message) {
          case 'username-already-exists':
            message = t('register-failed-notification-message-username-taken');
            form.setErrors({
              username: message,
            });
            break;
          case 'email-already-exists':
            message = t('register-failed-notification-message-email-taken');
            form.setErrors({
              email: message,
            });
            break;
          case 'registration-not-allowed':
            message = t('register-failed-notification-message-registration-not-allowed');
            break;
          case 'invalid-data':
            message = t('register-failed-notification-message-bad-request');
            break;
          case 'unexpected-error':
          default:
            message = t('register-notification-message-server-error');
            break;
        }
        notifications.show({
          title: t('register-failed-notification-title'),
          message,
          color: 'red',
        });
      });
  };

  return (
    <div className={classes.container}>
      <h2>{t('register-form-title')}</h2>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label={t('register-form-email-label')}
          size="md"
          radius="xl"
          color="teal"
          withAsterisk
          {...form.getInputProps('email')}
        />
        <TextInput
          label={t('login-form-username-label')}
          size="md"
          radius="xl"
          color="teal"
          withAsterisk
          {...form.getInputProps('username')}
        />
        <TextInput
          label={t('login-form-password-label')}
          type="password"
          size="md"
          radius="xl"
          color="teal"
          withAsterisk
          {...form.getInputProps('password')}
        />
        <TextInput
          label={t('register-form-school-label')}
          description={t('register-form-school-description')}
          size="md"
          radius="xl"
          color="teal"
          {...form.getInputProps('school')}
        />
        <Button loading={loading} type="submit" color="teal" size="lg" radius="xl">
          {t('login-form-register')}
        </Button>
        <Divider my="xs" label={t('register-already-member')} labelPosition="center" />
        <Button component={Link} href="/login" variant="outline" color="gray" size="lg" radius="xl">
          {t('login-form-submit-button')}
        </Button>
      </form>
    </div>
  );
}
