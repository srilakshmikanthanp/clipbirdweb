import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router';

export default function App() {
  return (
    <ReactRouterAppProvider>
      <Outlet />
    </ReactRouterAppProvider>
  );
}
