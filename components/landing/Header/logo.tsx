import Image from 'next/image';
import RawLogo from '@/public/logo.svg';

export function Logo() {
  return <Image priority src={RawLogo} alt="Volt" width={154} height={64} />;
}
