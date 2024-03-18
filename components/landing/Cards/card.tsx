import type React from 'react';
import classes from './cards.module.css';

export async function Card({
  icon,
  title,
  description,
}: {
  icon: React.ReactElement;
  title: string;
  description: string;
}) {
  return (
    <div className={classes.card}>
      {icon}
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
