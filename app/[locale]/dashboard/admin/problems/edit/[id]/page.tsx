'use client';

import { useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { redirect } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { AdminProblemEdit } from '@/components/dashboard/admin/problems/edit';

export default function AdminProblemEditPage({ params }: { params: { id: string } }) {
  const { t } = useTranslation();
  useEffect(() => {
    if (!params.id || Number.isNaN(parseInt(params.id, 10))) {
      notifications.show({
        title: t('admin-problem-edit-error-invalid-id-title'),
        message: t('admin-problem-edit-error-invalid-id-message'),
        color: 'red',
      });
      redirect('/dashboard/admin/problems');
    }
  }, [params]);
  return <AdminProblemEdit problemId={parseInt(params.id, 10)} />;
}
