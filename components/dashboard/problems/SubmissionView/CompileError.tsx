import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import { useTranslation } from 'react-i18next';

SyntaxHighlighter.registerLanguage('bash', bash);

export function CompileError({ compileError }: { compileError: string }) {
  const { t } = useTranslation();
  return (
    <>
      <h2>{t('user-submission-view-compile-error')}</h2>
      {/* @ts-ignore */}
      <SyntaxHighlighter language="bash" style={oneDark} showLineNumbers>
        {compileError}
      </SyntaxHighlighter>
    </>
  );
}
