'use client';

import { forwardRef, useEffect, useState } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { Group, Avatar, Text, Menu, UnstyledButton, Skeleton } from '@mantine/core';
import { IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { User, useUser } from '@/data';
import classes from './user.module.css';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  user: User | null;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ user, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: 'var(--mantine-spacing-md)',
        color: 'var(--mantine-color-text)',
        borderRadius: 'var(--mantine-radius-sm)',
      }}
      {...others}
    >
      <Group>
        <Avatar radius="xl" />

        <div className={classes.userData}>
          <Text size="sm" fw={500}>
            {user?.username}
          </Text>

          <Text c="dimmed" size="xs">
            {user?.email}
          </Text>
        </div>

        {icon || <IconChevronRight className={classes.arrow} size="1rem" />}
      </Group>
    </UnstyledButton>
  )
);

export function User() {
  const { t } = useTranslation();
  const { user, error, isLoading } = useUser();
  const [onClient, setOnClient] = useState(false);
  useEffect(() => {
    setOnClient(true);
  }, []);
  const router = useRouter();
  const navigate = (path: string) => router.push(path);
  useEffect(() => {
    if (error) {
      notifications.show({
        title: t('user-menu-error-title'),
        message: t('user-menu-error-message'),
        color: 'red',
      });
    }
  }, [error]);
  return (
    <div>
      {!onClient || isLoading ? (
        <Group>
          <Skeleton height={40} circle />

          <div className={classes.userData}>
            <Skeleton height={12} width={180} mt={6} radius="xl" />
            <Skeleton height={12} width={180} mt={6} radius="xl" />
          </div>
          <IconChevronRight className={classes.arrow} size="1rem" />
        </Group>
      ) : (
        <Menu width={200} position="bottom-end">
          <Menu.Target>
            <UserButton user={user} />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>{t('user-menu-app-section')}</Menu.Label>
            <Menu.Item leftSection={<IoSettingsOutline />}>{t('user-menu-app-settings')}</Menu.Item>
            <Menu.Divider />
            <Menu.Label>{t('user-menu-user-section')}</Menu.Label>
            <Menu.Item leftSection={<IoSettingsOutline />}>
              {t('user-menu-user-settings')}
            </Menu.Item>
            <Menu.Item onClick={() => navigate('/logout')} leftSection={<IoLogOutOutline />}>
              {t('user-menu-user-logout')}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </div>
  );
}
