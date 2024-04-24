import { useEffect, useState } from 'react';
import { Badge, Skeleton, Tooltip } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import {
  IoPersonOutline,
  IoSparklesSharp,
  IoBowlingBallOutline,
  IoCheckmarkDoneOutline,
} from 'react-icons/io5';
import { Problem, useUserById } from '@/data';
import classes from '../problems.module.css';

export function ProblemHeader({ problem }: { problem: Problem }) {
  const { t } = useTranslation();
  const { user, isLoading, error } = useUserById(problem.addedBy);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      if (error) {
        notifications.show({
          title: t('user-problem-view-header-error-title'),
          message: t('user-problem-view-header-error-message'),
          color: 'red',
        });
      } else {
        setLoading(false);
      }
    }
  }, [isLoading]);

  if (loading) {
    return <Skeleton width="100%" height="80px" radius="lg" />;
  }

  return (
    <div className={classes.viewHeader}>
      <div>
        <h2>{problem.name}</h2>
        <Badge
          variant="light"
          ml="sm"
          color={
            {
              easy: 'blue',
              medium: 'orange',
              hard: 'red',
            }[problem.difficulty]
          }
        >
          {
            {
              easy: t('user-problem-view-difficulty-easy'),
              medium: t('user-problem-view-difficulty-medium'),
              hard: t('user-problem-view-difficulty-hard'),
            }[problem.difficulty]
          }
        </Badge>
      </div>
      <div>
        <Tooltip label={t('user-problem-view-header-added-by')} position="bottom" withArrow>
          <span className={classes.details}>
            <IoPersonOutline />
            <small>{user?.username}</small>
          </span>
        </Tooltip>
        <Tooltip label={t('user-problem-view-header-total')} position="bottom" withArrow>
          <span className={classes.details}>
            <IoSparklesSharp />
            <small>{problem.totalScore} punktów</small>
          </span>
        </Tooltip>
        <Tooltip label={t('user-problem-view-header-submission-count')} position="bottom" withArrow>
          <span className={classes.details}>
            <IoBowlingBallOutline />
            <small>{problem.submissionCount}</small>
          </span>
        </Tooltip>
        <Tooltip label={t('user-problem-view-header-accepted-count')} position="bottom" withArrow>
          <span className={classes.details}>
            <IoCheckmarkDoneOutline />
            <small>
              {problem.acceptedSubmissions}{' '}
              {problem.submissionCount > 0 ? (
                <>({(problem.acceptedSubmissions / problem.submissionCount) * 100}%)</>
              ) : (
                <></>
              )}
            </small>
          </span>
        </Tooltip>
      </div>
    </div>
  );
}
