import { Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { ProblemForm, FormData } from '../ProblemForm';
import commonClasses from '../problems.module.css';
import { addProblem, useJwtData } from '@/data';

export function AdminProblemAdd() {
  const { t } = useTranslation();
  const { token, error } = useJwtData();
  const router = useRouter();

  const onSubmit = async (values: FormData) => {
    try {
      if (!token || error) throw new Error('no-token');
      const problem = await addProblem(token, {
        ...values,
        tags: values.tags.map((tag) => tag.id),
      });
      notifications.show({
        title: t('admin-problem-add-success-title'),
        message: t('admin-problem-add-success-message'),
        color: 'teal',
      });
      router.push(`/dashboard/admin/problems/edit/${problem.id}`);
    } catch (e: any) {
      const msg = {
        'no-token': t('admin-problem-add-error-no-token'),
        'invalid-data': t('admin-problem-add-error-invalid-data'),
        'unexpected-error': t('admin-problem-add-error-unexpected-error'),
      }[e.message as 'no-token' | 'invalid-data' | 'unexpected-error'];
      notifications.show({
        title: t('admin-problem-add-error-title'),
        message: msg,
        color: 'red',
      });
    }
  };

  return (
    <Flex m="xl" direction="column">
      <div className={commonClasses.container}>
        <h1>{t('admin-problem-add-title')}</h1>
        <ProblemForm submitLabel={t('admin-problem-add-form-submit')} onSubmit={onSubmit} />
      </div>
    </Flex>
  );
}
