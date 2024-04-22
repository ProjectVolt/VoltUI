import { IoClipboardOutline } from 'react-icons/io5';
import { Box, NavLink } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';

const data = [
  {
    icon: IoClipboardOutline,
    path: '/dashboard/admin/problems',
    label: 'navbar-problems-title',
    description: 'navbar-problems-admin-description',
  },
];

export function AdminNavbar() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const items = data.map((item) => (
    <NavLink
      key={item.label}
      active={pathname.startsWith(item.path)}
      label={t(item.label)}
      description={t(item.description)}
      leftSection={<item.icon size="1rem" />}
      ps="xl"
      onClick={() => router.push(item.path)}
      color="teal"
      variant="filled"
    />
  ));

  return <Box w="100%">{items}</Box>;
}
