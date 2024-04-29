import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import { CodeEditor } from '@/components/shared/CodeEditor';
import { CodeEditorControls } from './CodeEditorControls';
import { CreateSubmissionData, Problem, createSubmission, useJwtData } from '@/data';

const getLang = (lang: string) => {
  switch (lang) {
    case 'python':
      return 'python';
    case 'c':
      return 'cpp';
    case 'cpp':
      return 'cpp';
    default:
      return 'python';
  }
};

export function ProblemCodeEditor({
  problem,
  mutateProblem,
}: {
  problem: Problem;
  mutateProblem: () => void;
}) {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState(problem.languages[0]);
  const [submissionCount, setSubmissionCount] = useState(0);
  const { token } = useJwtData();

  const resetCode = () => {
    setCode('');
    notifications.show({
      title: t('user-problem-view-code-editor-reset-info-title'),
      message: t('user-problem-view-code-editor-reset-info-message'),
    });
  };

  const sendSubmission = async () => {
    if (code.length === 0 || code.length > 50000) {
      notifications.show({
        title: t('user-problem-view-code-editor-send-validation-error-title'),
        message: t('user-problem-view-code-editor-send-validation-error-message'),
        color: 'red',
      });
      return;
    }
    const data: CreateSubmissionData = {
      sourceCode: code,
      language,
      problemId: problem.id,
    };
    try {
      if (!token) throw new Error('no-token');
      const submission = await createSubmission(token, data);
      setSubmissionCount(submissionCount + 1);
      notifications.show({
        title: t('user-problem-view-code-editor-send-success-title'),
        message: `${t('user-problem-view-code-editor-send-success-message')} #${submission.id}`,
        color: 'green',
      });
    } catch (error: any) {
      let message = t('user-problem-view-code-editor-send-error-message');
      switch (error.message) {
        case 'no-token':
          message = t('user-problem-view-code-editor-send-error-no-token-message');
          break;
        case 'invalid-data':
          message = t('user-problem-view-code-editor-send-error-invalid-data-message');
          break;
        case 'unexpected-error':
          message = t('user-problem-view-code-editor-send-error-unexpected-error-message');
          break;
        default:
          break;
      }
      notifications.show({
        title: t('user-problem-view-code-editor-send-error-title'),
        message,
        color: 'red',
      });
    }
  };
  return (
    <>
      <CodeEditorControls
        onSend={sendSubmission}
        onReset={resetCode}
        mutateProblem={mutateProblem}
        onLangChange={setLanguage}
        submissionCount={submissionCount}
        lang={language}
        problem={problem}
      />
      <CodeEditor
        lang={getLang(language)}
        placeholder={t('user-problem-view-code-editor-placeholder')}
        value={code}
        onChange={setCode}
      />
    </>
  );
}
