import { Box, Flex, Loader, Skeleton } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useInViewport } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Submission, useSubmissionsInfinite } from '@/data';
import classes from './activity.module.css';
import { ActivityItem } from './ActivityItem';

export function Activity() {
  const { t } = useTranslation();
  const { ref, inViewport } = useInViewport();
  const { submissions, size, setSize, error, isLoading } = useSubmissionsInfinite();
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    if (!isLoading) {
      if (error) {
        notifications.show({
          title: t('user-activity-error-title'),
          message: t('user-activity-error-message'),
          color: 'red',
        });
      } else {
        setLoading(false);
      }
    }
  }, [isLoading]);
  useEffect(() => {
    setFetching(false);
  }, [submissions]);
  useEffect(() => {
    if (!isLoading && inViewport) {
      setSize(size + 1);
      setFetching(true);
    }
  }, [inViewport]);
  return (
    <>
      <Flex m="xl" direction="column">
        <div className={classes.container}>
          <h1>{t('user-activity-title')}</h1>
          <Box mt="lg" pos="relative" w="100%">
            {loading ? (
              <Skeleton radius="xl" height={300} />
            ) : (
              <>
                {submissions?.map((submission: Submission) => (
                  <ActivityItem key={submission.id} submission={submission} />
                ))}
              </>
            )}
          </Box>
        </div>
        <Flex justify="center" mt="xl">
          <Loader style={{ opacity: fetching ? 1 : 0 }} type="dots" ref={ref} />
        </Flex>
      </Flex>
    </>
  );
}
