import { useTranslation } from 'react-i18next';
import classes from './header.module.css';

export function Header() {
  const { t } = useTranslation();
  return (
    <div className={classes.container}>
      <h1>{t('user-settings-header-title')}</h1>
    </div>
  );
}
