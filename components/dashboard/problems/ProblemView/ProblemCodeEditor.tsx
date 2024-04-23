import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import { CodeEditor } from '@/components/shared/CodeEditor';
import { CodeEditorControls } from './CodeEditorControls';
import { Problem } from '@/data';

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

export function ProblemCodeEditor({ problem }: { problem: Problem }) {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState(problem.languages[0]);

  const resetCode = () => {
    setCode('');
    notifications.show({
      title: t('user-problem-view-code-editor-reset-info-title'),
      message: t('user-problem-view-code-editor-reset-info-message'),
    });
  };

  const mockSend = () =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });

  return (
    <>
      <CodeEditorControls
        onSend={mockSend}
        onReset={resetCode}
        lang={language}
        onLangChange={setLanguage}
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
