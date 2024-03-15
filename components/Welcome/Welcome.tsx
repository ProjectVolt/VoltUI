'use client';

import { Title, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import classes from './Welcome.module.css';

export function Welcome() {
  const { t } = useTranslation();
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        {t('title')}{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Volt
        </Text>
      </Title>
    </>
  );
}
