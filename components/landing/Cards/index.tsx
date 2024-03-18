import {
  IoBulbOutline,
  IoBarChartOutline,
  IoSchoolOutline,
  IoCodeSlashOutline,
} from 'react-icons/io5';
import initTranslations from '@/app/i18n';
import classes from './cards.module.css';
import { Card } from './card';

export async function Cards({ locale }: { locale: string }) {
  const { t } = await initTranslations(locale, ['landing']);
  return (
    <div className={classes.container}>
      <Card
        icon={<IoBulbOutline />}
        title={t('card1-title')}
        description={t('card1-description')}
      />
      <Card
        icon={<IoBarChartOutline />}
        title={t('card2-title')}
        description={t('card2-description')}
      />
      <Card
        icon={<IoSchoolOutline />}
        title={t('card3-title')}
        description={t('card3-description')}
      />
      <Card
        icon={<IoCodeSlashOutline />}
        title={t('card4-title')}
        description={t('card4-description')}
      />
    </div>
  );
}
