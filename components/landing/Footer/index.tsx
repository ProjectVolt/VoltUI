import initTranslations from '@/app/i18n';
import classes from './footer.module.css';

export async function Footer({ locale }: { locale: string }) {
  const { t } = await initTranslations(locale, ['landing']);
  return (
    <footer className={classes.container}>
      <small>{t('footer')}</small>
    </footer>
  );
}
