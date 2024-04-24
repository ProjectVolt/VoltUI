import ReactMarkdown from 'react-markdown';
import { FC } from 'react';
import rangeParser from 'parse-numeric-range';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import c from 'react-syntax-highlighter/dist/cjs/languages/prism/c';
import cpp from 'react-syntax-highlighter/dist/cjs/languages/prism/cpp';

SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('c', c);
SyntaxHighlighter.registerLanguage('cpp', cpp);

type MarkdownProps = {
  markdown: string & { content?: string };
};

export const RenderMarkdown: FC<MarkdownProps> = ({ markdown }) => {
  const syntaxTheme = oneDark;

  const MarkdownComponents: object = {
    code({ node, inline, className, ...props }: any) {
      const hasLang = /language-(\w+)/.exec(className || '');
      const hasMeta = node?.data?.meta;

      const applyHighlights: object = (apply: number) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/;
          const metadata = node.data.meta?.replace(/\s/g, '');
          const strlineNumbers = RE?.test(metadata) ? RE?.exec(metadata)![1] : '0';
          const highlightLines = rangeParser(strlineNumbers);
          const highlight = highlightLines;
          const data: string | null = highlight.includes(apply) ? 'highlight' : null;
          return { data };
        }
        return {};
      };

      return hasLang ? (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={hasLang[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers
          wrapLines={hasMeta}
          useInlineStyles
          lineProps={applyHighlights}
        >
          {props.children}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props} />
      );
    },
  };

  return <ReactMarkdown components={MarkdownComponents}>{markdown}</ReactMarkdown>;
};
