import { Badge, Box, Button, Divider, Flex, Skeleton, Tooltip } from '@mantine/core';
import {
  IoBowlingBallOutline,
  IoCheckmarkDoneOutline,
  IoPersonOutline,
  IoSparklesSharp,
} from 'react-icons/io5';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notifications } from '@mantine/notifications';
import { useMediaQuery } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { Problem, useUserById } from '@/data';
import classes from '../problems.module.css';

export function ProblemItem({ problem }: { problem: Problem }) {
  const { t } = useTranslation();
  const mobile = useMediaQuery('(max-width: 1199px)');
  const { user, isLoading, error } = useUserById(problem.addedBy);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      if (error) {
        notifications.show({
          title: t('user-problem-list-item-error-title'),
          message: t('user-problem-list-item-error-message'),
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
    <div className={classes.listItem}>
      <Divider mb="md" />
      <div className={classes.wrap}>
        <div>
          <h2>{problem.name}</h2>
          <Badge
            variant="light"
            ml="sm"
            mr="sm"
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
                easy: t('user-problem-list-item-difficulty-easy'),
                medium: t('user-problem-list-item-difficulty-medium'),
                hard: t('user-problem-list-item-difficulty-hard'),
              }[problem.difficulty]
            }
          </Badge>
        </div>
        <div>
          <Box mb="xs" mt="xs">
            <Badge variant="light" color="gray" leftSection="CPU ">
              {problem.timeLimit}ms
            </Badge>
            <Badge variant="light" ml="sm" color="gray" leftSection="RAM ">
              {problem.memoryLimit}MB
            </Badge>
          </Box>
        </div>
      </div>
      <div>
        <Tooltip label={t('user-problem-list-item-added-by')} position="bottom" withArrow>
          <span className={classes.details}>
            <IoPersonOutline />
            <small>{user?.username}</small>
          </span>
        </Tooltip>
        <Tooltip label={t('user-problem-list-item-total')} position="bottom" withArrow>
          <span className={classes.details}>
            <IoSparklesSharp />
            <small>
              {problem.totalScore} {t('user-problem-list-item-total-points')}
            </small>
          </span>
        </Tooltip>
        <Tooltip label={t('user-problem-list-item-submission-count')} position="bottom" withArrow>
          <span className={classes.details}>
            <IoBowlingBallOutline />
            <small>{problem.submissionCount}</small>
          </span>
        </Tooltip>
        <Tooltip label={t('user-problem-list-item-accepted-count')} position="bottom" withArrow>
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
      {problem.tags.length > 0 && (
        <div>
          <Tooltip label={t('user-problem-list-item-tags')} position="bottom" withArrow>
            <Flex gap="sm" mt="sm" wrap="wrap">
              {problem.tags.map((tag) => (
                <Badge key={tag.id} variant="outline" radius="xl">
                  {tag.name}
                </Badge>
              ))}
            </Flex>
          </Tooltip>
        </div>
      )}
      <div className={classes.viewButton}>
        <Button
          component={Link}
          href={`/dashboard/problems/${problem.id}`}
          fullWidth={mobile}
          mt="sm"
          variant="light"
          radius="md"
        >
          {t('user-problem-list-item-view')}
        </Button>
      </div>
    </div>
  );
}
