'use client';

import { useState } from 'react';
import { AppShell, Burger, Flex, Group } from '@mantine/core';
import { Logo } from '@/components/shared/logo';
import { User } from './user';
import { Navbar } from './navbar';

export function ShellLayout({ children }: { children: any }) {
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Flex h="100%" w="100%" px="xl" align="center" justify="space-between">
          <Group h="100%">
            <Burger opened={opened} onClick={() => setOpened(!opened)} hiddenFrom="sm" size="sm" />
            <Logo width={100} />
          </Group>
          <User />
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
