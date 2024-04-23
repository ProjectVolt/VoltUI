import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Skeleton, Tabs } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IoHammerOutline, IoInformationCircleOutline } from 'react-icons/io5';
import { useProblem } from '@/data';
import classes from '../problems.module.css';
import { ProblemHeader } from './ProblemHeader';
import { ProblemContent } from './ProblemContent';
import { ProblemCodeEditor } from './ProblemCodeEditor';
import { ProblemDetails } from './ProblemDetails';

export function ProblemView({ problemId }: { problemId: number }) {
  const { t } = useTranslation();
  const { problem, isLoading, error } = useProblem(problemId);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      if (error) {
        notifications.show({
          title: t('user-problem-view-error-title'),
          message: t('user-problem-view-error-message'),
          color: 'red',
        });
      } else {
        setLoading(false);
      }
    }
  }, [isLoading]);

  return (
    <>
      {loading ? (
        <Skeleton width="100%" height="100%" radius="lg" />
      ) : (
        <>
          <div className={classes.viewContainer}>
            <div className={classes.viewElement}>
              <Tabs defaultValue="problem">
                <Tabs.List h="45px">
                  <Tabs.Tab value="problem" leftSection={<IoHammerOutline />}>
                    {t('user-problem-view-tab-problem')}
                  </Tabs.Tab>
                  <Tabs.Tab value="details" leftSection={<IoInformationCircleOutline />}>
                    {t('user-problem-view-tab-details')}
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="problem">
                  <ProblemHeader problem={problem!} />
                  <ProblemContent problem={problem!} />
                </Tabs.Panel>

                <Tabs.Panel value="details">
                  <ProblemDetails problem={problem!} />
                </Tabs.Panel>
              </Tabs>
            </div>
            <div className={classes.viewElement}>
              <ProblemCodeEditor problem={problem!} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
