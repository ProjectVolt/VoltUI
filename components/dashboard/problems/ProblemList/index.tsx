import { Box, Flex, Input, Loader, Skeleton } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useInViewport } from '@mantine/hooks';
import { IoSearchOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Problem, useProblemsInfinite } from '@/data';
import classes from '../problems.module.css';
import { ProblemItem } from './ProblemItem';

export function ProblemList() {
  const { t } = useTranslation();
  const { ref, inViewport } = useInViewport();
  const [search, setSearch] = useState('');
  const searchQuery = search === '' ? '%' : /^[a-zA-Z0-9 ]+$/.test(search) ? `%${search}%` : search;
  const { problems, size, setSize, error, isLoading } = useProblemsInfinite(searchQuery);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    if (!isLoading) {
      if (error) {
        notifications.show({
          title: t('user-problem-list-error-title'),
          message: t('user-problem-list-error-message'),
          color: 'red',
        });
      } else {
        setLoading(false);
      }
    }
  }, [isLoading]);
  useEffect(() => {
    setFetching(false);
  }, [problems]);
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
          <h1>{t('user-problem-list-title')}</h1>
          <Box pos="relative" w="100%">
            <Flex mt="30px" mb="20px" w="100%">
              <Input
                radius="md"
                flex={1}
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
                placeholder={t('user-problem-list-search')}
                leftSection={<IoSearchOutline />}
              />
            </Flex>
            {loading ? (
              <Skeleton radius="xl" height={300} />
            ) : (
              <>
                {problems?.map((problem: Problem) => (
                  <ProblemItem key={problem.id} problem={problem} />
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
