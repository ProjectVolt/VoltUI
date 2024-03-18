import initTranslations from '@/app/i18n';
import classes from './details.module.css';

export async function Details({ locale }: { locale: string }) {
  const { t } = await initTranslations(locale, ['landing']);
  return (
    <section className={classes.container}>
      <h1>{t('details-title')}</h1>
      <h2>{t('details-description')}</h2>
      <div className={classes.subContainer}>
        {[...Array(2).keys()]
          .map((i) => i + 1)
          .map((sub: number) => (
            <div className={classes.sub} key={sub}>
              <h3>{t(`details-sub${sub}-title`)}</h3>
              <div>
                {[...Array(4).keys()]
                  .map((i) => i + 1)
                  .map((i: number) => (
                    <>
                      <h4>
                        {t(`details-sub${sub}-detail${i}-title`)}
                        {' - '}
                      </h4>
                      <p>{t(`details-sub${sub}-detail${i}-description`)}</p>
                      <br />
                      <br />
                    </>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
