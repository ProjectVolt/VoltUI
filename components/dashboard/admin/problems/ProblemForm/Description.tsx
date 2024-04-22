import { Suspense } from 'react';
import { Skeleton, Text } from '@mantine/core';
import { GetInputPropsReturnType } from '@mantine/form/lib/types';
import { ForwardRefEditor } from '@/components/shared/editor';

export function Description({ value, onChange, onBlur, error }: GetInputPropsReturnType) {
  return (
    <>
      {error && (
        <Text mb="sm" c="red">
          {error}
        </Text>
      )}
      <Suspense
        fallback={<Skeleton mt="lg" height={500} width="100%" style={{ borderRadius: 10 }} />}
      >
        <ForwardRefEditor markdown={value} onChange={onChange} onBlur={onBlur} />
      </Suspense>
    </>
  );
}
