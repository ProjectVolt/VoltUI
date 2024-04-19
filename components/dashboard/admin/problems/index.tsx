import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, Input, Skeleton } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IoSearchOutline, IoAdd } from 'react-icons/io5';
import Link from 'next/link';
import { ProblemList } from './list';
import { useProblems } from '@/data';
import classes from './problems.module.css';

const PAGE_SIZE = 10;

function Pagination({
  value,
  onChange,
  count,
  mt,
}: {
  value: number;
  onChange: (value: number) => void;
  count: number;
  mt: string;
}) {
  return (
    <Flex mt={mt} justify="center">
      <Button onClick={() => onChange(value - 1)} disabled={value === 1}>
        Previous
      </Button>
      <Button ml="sm" onClick={() => onChange(value + 1)} disabled={count < PAGE_SIZE}>
        Next
      </Button>
    </Flex>
  );
}

export function AdminProblems() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const searchQuery = search === '' ? '%' : /^[a-zA-Z0-9 ]+$/.test(search) ? `%${search}%` : search;
  const { problems, error, isLoading, mutate } = useProblems(searchQuery, page - 1, PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      if (error) {
        notifications.show({
          title: t('admin-problem-list-error-title'),
          message: t('admin-problem-list-error-message'),
          color: 'red',
        });
      } else {
        setLoading(false);
      }
    }
  }, [isLoading]);
  return (
    <Flex m="xl" direction="column">
      <div className={classes.container}>
        <h1>{t('admin-problem-list-title')}</h1>
        <Box pos="relative" w="100%">
          <Flex mt="30px" mb="20px" w="100%">
            <Input
              radius="md"
              flex={1}
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
              placeholder={t('admin-problem-list-search')}
              leftSection={<IoSearchOutline />}
            />
            <Button
              radius="md"
              variant="outline"
              ml="sm"
              component={Link}
              href="/dashboard/admin/problems/add"
              leftSection={<IoAdd size={20} />}
            >
              {t('admin-problem-list-create')}
            </Button>
          </Flex>
          {loading ? (
            <Skeleton radius="xl" height={300} />
          ) : (
            <ProblemList mutate={mutate} problems={problems ?? []} />
          )}
          <Pagination mt="xl" count={problems?.length ?? 0} value={page} onChange={setPage} />
        </Box>
      </div>
    </Flex>
  );
}
