import { useEffect } from 'react';
import { Badge, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import classes from './lastSubmission.module.css';
import { BIND_STATUS } from '@/components/shared/Binds';
import { Problem, useLastSubmission } from '@/data';

export function LastSubmission({
  submissionCount,
  problem,
  mutateProblem,
}: {
  submissionCount: number;
  problem: Problem;
  mutateProblem: () => void;
}) {
  const { t } = useTranslation();
  const { submission, isLoading, error, mutate } = useLastSubmission(problem.id);
  useEffect(() => {
    if (!isLoading && error) {
      notifications.show({
        title: t('user-problem-view-code-editor-last-submission-error-title'),
        message: t('user-problem-view-code-editor-last-submission-error-message'),
        color: 'red',
      });
    }
  }, [error, isLoading]);
  useEffect(() => {
    if (submissionCount > 0) {
      mutate();
    }
  }, [submissionCount]);
  useEffect(() => {
    if (!isLoading && !error && submission) {
      if (submission.status === 'PENDING') {
        const interval = setInterval(() => {
          if (submission.status === 'PENDING') {
            mutate();
          } else {
            mutateProblem();
            clearInterval(interval);
          }
        }, 5000);
        return () => clearInterval(interval);
      }
      mutateProblem();
    }
    return () => {};
  }, [submission, isLoading]);
  return (
    <>
      <Button
        component={Link}
        href={`/dashboard/problems/submissions/${submission?.id}`}
        className={classes.button}
        loading={isLoading}
        leftSection={
          submission ? (
            <Badge size="xs" variant="outline" color={BIND_STATUS[submission!.status][0]} circle />
          ) : undefined
        }
        variant="filled"
        color="#495057"
        size="xs"
        disabled={!submission}
      >
        {submission ? (
          <>{t('user-problem-view-code-editor-last-submission')}</>
        ) : (
          <>{t('user-problem-view-code-editor-no-last-submission')}</>
        )}
      </Button>
    </>
  );
}
