import * as yup from 'yup';
import { TFunction } from 'i18next';

export type TestCase = {
  name: string;
  input: string;
  output: string;
  maxScore: number;
};

export function getTestCaseSchema(t: TFunction<'translation', undefined>) {
  return yup.object().shape({
    name: yup
      .string()
      .min(2, t('admin-problem-add-schema-testCases-name-min'))
      .max(50, t('admin-problem-add-schema-testCases-name-max'))
      .required(t('admin-problem-add-schema-testCases-name-required')),
    input: yup
      .string()
      .max(10000, t('admin-problem-add-schema-testCases-input-max'))
      .required(t('admin-problem-add-schema-testCases-input-required')),
    output: yup
      .string()
      .max(10000, t('admin-problem-add-schema-testCases-output-max'))
      .required(t('admin-problem-add-schema-testCases-output-required')),
    maxScore: yup
      .number()
      .min(1, t('admin-problem-add-schema-testCases-maxScore-min'))
      .max(10, t('admin-problem-add-schema-testCases-maxScore-max'))
      .required(t('admin-problem-add-schema-testCases-maxScore-required')),
  });
}

export function getMainSchema(t: TFunction<'translation', undefined>) {
  return yup.object().shape(
    {
      visible: yup.boolean().required(t('admin-problem-add-schema-visible-required')),
      name: yup
        .string()
        .min(3, t('admin-problem-add-schema-title-min'))
        .max(50, t('admin-problem-add-schema-title-max'))
        .matches(/^[a-zA-Z0-9 ]+$/, t('admin-problem-add-schema-title-pattern'))
        .required(t('admin-problem-add-schema-title-required')),
      description: yup
        .string()
        .min(2, t('admin-problem-add-schema-description-min'))
        .max(10000, t('admin-problem-add-schema-description-max'))
        .required(t('admin-problem-add-schema-description-required')),
      languages: yup
        .array()
        .of(
          yup
            .string()
            .matches(/(python)|(cpp)|(c)/, t('admin-problem-add-schema-languages-pattern'))
            .required(t('admin-problem-add-schema-languages-required'))
        )
        .min(1, t('admin-problem-add-schema-languages-min')),
      timeLimit: yup
        .number()
        .min(100, t('admin-problem-add-schema-timeLimit-min'))
        .max(20000, t('admin-problem-add-schema-timeLimit-max'))
        .required(t('admin-problem-add-schema-timeLimit-required')),
      memoryLimit: yup
        .number()
        .min(100, t('admin-problem-add-schema-memoryLimit-min'))
        .max(2000, t('admin-problem-add-schema-memoryLimit-max'))
        .required(t('admin-problem-add-schema-memoryLimit-required')),
      difficulty: yup
        .string()
        .matches(/(easy)|(medium)|(hard)/, t('admin-problem-add-schema-difficulty-pattern'))
        .required(t('admin-problem-add-schema-difficulty-required')),
      tags: yup.array().of(
        yup.object().shape({
          id: yup.number().min(1, t('admin-problem-add-schema-tags-min')).required(),
          name: yup.string(),
        })
      ),
      testCases: yup
        .array()
        .of(
          yup.object().shape({
            name: yup
              .string()
              .min(2, t('admin-problem-add-schema-testCases-name-min'))
              .max(50, t('admin-problem-add-schema-testCases-name-max'))
              .required(t('admin-problem-add-schema-testCases-name-required')),
            input: yup
              .string()
              .max(10000, t('admin-problem-add-schema-testCases-input-max'))
              .required(t('admin-problem-add-schema-testCases-input-required')),
            output: yup.string().max(10000, t('admin-problem-add-schema-testCases-output-max')),
            maxScore: yup
              .number()
              .min(1, t('admin-problem-add-schema-testCases-maxScore-min'))
              .max(10, t('admin-problem-add-schema-testCases-maxScore-max'))
              .required(t('admin-problem-add-schema-testCases-maxScore-required')),
          })
        )
        .min(1, t('admin-problem-add-schema-testCases-min'))
        .max(100, t('admin-problem-add-schema-testCases-max')),
      transparentTestCases: yup
        .number()
        .min(0, t('admin-problem-add-schema-transparentTestCases-min'))
        .max(100, t('admin-problem-add-schema-transparentTestCases-max'))
        .required(t('admin-problem-add-schema-transparentTestCases-required')),
      author: yup.string().when('author', (val) => {
        if (val.length > 0 && val[0] && val[0].length > 0) {
          return yup
            .string()
            .min(2, t('admin-problem-add-schema-author-min'))
            .max(50, t('admin-problem-add-schema-author-max'));
        }
        return yup.string().notRequired();
      }),
    },
    [['author', 'author']]
  );
}
