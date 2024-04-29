import { Badge } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { SubmissionStatus } from '@/data';
import { BIND_STATUS } from '@/components/shared/Binds';

export function SubmissionStatusBadge({ status }: { status: SubmissionStatus }) {
  const { t } = useTranslation();

  return (
    <Badge variant="light" color={BIND_STATUS[status][0]}>
      {t(BIND_STATUS[status][1])}
    </Badge>
  );
}
