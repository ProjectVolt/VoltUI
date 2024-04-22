import { useEffect, useState } from 'react';
import { Flex, Skeleton } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { ProblemForm, FormData } from '../ProblemForm';
import commonClasses from '../problems.module.css';
import { updateProblem, useAdminProblem, useJwtData } from '@/data';

export function AdminProblemEdit({ problemId }: { problemId: number }) {
  const { t } = useTranslation();
  const { problem, mutate, isLoading, error } = useAdminProblem(problemId);
  const { token, error: JwtError } = useJwtData();

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

  const onSubmit = async (values: FormData) => {
    try {
      if (!token || JwtError) throw new Error('no-token');
      await updateProblem(token, problemId, { ...values, tags: values.tags.map((tag) => tag.id) });
      mutate();
      notifications.show({
        title: t('admin-problem-edit-success-title'),
        message: t('admin-problem-edit-success-message'),
        color: 'teal',
      });
    } catch (e: any) {
      const msg = {
        'no-token': t('admin-problem-edit-error-no-token'),
        'invalid-data': t('admin-problem-edit-error-invalid-data'),
        'unexpected-error': t('admin-problem-edit-error-unexpected-error'),
      }[e.message as 'no-token' | 'invalid-data' | 'unexpected-error'];
      notifications.show({
        title: t('admin-problem-edit-error-title'),
        message: msg,
        color: 'red',
      });
    }
  };

  return (
    <Flex m="xl" direction="column">
      <div className={commonClasses.container}>
        <h1>{t('admin-problem-edit-title')}</h1>
        {loading ? (
          <Skeleton width="100%" height="100%" radius="lg" />
        ) : (
          <ProblemForm
            initialValues={problem ?? undefined}
            submitLabel={t('admin-problem-edit-form-submit')}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </Flex>
  );
}
