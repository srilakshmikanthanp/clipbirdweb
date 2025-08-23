import {
  Box,
  Divider,
  Paper,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router';
import { PageContainer, useActivePage } from '@toolpad/core';

import { AccountCircleRounded, SettingsRounded } from '@mui/icons-material';
import ProfileSettings from './ProfileSettings';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

export default function Settings() {
  const { section } = useParams();
  const navigate = useNavigate();
  const activePage = useActivePage()!;

  if (!section) {
    return <Navigate to="/settings/profile" />;
  }

  const handleTabChange = (_event: React.SyntheticEvent, section: string) => {
    navigate(`/settings/${section}`);
  };

  const title = section.charAt(0).toUpperCase() + section.slice(1);
  const path = `${activePage.path}/${section}`;
  const breadcrumbs = [...activePage.breadcrumbs, { title, path }];

  return (
    <PageContainer maxWidth={false} title={title} breadcrumbs={breadcrumbs}>
      <Box sx={{ mt: 2 }}>
        <Paper
          className="d-flex flex-row justify-content-center align-items-center"
          style={{ height: '300px' }}
          elevation={1}
        >
          <Box display='flex' flexDirection='row' alignItems='center' justifyContent='center' gap={3}>
            <SettingsRounded sx={{ fontSize: 100 }} />
            <Divider orientation='vertical' flexItem />
            <Typography variant="h3">
              {title}
            </Typography>
          </Box>
        </Paper>
      </Box>
      <TabContext value={section}>
        <Tabs
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
          onChange={handleTabChange}
          value={section}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            icon={<AccountCircleRounded sx={{ width: 24, height: 24 }} />}
            iconPosition="start"
            label="Profile"
            value="profile"
          />
        </Tabs>
        <TabPanel value="profile">
          <ProfileSettings />
        </TabPanel>
      </TabContext>
    </PageContainer>
  );
}
