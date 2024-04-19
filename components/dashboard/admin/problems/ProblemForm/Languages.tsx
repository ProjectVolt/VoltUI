import { Chip, Flex, Text } from '@mantine/core';
import { GetInputPropsReturnType } from '@mantine/form/lib/types';
import { useState } from 'react';

export function Languages({ value, onChange, onFocus, onBlur, error }: GetInputPropsReturnType) {
  const [languages, setLanguages] = useState<string[]>(value);

  const handleChange = (language: string, checked: boolean) => {
    const newLanguages = checked
      ? Array.from(new Set([...languages, language]))
      : languages.filter((l) => l !== language);
    setLanguages(newLanguages);
    onChange(newLanguages);
  };

  return (
    <>
      {error && (
        <Text mb="sm" c="red">
          {error}
        </Text>
      )}
      <Flex onFocus={onFocus} onBlur={onBlur} gap="md">
        <Chip
          checked={languages.includes('python')}
          onChange={(checked) => handleChange('python', checked)}
          variant="outline"
        >
          Python
        </Chip>
        <Chip
          checked={languages.includes('cpp')}
          defaultChecked
          onChange={(checked) => handleChange('cpp', checked)}
          variant="outline"
        >
          C++
        </Chip>
        <Chip
          checked={languages.includes('c')}
          defaultChecked
          onChange={(checked) => handleChange('c', checked)}
          variant="outline"
        >
          C
        </Chip>
      </Flex>
    </>
  );
}
