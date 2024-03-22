import {
  IoClipboardOutline,
  IoTrophyOutline,
  IoPodiumOutline,
  IoPulseOutline,
} from 'react-icons/io5';
import { Box, NavLink } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';

const data = [
  {
    icon: IoClipboardOutline,
    path: '/dashboard/problems',
    label: 'navbar-problems-title',
    description: 'navbar-problems-description',
  },
  {
    icon: IoTrophyOutline,
    path: '/dashboard/contests',
    label: 'navbar-contests-title',
    description: 'navbar-contests-description',
  },
  {
    icon: IoPodiumOutline,
    path: '/dashboard/stats',
    label: 'navbar-stats-title',
    description: 'navbar-stats-description',
  },
  {
    icon: IoPulseOutline,
    path: '/dashboard/activity',
    label: 'navbar-activity-title',
    description: 'navbar-activity-description',
  },
];

export function Navbar() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const items = data.map((item) => (
    <NavLink
      key={item.label}
      active={item.path === pathname}
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
