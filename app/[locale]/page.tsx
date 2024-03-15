import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <>
      <Header />
      <Hero locale={locale} />
    </>
  );
}
