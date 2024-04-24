'use client';

import matter from 'gray-matter';
import { useTranslation } from 'react-i18next';
import { Problem } from '@/data';
import classes from '../problems.module.css';
import { RenderMarkdown } from '@/components/shared/RenderMarkdown';

export function ProblemContent({ problem }: { problem: Problem }) {
  const { t } = useTranslation();
  const { content } = matter(problem.description);
  return (
    <div className={classes.viewContent}>
      <RenderMarkdown markdown={content} />
      {problem.author && (
        <small>
          {t('user-problem-view-content-author')}
          {problem.author}
        </small>
      )}
    </div>
  );
}
