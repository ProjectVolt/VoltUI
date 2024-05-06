import { Badge, Box, Button, Divider, Flex, Skeleton, Tooltip } from '@mantine/core';
import { IoCodeOutline, IoLogoPython, IoPersonOutline } from 'react-icons/io5';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { notifications } from '@mantine/notifications';
import { useMediaQuery } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { Submission, useUserById } from '@/data';
import classes from './activity.module.css';
import { SubmissionStatusBadge } from '@/components/shared/SubmissionStatusBadge';

const BIND_LANGUAGE: { [key in 'c' | 'cpp' | 'python']: [JSX.Element, string] } = {
  cpp: [<IoCodeOutline />, 'C++'],
  c: [<IoCodeOutline />, 'C'],
  python: [<IoLogoPython />, 'Python'],
};

export function ActivityItem({ submission }: { submission: Submission }) {
  const { t } = useTranslation();
  const date = useMemo(
    () =>
      new Date(parseInt(submission.createdOn, 10) * 1000)
        .toISOString()
        .replace('T', ' ')
        .slice(0, 19),
    [submission.createdOn]
  );
  const mobile = useMediaQuery('(max-width: 1199px)');
  const { user, isLoading, error } = useUserById(submission.addedBy);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      if (error) {
        notifications.show({
          title: t('user-activity-item-error-title'),
          message: t('user-activity-item-error-message'),
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
      <Flex gap="md">
        <Box>
          <h2>
            {t('user-activity-item-title')} #{submission.id}
          </h2>
        </Box>
        <Box>
          <p className={classes.date}>{date}</p>
        </Box>
      </Flex>
      <Flex gap="md" mb="xl" mt="sm" wrap="wrap">
        <SubmissionStatusBadge status={submission!.status} />
        <Badge variant="light" color="gray" leftSection={BIND_LANGUAGE[submission!.language][0]}>
          {BIND_LANGUAGE[submission!.language][1]}
        </Badge>
        <Badge variant="light" color="gray" leftSection={<IoPersonOutline />}>
          {user!.username}
        </Badge>
        <Tooltip
          color="gray"
          label={t('user-activity-tooltip-cpu-memory')}
          position="bottom"
          withArrow
        >
          <Badge variant="light" color="gray" leftSection="CPU ">
            {`${submission!.maxCpu}ms`}
          </Badge>
        </Tooltip>
        <Tooltip
          color="gray"
          label={t('user-activity-tooltip-cpu-memory')}
          position="bottom"
          withArrow
        >
          <Badge variant="light" color="gray" leftSection="RAM ">
            {`${(submission!.maxMemory / (1024 * 1024)).toFixed(0)}MB`}
          </Badge>
        </Tooltip>
      </Flex>
      <div className={classes.viewButton}>
        <Button
          component={Link}
          href={`/dashboard/problems/submissions/${submission.id}`}
          fullWidth={mobile}
          mt={mobile ? 'xs' : 'xl'}
          variant="light"
          radius="md"
        >
          {t('user-activity-item-view')}
        </Button>
      </div>
    </div>
  );
}
