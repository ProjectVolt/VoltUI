'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@mantine/core';
import classes from './header.module.css';

export function Buttons() {
  const { t } = useTranslation();
  return (
    <div className={classes.buttons}>
      <Button variant="outline" color="gray" size="md" radius="xl">
        {t('login')}
      </Button>
      <Button variant="outline" color="teal" size="md" radius="xl">
        {t('signup')}
      </Button>
    </div>
  );
}
