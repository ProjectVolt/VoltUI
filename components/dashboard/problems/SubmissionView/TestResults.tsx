import { Accordion, Badge, Flex, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IoFlaskOutline, IoSparklesOutline } from 'react-icons/io5';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import { Submission, TestResult } from '@/data';
import { SubmissionStatusBadge } from './SubmissionStatusBadge';
import classes from './testResults.module.css';

SyntaxHighlighter.registerLanguage('bash', bash);

function AccordionLabel({ testResult }: { testResult: TestResult }) {
  const { t } = useTranslation();
  return (
    <Group wrap="nowrap">
      <div>
        <Flex direction="column" gap="xs">
          <Flex align="center" gap="md">
            <Text fw="500">{testResult.testCaseName}</Text>
            <Badge variant="outline" color="gray" leftSection={<IoSparklesOutline />}>
              {testResult.score}
              {` ${t('user-submission-view-test-case-score')}`}
            </Badge>
          </Flex>
          <Flex align="center" gap="md">
            <SubmissionStatusBadge status={testResult.result} />
            <Badge variant="light" color="gray" leftSection="CPU ">
              {testResult.cpuTime}ms
            </Badge>
            <Badge variant="light" color="gray" leftSection="RAM ">
              {(testResult.memory / (1024 * 1024)).toFixed(0)}MB
            </Badge>
          </Flex>
        </Flex>
      </div>
    </Group>
  );
}

export function TestDetials({ testResult }: { testResult: TestResult }) {
  const { t } = useTranslation();
  return (
    <>
      <h3>{t('user-submission-view-test-case-input')}</h3>
      {/* @ts-ignore */}
      <SyntaxHighlighter language="bash" style={oneDark} showLineNumbers>
        {testResult.input}
      </SyntaxHighlighter>
      <h3>{t('user-submission-view-test-case-output')}</h3>
      {/* @ts-ignore */}
      <SyntaxHighlighter language="bash" style={oneDark} showLineNumbers>
        {testResult.output}
      </SyntaxHighlighter>
    </>
  );
}

export function TestResults({ submission }: { submission: Submission }) {
  const { t } = useTranslation();
  return (
    <>
      <h2>{t('user-submission-view-test-results-title')}</h2>
      <Accordion mb="lg" chevronPosition="right" variant="contained" multiple>
        {submission.testResults.map((testResult, index) => (
          <Accordion.Item key={index} value={testResult.id.toString()}>
            <Accordion.Control
              classNames={{ control: classes.control, chevron: classes.chevron }}
              disabled={testResult.output === null}
              icon={<IoFlaskOutline />}
            >
              <AccordionLabel testResult={testResult} />
            </Accordion.Control>
            <Accordion.Panel>
              <TestDetials testResult={testResult} />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
}
