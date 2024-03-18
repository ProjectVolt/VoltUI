import { Button } from '@mantine/core';
import initTranslations from '@/app/i18n';
import classes from './hero.module.css';
import { Illustration } from './illustration';

export async function Hero({ locale }: { locale: string }) {
  const { t } = await initTranslations(locale, ['landing']);
  return (
    <>
      <div className={classes.container}>
        <div>
          <h1>{t('title')}</h1>
          <p>{t('description')}</p>
          <Button variant="filled" color="teal" size="xl" radius="xl">
            {t('signup-cta')}
          </Button>
        </div>
        <Illustration />
      </div>
    </>
  );
}
