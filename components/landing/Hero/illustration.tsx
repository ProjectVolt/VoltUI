import Image from 'next/image';
import LandingIllustration from '@/public/landing-illustration.svg';

export function Illustration() {
  return (
    <Image priority width={470} height={365} src={LandingIllustration} alt="Illustration of code" />
  );
}
