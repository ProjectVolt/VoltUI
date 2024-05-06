'use client';

import { useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { redirect } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { SubmissionView } from '@/components/dashboard/problems/SubmissionView';

export default function SubmissionViewPage({ params }: { params: { id: string } }) {
  const { t } = useTranslation();
  useEffect(() => {
    if (!params.id || Number.isNaN(parseInt(params.id, 10))) {
      notifications.show({
        title: t('user-submission-view-error-invalid-id-title'),
        message: t('user-submission-view-error-invalid-id-message'),
        color: 'red',
      });
      redirect('/dashboard/problems/submissions');
    }
  }, [params]);
  return <SubmissionView submissionId={parseInt(params.id, 10)} />;
}
