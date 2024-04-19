import {
  Box,
  Flex,
  TextInput,
  NumberInput,
  Table,
  TableData,
  Button,
  Modal,
  Textarea,
  Tabs,
  FileInput,
  Tooltip,
  Text,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import { useForm, yupResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { GetInputPropsReturnType } from '@mantine/form/lib/types';
import { TestCase, getTestCaseSchema } from './schema';

export function TestCases({ value, onChange, error }: GetInputPropsReturnType) {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const [testCases, setTestCases] = useState<TestCase[]>(value);
  const tableData: TableData = useMemo(
    () => ({
      caption:
        testCases.length === 0
          ? t('admin-problem-add-form-testCases-table-empty-caption')
          : undefined,
      head: [
        t('admin-problem-add-form-testCases-table-name'),
        t('admin-problem-add-form-testCases-table-maxScore'),
        t('admin-problem-add-form-testCases-table-actions'),
      ],
      body: testCases.map((testCase, idx) => [
        testCase.name,
        testCase.maxScore,
        <Button
          key={idx}
          size="xs"
          variant="outline"
          color="red"
          onClick={() => setTestCases(testCases.filter((_, i) => i !== idx))}
        >
          {t('admin-problem-add-form-testCases-table-actions-remove')}
        </Button>,
      ]),
    }),
    [testCases]
  );

  const schema = useMemo(() => getTestCaseSchema(t), [t]);

  const form = useForm({
    initialValues: {
      name: '',
      input: '',
      output: '',
      maxScore: 1,
    },
    validate: yupResolver(schema),
  });

  const addTestCase = (testCase: TestCase) => {
    const newTestCases = [...testCases, testCase];
    setTestCases(newTestCases);
    onChange(newTestCases);
    close();
  };

  const [file, setFile] = useState<File | null>(null);

  const importTestCases = () => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (!Array.isArray(data)) throw new Error('not-array');
        const validated = await Promise.all(data.map((tc) => schema.validate(tc)));
        const newTestCases = [...testCases, ...validated];
        setTestCases(newTestCases);
        onChange(newTestCases);
        close();
      } catch (e: any) {
        const msg =
          e.message === 'not-array'
            ? t('admin-problem-add-form-testCases-modal-file-error-message')
            : t('admin-problem-add-form-testCases-modal-file-invalid-error-message');
        notifications.show({
          title: t('admin-problem-add-form-testCases-modal-file-error-title'),
          message: msg,
          color: 'red',
        });
      }
    };
    if (file) {
      reader.readAsText(file);
    } else {
      notifications.show({
        title: t('admin-problem-add-form-testCases-modal-file-error-title'),
        message: t('admin-problem-add-form-testCases-modal-file-missing-error-message'),
        color: 'red',
      });
    }
  };
  return (
    <Box>
      {error && (
        <Text mb="sm" c="red">
          {error}
        </Text>
      )}
      <Modal
        opened={opened}
        onClose={close}
        radius="lg"
        title={t('admin-problem-add-form-testCases-modal-title')}
      >
        <Tabs defaultValue="form">
          <Tabs.List mb="lg">
            <Tabs.Tab value="form">{t('admin-problem-add-form-testCases-modal-tab-form')}</Tabs.Tab>
            <Tabs.Tab value="file">{t('admin-problem-add-form-testCases-modal-tab-file')}</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="form">
            <form onSubmit={form.onSubmit(addTestCase)}>
              <Flex direction="column" gap="md">
                <TextInput
                  radius="md"
                  label={t('admin-problem-add-form-testCases-name-label')}
                  {...form.getInputProps('name')}
                />
                <Textarea
                  radius="md"
                  label={t('admin-problem-add-form-testCases-input-label')}
                  {...form.getInputProps('input')}
                />
                <Textarea
                  radius="md"
                  label={t('admin-problem-add-form-testCases-output-label')}
                  {...form.getInputProps('output')}
                />
                <NumberInput
                  radius="md"
                  label={t('admin-problem-add-form-testCases-maxScore-label')}
                  {...form.getInputProps('maxScore')}
                />
                <Button type="submit" mt="md" size="sm" variant="light" radius="sm">
                  {t('admin-problem-add-form-testCases-add')}
                </Button>
              </Flex>
            </form>
          </Tabs.Panel>
          <Tabs.Panel value="file">
            <Tooltip
              color="gray"
              position="bottom-start"
              label={t('admin-problem-add-form-testCases-modal-file-tooltip')}
            >
              <FileInput
                onChange={setFile}
                radius="md"
                accept="application/json"
                label={t('admin-problem-add-form-testCases-modal-file-label')}
                placeholder={t('admin-problem-add-form-testCases-modal-file-placeholder')}
              />
            </Tooltip>
            <Button onClick={importTestCases} mt="xl" fullWidth variant="light" radius="sm">
              {t('admin-problem-add-form-testCases-modal-file-add')}
            </Button>
          </Tabs.Panel>
        </Tabs>
      </Modal>
      <Table data={tableData} />
      <Button fullWidth onClick={open} mt="md" size="sm" variant="light" radius="sm">
        {t('admin-problem-add-form-testCases-add')}
      </Button>
    </Box>
  );
}
