'use client';

import { useState } from 'react';
import { useForm } from '@mantine/form';
import { yupResolver } from 'mantine-form-yup-resolver';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Anchor, Button, Divider, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Link from 'next/link';
import classes from './form.module.css';

export function Form() {
  const { t } = useTranslation();

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

  const handleSubmit = (values) => {
    console.log(values);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      form.setErrors({
        username: t('login-failed-notification-message'),
        password: t('login-failed-notification-message'),
      });
      notifications.show({
        title: t('login-failed-notification-title'),
        message: t('login-failed-notification-message'),
        color: 'red',
      });
    }, 2000);
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
