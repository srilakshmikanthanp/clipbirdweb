import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import App from 'App';
import AuthenticatedApp from 'AuthenticatedApp';
import Signin from 'auth/Signin';
import { setToken } from 'auth/authSlice';
import axios from 'axios';
import apiUrls from 'common/constants/apiUrls';
import { store } from 'common/redux/store';
import { Sortable } from 'common/types/Pageable';
import Dashboard from 'dashboard/Dashboard';
import qs from 'qs';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Settings from 'settings/Settings';
import AccountCreated from 'user/AccountCreated';
import NewUser from 'user/NewUser';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Unauthorized from 'Unauthorized';
import ForgotPassword from 'auth/ForgotPassword';
import ResetPassword from 'auth/ResetPassword';
import UnVerifiedEmail from 'auth/UnVerifiedEmail';
import VerifyEmail from 'auth/VerifyEmail';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppDashboardLayout from 'layout/AppDashboardLayout';
import Devices from 'device/Devices';
import Sessions from 'session/Sessions';

// set tenant id and token in request headers
axios.interceptors.request.use(function (config) {
  const token = store.getState().auth.token;
  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// on 401 error, logout
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403 && error.response.data.code === 'USER_NOT_VERIFIED') {
      window.location.href = '/auth/unverified-email';
    } else if (error.response.status === 401) {
      store.dispatch(setToken(null));
    }
    return Promise.reject(error);
  },
);

// serialize query params
axios.defaults.paramsSerializer = (params) => {
  const { sort, ...rest } = params;
  return qs.stringify(
    {
      sort: sort
        ? sort.map((s: Sortable) => `${s.property},${s.order}`)
        : undefined,
      ...rest,
    },
    {
      arrayFormat: 'brackets',
    },
  );
};

axios.defaults.baseURL = apiUrls.appApiBaseUrl;

const settingsRoute = (
  <Route path="settings/:section?" element={<Settings />} />
);

const devicesRoute = (
  <Route path="devices">
    <Route index element={<Devices />} />
  </Route>
);

const sessionsRoute = (
  <Route path="sessions">
    <Route index element={<Sessions />} />
  </Route>
);

const indexRoute = (
  <Route index element={<Dashboard />} />
);

const appRoute = (
  <Route element={<AuthenticatedApp />}>
    <Route path="/" element={<AppDashboardLayout />}>
      {settingsRoute}
      {indexRoute}
      {devicesRoute}
      {sessionsRoute}
    </Route>
  </Route>
);

const userRoute = (
  <Route element={<App />}>
    <Route path="users">
      <Route path="new">
        <Route path="success" element={<AccountCreated />} />
        <Route index element={<NewUser />} />
      </Route>
    </Route>
  </Route>
);

const authRoute = (
  <Route element={<App />}>
    <Route path="auth">
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="unverified-email" element={<UnVerifiedEmail />} />
      <Route path="verify-email" element={<VerifyEmail />} />
      <Route path="signin" element={<Signin />} />
    </Route>
  </Route>
);

const unauthorizedRoute = (
  <Route element={<App />}>
    <Route path="unauthorized" element={<Unauthorized />} />
  </Route>
);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <BrowserRouter>
            <Routes>
              {unauthorizedRoute}
              {userRoute}
              {appRoute}
              {authRoute}
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);

const TOOLPAD_COLOR_SCHEME = 'data-toolpad-color-scheme';

const setThemeAttribute = (scheme: string) => {
  document.documentElement.setAttribute('data-color-mode', scheme);
};

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (
      mutation.type === 'attributes' &&
      mutation.attributeName === TOOLPAD_COLOR_SCHEME
    ) {
      setThemeAttribute(
        (mutation.target as Element).getAttribute(TOOLPAD_COLOR_SCHEME)!,
      );
    }
  });
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: [TOOLPAD_COLOR_SCHEME],
});

setThemeAttribute(document.documentElement.getAttribute(TOOLPAD_COLOR_SCHEME)!);
