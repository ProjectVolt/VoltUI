import React from 'react';
import initTranslations from '@/app/i18n';
import TranslationProvider from '@/app/[locale]/TranslationProvider';
import { RedirectNotLoggedIn } from '@/components/shared/redirect';
import { ShellLayout } from '@/components/dashboard/ShellLayout';
import { SwrWrapper } from '@/components/shared/swr';

const i18nNamespaces = ['dashboard'];

export default async function Layout({ children, params: { locale } }: any) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationProvider locale={locale} resources={resources} namespaces={i18nNamespaces}>
      <RedirectNotLoggedIn>
        <SwrWrapper>
          <ShellLayout>{children}</ShellLayout>
        </SwrWrapper>
      </RedirectNotLoggedIn>
    </TranslationProvider>
  );
}
