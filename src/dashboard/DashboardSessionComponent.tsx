import { LanguageRounded } from "@mui/icons-material";
import { Box, List, ListItem, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import SkeletonList from "common/components/SkeletonList";
import { useNavigate } from "react-router";
import SessionAPIClient from "session/SessionAPIClient";
import SessionResponseDto from "session/SessionResponseDto";
import DashboardComponent from "./DashboardComponent";

export default function DashboardSessionsComponent() {
  const sessionAPIClient = new SessionAPIClient();
  const navigate = useNavigate();
  const sessionsResponse = useQuery({
    queryKey: ['sessions'],
    queryFn: () => {
      return sessionAPIClient.getAll()
    },
  });

  const handleClick = () => {
    navigate("/sessions");
  }

  const Asset = ({ session }: { session: SessionResponseDto }) => {
    return (
      <Box display="flex" alignItems="center">
        <Box>
          <Typography
            variant="body2"
            color="text.primary"
            fontWeight={500}
          >
            {session.userAgent}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textTransform: 'lowercase' }}
          >
            {session.ipAddress}
          </Typography>
        </Box>
      </Box>
    )
  }

  const Content = () => (
    <Box display="flex" flexDirection="column" height="100%">
      <List sx={{ flexGrow: 1 }}>
        {sessionsResponse.data?.length === 0 && (
          <ListItem>
            <Box display="flex" justifyContent="center" width="100%">
              <Typography variant="body2" color="text.secondary">
                No sessions found
              </Typography>
            </Box>
          </ListItem>
        )}
        {sessionsResponse.data?.map((session) => (
          <ListItem key={session.id}>
            <Asset session={session} />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <DashboardComponent
      name="Sessions"
      description="Your sessions"
      icon={<LanguageRounded />}
      action="Open"
      onClick={handleClick}
    >
      {sessionsResponse.isLoading ? (
        <SkeletonList rows={5} />
      ) : (
        <Content />
      )}
    </DashboardComponent>
  )
}
