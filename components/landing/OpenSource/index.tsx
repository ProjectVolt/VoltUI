import { Button } from '@mantine/core';
import { IoLogoGithub } from 'react-icons/io5';
import Link from 'next/link';
import classes from './opensource.module.css';
import initTranslations from '@/app/i18n';

export async function OpenSource({ locale }: { locale: string }) {
  const { t } = await initTranslations(locale, ['landing']);
  return (
    <div className={classes.container}>
      <h1>{t('opensource-title')}</h1>
      <h2>{t('opensource-description')}</h2>
      <Button
        component={Link}
        href="https://github.com/ProjectVolt"
        variant="filled"
        color="black"
        size="xl"
        radius="xl"
      >
        <IoLogoGithub style={{ marginRight: '10px' }} />
        GitHub
      </Button>
    </div>
  );
}
