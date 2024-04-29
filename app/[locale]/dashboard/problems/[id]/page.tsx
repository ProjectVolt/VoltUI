'use client';

import { useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { redirect } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ProblemView } from '@/components/dashboard/problems/ProblemView';

export default function ProblemViewPage({ params }: { params: { id: string } }) {
  const { t } = useTranslation();
  useEffect(() => {
    if (!params.id || Number.isNaN(parseInt(params.id, 10))) {
      notifications.show({
        title: t('user-problem-view-error-invalid-id-title'),
        message: t('user-problem-view-error-invalid-id-message'),
        color: 'red',
      });
      redirect('/dashboard/problems');
    }
  }, [params]);
  return <ProblemView problemId={parseInt(params.id, 10)} />;
}
