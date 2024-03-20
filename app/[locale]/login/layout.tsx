import React from 'react';
import { Provider } from 'jotai';
import initTranslations from '@/app/i18n';
import TranslationProvider from '@/app/[locale]/TranslationProvider';

const i18nNamespaces = ['login'];

export default async function Layout({ children, params: { locale } }: any) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationProvider locale={locale} resources={resources} namespaces={i18nNamespaces}>
      <Provider>{children}</Provider>
    </TranslationProvider>
  );
}
