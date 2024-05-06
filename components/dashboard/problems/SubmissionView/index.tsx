import { Badge, Flex, Skeleton, Tooltip } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { IoCodeOutline, IoLogoPython } from 'react-icons/io5';
import { useSubmissionById } from '@/data';
import classes from '../problems.module.css';
import { TestResults } from './TestResults';
import { SubmissionStatusBadge } from '../../../shared/SubmissionStatusBadge';
import { SourceCode } from './SourceCode';
import { CompileError } from './CompileError';
import { RuntimeError } from './RuntimeError';
import { SubmissionAuthor } from './SubmissionAuthor';

const BIND_LANGUAGE: { [key in 'c' | 'cpp' | 'python']: [JSX.Element, string] } = {
  cpp: [<IoCodeOutline />, 'C++'],
  c: [<IoCodeOutline />, 'C'],
  python: [<IoLogoPython />, 'Python'],
};

export function SubmissionView({ submissionId }: { submissionId: number }) {
  const { t } = useTranslation();
  const onMobile = useMediaQuery('(max-width: 768px)');
  const router = useRouter();
  const { submission, error, isLoading } = useSubmissionById(submissionId);
  useEffect(() => {
    if (!isLoading && error) {
      notifications.show({
        title: t('user-submission-view-error-title'),
        message: t('user-submission-view-error-message'),
        color: 'red',
      });
      setTimeout(() => router.back(), 3000);
    }
  }, [isLoading, error]);
  return (
    <div className={classes.submissionViewContainer}>
      <Flex direction="column">
        <h1>
          {t('user-submission-view-header-title')}
          <span>{` #${submissionId}`}</span>
        </h1>
        {isLoading || error ? (
          <Skeleton radius="xl" height={300} />
        ) : (
          <>
            <Flex gap="md" mb="xl" wrap="wrap" justify={onMobile ? 'center' : 'flex-start'}>
              <SubmissionStatusBadge status={submission!.status} />
              <Badge
                variant="light"
                color="gray"
                leftSection={BIND_LANGUAGE[submission!.language][0]}
              >
                {BIND_LANGUAGE[submission!.language][1]}
              </Badge>
              <SubmissionAuthor authorId={submission!.addedBy} />
              <Tooltip
                color="gray"
                label={t('user-submission-view-tooltip-cpu-memory')}
                position="bottom"
                withArrow
              >
                <Badge variant="light" color="gray" leftSection="CPU ">
                  {`${submission!.maxCpu}ms`}
                </Badge>
              </Tooltip>
              <Tooltip
                color="gray"
                label={t('user-submission-view-tooltip-cpu-memory')}
                position="bottom"
                withArrow
              >
                <Badge variant="light" color="gray" leftSection="RAM ">
                  {`${(submission!.maxMemory / (1024 * 1024)).toFixed(0)}MB`}
                </Badge>
              </Tooltip>
            </Flex>
          </>
        )}
        {submission && !submission.compileSuccess && (
          <CompileError
            compileError={
              submission?.compileErrorMessage ?? t('user-submission-view-default-compile-error-msg')
            }
          />
        )}
        {submission && submission.compileSuccess && !submission.runSuccess && (
          <RuntimeError runtimeError={t('user-submission-view-default-runtime-error-msg')} />
        )}
        {submission?.testResults && submission.testResults.length > 0 && (
          <TestResults submission={submission!} />
        )}
        {submission && (
          <SourceCode sourceCode={submission!.sourceCode} language={submission!.language} />
        )}
      </Flex>
    </div>
  );
}
