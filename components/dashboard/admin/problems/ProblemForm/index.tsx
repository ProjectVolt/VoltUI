import {
  Box,
  Flex,
  Switch,
  TextInput,
  Text,
  NumberInput,
  SegmentedControl,
  Button,
  Tooltip,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useMemo, useRef } from 'react';
import { useForm, yupResolver } from '@mantine/form';
import { Tags } from './Tags';
import { TestCases } from './TestCases';
import { TestCase, getMainSchema } from './schema';
import { Description } from './Description';
import { Languages } from './Languages';
import { Tag } from '@/data';

export type FormData = {
  visible: boolean;
  name: string;
  description: string;
  languages: string[];
  timeLimit: number;
  memoryLimit: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: Tag[];
  testCases: TestCase[];
  transparentTestCases: number;
  author: string | null;
};

export function ProblemForm({
  initialValues,
  onSubmit,
  submitLabel,
}: {
  initialValues?: FormData;
  onSubmit: (values: FormData) => void;
  submitLabel: string;
}) {
  const { t } = useTranslation();
  const schema = useMemo(() => getMainSchema(t), [t]);
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<FormData>({
    initialValues: initialValues ?? {
      visible: true,
      name: '',
      description: '',
      languages: ['python', 'c', 'cpp'],
      timeLimit: 1000,
      memoryLimit: 250,
      difficulty: 'easy',
      tags: [],
      testCases: [],
      transparentTestCases: 0,
      author: '',
    },
    validate: yupResolver(schema),
  });

  const handleSubmit = (values: FormData) => {
    onSubmit({ ...values, author: values.author?.length === 0 ? null : values.author });
  };

  return (
    <>
      <Box pos="relative" mt="40px" w="100%">
        <form ref={formRef} onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label={t('admin-problem-add-form-title-label')}
            size="md"
            radius="lg"
            {...form.getInputProps('name')}
          />
          <Switch
            mt="lg"
            label={t('admin-problem-add-form-visible-label')}
            labelPosition="left"
            {...form.getInputProps('visible', { type: 'checkbox' })}
          />
          <Box mt="xl">
            <Text mb="sm" fw={500}>
              {t('admin-problem-add-form-description-label')}
            </Text>
            <Description {...form.getInputProps('description')} />
          </Box>
          <Flex mt="xl" wrap="wrap" gap="xl">
            <Box>
              <Text mb="sm" fw={500}>
                {t('admin-problem-add-form-languages-label')}
              </Text>
              <Languages {...form.getInputProps('languages')} />
            </Box>
            <Box>
              <Text mb="sm" fw={500}>
                {t('admin-problem-add-form-timeLimit-label')}
              </Text>
              <NumberInput
                size="sm"
                radius="md"
                min={100}
                max={20000}
                suffix="MS"
                {...form.getInputProps('timeLimit')}
              />
            </Box>
            <Box>
              <Text mb="sm" fw={500}>
                {t('admin-problem-add-form-memoryLimit-label')}
              </Text>
              <NumberInput
                size="sm"
                radius="md"
                min={100}
                max={2000}
                suffix="MB"
                {...form.getInputProps('memoryLimit')}
              />
            </Box>
          </Flex>
          <Box mt="xl">
            <Text mb="sm" fw={500}>
              {t('admin-problem-add-form-difficulty-label')}
            </Text>
            <SegmentedControl
              {...form.getInputProps('difficulty')}
              data={[
                { label: t('admin-problem-add-form-difficulty-easy'), value: 'easy' },
                { label: t('admin-problem-add-form-difficulty-medium'), value: 'medium' },
                { label: t('admin-problem-add-form-difficulty-hard'), value: 'hard' },
              ]}
            />
          </Box>
          <Box mt="xl">
            <Text mb="sm" fw={500}>
              {t('admin-problem-add-form-tags-label')}
            </Text>
            <Flex>
              <Tags {...form.getInputProps('tags')} />
            </Flex>
          </Box>
          <Box mt="xl">
            <Text mb="sm" fw={500}>
              {t('admin-problem-add-form-author-label')}
            </Text>
            <Flex>
              <Tooltip
                position="right"
                color="gray"
                label={t('admin-problem-add-form-author-tooltip')}
              >
                <TextInput size="md" radius="lg" {...form.getInputProps('author')} />
              </Tooltip>
            </Flex>
          </Box>
          <Flex>
            <Box mt="xl">
              <Text mb="sm" fw={500}>
                {t('admin-problem-add-form-transparentTestCases-label')}
              </Text>
              <NumberInput
                size="sm"
                radius="md"
                min={0}
                max={100}
                {...form.getInputProps('transparentTestCases')}
              />
            </Box>
          </Flex>
        </form>
        <Box mt="xl">
          <Text mb="sm" fw={500}>
            {t('admin-problem-add-form-testCases-label')}
          </Text>
          <TestCases {...form.getInputProps('testCases')} />
        </Box>
      </Box>
      <Button
        onClick={() => (formRef.current ? formRef.current.requestSubmit() : null)}
        type="submit"
        mt="80px"
        radius="md"
      >
        {submitLabel}
      </Button>
    </>
  );
}
