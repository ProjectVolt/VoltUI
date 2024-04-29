import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import c from 'react-syntax-highlighter/dist/cjs/languages/prism/c';
import cpp from 'react-syntax-highlighter/dist/cjs/languages/prism/cpp';
import { useTranslation } from 'react-i18next';

SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('c', c);
SyntaxHighlighter.registerLanguage('cpp', cpp);

export function SourceCode({
  sourceCode,
  language,
}: {
  sourceCode: string;
  language: 'c' | 'cpp' | 'python';
}) {
  const { t } = useTranslation();
  return (
    <>
      <h2>{t('user-submission-view-source-code')}</h2>
      {/* @ts-ignore */}
      <SyntaxHighlighter language={language} style={oneDark} showLineNumbers>
        {sourceCode}
      </SyntaxHighlighter>
    </>
  );
}
