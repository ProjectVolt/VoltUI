import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { githubDark } from '@uiw/codemirror-theme-github';
import { useViewportSize } from '@mantine/hooks';

export function CodeEditor({
  value,
  onChange,
  placeholder,
  lang,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  lang: 'python' | 'cpp';
}) {
  const extensions = lang === 'python' ? [python()] : [cpp()];
  const { height } = useViewportSize();
  const NAVBAR_HEIGHT = 80;
  const CONTROLS_HEIGHT = 45;
  return (
    <CodeMirror
      placeholder={placeholder}
      height={`${height - NAVBAR_HEIGHT - CONTROLS_HEIGHT}px`}
      theme={githubDark}
      extensions={extensions}
      value={value}
      onChange={onChange}
    />
  );
}
