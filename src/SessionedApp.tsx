import {
  DashboardRounded,
  DevicesRounded,
  SettingsRounded
} from '@mui/icons-material';

import { Branding, Navigation, NavigationItem, Session } from '@toolpad/core/AppProvider';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { selectUser, setToken } from 'auth/authSlice';
import useImage from 'common/image/useImage';
import { useAppDispatch, useAppSelector } from 'common/redux/hooks';
import React from 'react';
import { Outlet, useNavigate } from 'react-router';

export default function SessionedApp() {
  const user = useAppSelector(selectUser)!;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const avatar = useImage({
    url: user.avatar || null,
  });

  const dashboard: NavigationItem = {
    title: 'Dashboard',
    icon: <DashboardRounded />,
  };

  const devices: NavigationItem = {
    title: 'Devices',
    segment: 'devices',
    icon: <DevicesRounded />,
    pattern: 'devices',
  };

  const settings: NavigationItem = {
    title: 'Settings',
    segment: 'settings',
    icon: <SettingsRounded />,
    pattern: 'settings{/:section}',
  };

  const navigation: Navigation = [];

  navigation.push(dashboard);
  navigation.push(devices);
  navigation.push(settings);

  const branding: Branding = {
    title: 'Clipbird',
    logo: <img src="/logo.png" alt="Clipbird Logo" />,
  };

  const authentication = React.useMemo(() => {
    return {
      signOut: () => dispatch(setToken(null)),
      signIn: () => navigate('/auth/signin'),
    };
  }, [
    navigate,
    dispatch
  ]);

  const session: Session = React.useMemo(() => {
    return {
      user: {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        image: avatar.url,
        email: user.email,
      }
    }
  }, [
    avatar.url,
    user.email,
    user.firstName,
    user.id,
    user.lastName
  ]);

  return (
    <ReactRouterAppProvider
      authentication={authentication}
      session={session}
      navigation={navigation}
      branding={branding}
    >
      <Outlet />
    </ReactRouterAppProvider>
  );
}
