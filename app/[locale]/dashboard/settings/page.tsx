'use client';

import { Flex } from '@mantine/core';
import { Header } from '@/components/dashboard/settings/Header';
import { UserDataForm } from '@/components/dashboard/settings/UserDataForm';

export default function UserSettingsPage() {
  return (
    <>
      <Flex m="xl" direction="column">
        <Header />
        <UserDataForm />
      </Flex>
    </>
  );
}
