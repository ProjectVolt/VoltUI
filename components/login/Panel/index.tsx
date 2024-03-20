import { PropsWithChildren } from 'react';
import classes from './panel.module.css';

export function Panel({ children }: PropsWithChildren<{}>) {
  return <div className={classes.container}>{children}</div>;
}
