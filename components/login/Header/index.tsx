import { Logo } from '@/components/shared/logo';
import classes from './header.module.css';

export function Header() {
  return (
    <header className={classes.container}>
      <Logo />
    </header>
  );
}
