import { useState } from 'react';
import { Button, Modal, NativeSelect, Tooltip } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { IoReloadOutline, IoSendOutline } from 'react-icons/io5';
import { useDisclosure } from '@mantine/hooks';
import { Problem } from '@/data';
import classes from '../problems.module.css';

export function CodeEditorControls({
  problem,
  lang,
  onReset,
  onSend,
  onLangChange,
}: {
  problem: Problem;
  lang: string;
  onReset: () => void;
  onSend: () => Promise<void>;
  onLangChange: (lang: string) => void;
}) {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const [sending, setSending] = useState(false);

  const resetCode = () => {
    onReset();
    close();
  };

  const send = () => {
    setSending(true);
    onSend().then(() => setSending(false));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLangChange(e.currentTarget.value);
  };

  return (
    <div className={classes.viewCodeControls}>
      <Modal opened={opened} onClose={close} title={t('user-problem-view-code-editor-reset-title')}>
        {t('user-problem-view-code-editor-reset-message')}
        <br />
        <Button mt="lg" fullWidth onClick={resetCode} variant="light" color="red" size="xs">
          {t('user-problem-view-code-editor-reset-confirm')}
        </Button>
      </Modal>

      <div>
        <Tooltip label={t('user-problem-view-code-editor-language')} position="left" withArrow>
          <NativeSelect
            data={problem.languages}
            variant="filled"
            size="xs"
            value={lang}
            onChange={handleChange}
          />
        </Tooltip>
        <Button
          leftSection={<IoReloadOutline />}
          onClick={open}
          variant="filled"
          color="#495057"
          size="xs"
        >
          {t('user-problem-view-code-editor-reset')}
        </Button>
      </div>
      <div>
        <Button
          loading={sending}
          leftSection={<IoSendOutline />}
          onClick={send}
          variant="filled"
          mr="md"
          color="#495057"
          size="xs"
        >
          {t('user-problem-view-code-editor-submit')}
        </Button>
      </div>
    </div>
  );
}
