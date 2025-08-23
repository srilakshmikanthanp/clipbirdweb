import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { Outlet } from 'react-router';

export default function AppDashboardLayout() {
  const ToolbarActions = () => (
    <>
      <ThemeSwitcher />
    </>
  );

  return (
    <DashboardLayout
      defaultSidebarCollapsed
      slots={{ toolbarActions: ToolbarActions }}
    >
      <Outlet />
    </DashboardLayout>
  );
}
