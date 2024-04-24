import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge, Button, Flex, Skeleton, Switch, Table, TableData, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useViewportSize } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { useJwtData, useUserById, updateProblem, Problem, Tag } from '@/data';

const BREAKPOINT_WIDTH = 768;

function Username({ id }: { id: number }) {
  const { user, isLoading, error } = useUserById(id);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading]);
  if (loading) {
    return <Skeleton width={100} height={20} />;
  }
  return <Text c={error ? 'red' : undefined}>{error ?? user?.username}</Text>;
}

function VisibilitySwitch({
  problemId,
  visible,
  mutate,
}: {
  problemId: number;
  visible: boolean;
  mutate: () => void;
}) {
  const { t } = useTranslation();
  const { token, error } = useJwtData();
  const updateVisibility = async () => {
    if (!token || error) {
      notifications.show({
        title: t('admin-problem-list-error-title'),
        message: t('admin-problem-list-error-message'),
        color: 'red',
      });
      return;
    }
    try {
      await updateProblem(token, problemId, { visible: !visible });
      mutate();
    } catch (e) {
      notifications.show({
        title: t('admin-problem-list-error-title'),
        message: t('admin-problem-list-error-message'),
        color: 'red',
      });
    }
  };
  return <Switch checked={visible} onChange={updateVisibility} />;
}

export function ProblemList({ mutate, problems }: { mutate: () => void; problems: Problem[] }) {
  const { t } = useTranslation();
  const tableDataFull: TableData = {
    head: [
      t('admin-problem-list-table-name'),
      t('admin-problem-list-table-difficulty'),
      t('admin-problem-list-table-tags'),
      t('admin-problem-list-table-added-by'),
      t('admin-problem-list-table-visible'),
      t('admin-problem-list-table-actions'),
    ],
    body: problems.map((problem) => [
      problem.name,
      <Badge
        variant="outline"
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
            easy: t('admin-problem-list-table-difficulty-easy'),
            medium: t('admin-problem-list-table-difficulty-medium'),
            hard: t('admin-problem-list-table-difficulty-hard'),
          }[problem.difficulty]
        }
      </Badge>,
      problem.tags.map((tag: Tag) => (
        <Badge variant="light" mr="sm" color="gray">
          {tag.name}
        </Badge>
      )),
      <Username id={problem.addedBy} />,
      <VisibilitySwitch mutate={mutate} problemId={problem.id} visible={problem.visible} />,
      <Flex gap="sm" wrap="wrap">
        <Button
          component={Link}
          href={`/dashboard/admin/problems/edit/${problem.id}`}
          variant="outline"
          miw="100px"
          size="xs"
        >
          {t('admin-problem-list-table-actions-edit')}
        </Button>
        <Button
          component={Link}
          href={`/dashboard/problems/${problem.id}`}
          variant="outline"
          miw="100px"
          size="xs"
        >
          {t('admin-problem-list-table-actions-view')}
        </Button>
      </Flex>,
    ]),
  };
  const tableDataMobile: TableData = {
    head: [tableDataFull.head![0], ...tableDataFull.head!.slice(-3)],
    body: tableDataFull.body!.map((row) => [row[0], ...row.slice(-3)]),
  };
  const { width } = useViewportSize();
  return (
    <div>
      <Table data={width > BREAKPOINT_WIDTH ? tableDataFull : tableDataMobile} />
    </div>
  );
}
