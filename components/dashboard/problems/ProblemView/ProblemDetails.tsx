import { useTranslation } from 'react-i18next';
import { Badge, Flex } from '@mantine/core';
import { Problem } from '@/data';
import classes from '../problems.module.css';

export function ProblemDetails({ problem }: { problem: Problem }) {
  const { t } = useTranslation();
  return (
    <div className={classes.viewDetails}>
      <div>
        <h2>{t('user-problem-view-details-title')}</h2>
        <p>{problem.name}</p>
      </div>
      <div>
        <h2>{t('user-problem-view-details-limits')}</h2>
        <Flex gap="md" wrap="wrap">
          <p>CPU {problem.timeLimit}ms</p>
          <p>RAM {problem.memoryLimit}MB</p>
        </Flex>
      </div>
      {problem.author && (
        <div>
          <h2>{t('user-problem-view-details-author')}</h2>
          <p>{problem.author}</p>
        </div>
      )}
      {problem.tags.length > 0 && (
        <div>
          <h2>{t('user-problem-view-details-tags')}</h2>
          <p>
            {problem.tags.map((tag) => (
              <Badge key={tag.id} variant="light" style={{ marginRight: '0.5rem' }}>
                {tag.name}
              </Badge>
            ))}
          </p>
        </div>
      )}
      <div>
        <h2>{t('user-problem-view-details-difficulty')}</h2>
        <p>
          <Badge
            variant="light"
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
                easy: t('user-problem-view-difficulty-easy'),
                medium: t('user-problem-view-difficulty-medium'),
                hard: t('user-problem-view-difficulty-hard'),
              }[problem.difficulty]
            }
          </Badge>
        </p>
      </div>
      <div>
        <h2>{t('user-problem-view-details-totalScore')}</h2>
        <p>{problem.totalScore}</p>
      </div>
      <div>
        <h2>{t('user-problem-view-details-statistics')}</h2>
        <p>
          <Flex mt="sm" direction="column">
            <Badge variant="light" color="gray" rightSection={` ${problem.submissionCount}`}>
              {t('user-problem-view-details-statistics-all')}
            </Badge>
            <Badge variant="light" color="green" rightSection={` ${problem.acceptedSubmissions}`}>
              {t('user-problem-view-details-statistics-accepted')}
            </Badge>
            <Badge variant="light" color="blue" rightSection={` ${problem.partiallyAccepted}`}>
              {t('user-problem-view-details-statistics-partially-accepted')}
            </Badge>
            <Badge variant="light" color="red" rightSection={` ${problem.wrongSubmissions}`}>
              {t('user-problem-view-details-statistics-wrong')}
            </Badge>
            <Badge variant="light" color="black" rightSection={` ${problem.compileErrors}`}>
              {t('user-problem-view-details-statistics-compile-errors')}
            </Badge>
            <Badge variant="light" color="orange" rightSection={` ${problem.runtimeErrors}`}>
              {t('user-problem-view-details-statistics-runtime-errors')}
            </Badge>
          </Flex>
        </p>
      </div>
    </div>
  );
}
