import { Cards } from '@/components/landing/Cards';
import { Details } from '@/components/landing/Details';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { OpenSource } from '@/components/landing/OpenSource';

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <>
      <Header />
      <Hero locale={locale} />
      <Cards locale={locale} />
      <Details locale={locale} />
      <OpenSource locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
