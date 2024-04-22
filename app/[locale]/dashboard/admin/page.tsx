import { redirect } from 'next/navigation';

export default function DashboardAdminPage() {
  // temporary redirect, should be removed when the main admin page is implemented
  redirect('/dashboard/admin/problems');
}
