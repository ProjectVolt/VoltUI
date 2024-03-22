import Image from 'next/image';
import RawLogo from '@/public/logo.svg';

export function Logo({ width, height }: { width?: number; height?: number }) {
  return <Image priority src={RawLogo} alt="Volt" width={width ?? 154} height={height ?? 64} />;
}
