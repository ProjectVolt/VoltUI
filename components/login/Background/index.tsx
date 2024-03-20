import { PropsWithChildren } from 'react';
import BgImg from '@/public/login-bg-xl.svg';
import classes from './background.module.css';

export function Background({ children }: PropsWithChildren<{}>) {
  return (
    <div
      className={classes.background}
      style={{
        backgroundImage: `url(${BgImg.src})`,
      }}
    >
      {children}
    </div>
  );
}
