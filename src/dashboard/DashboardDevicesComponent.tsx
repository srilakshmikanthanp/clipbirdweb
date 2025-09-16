import { DevicesRounded } from "@mui/icons-material";
import { Box, List, ListItem, Pagination, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import SkeletonList from "common/components/SkeletonList";
import { Sortable } from "common/types/Pageable";
import DeviceAPIClient from "device/DeviceAPIClient";
import DeviceResponseDto from "device/DeviceResponseDto";
import { useState } from "react";
import { useNavigate } from "react-router";
import DashboardComponent from "./DashboardComponent";

export default function DashboardDevicesComponent() {
  const deviceAPIClient = new DeviceAPIClient();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [sort] = useState<Sortable[]>([
    {
      property: 'name',
      order: 'ASC',
    },
  ]);

  const devicesResponse = useQuery({
    queryKey: ['devices', { page, sort }],
    queryFn: () => {
      return deviceAPIClient.getAllDevices(
        { page, size: 5, sort },
      );
    },
  });

  const handleClick = () => {
    navigate("/devices");
  }

  const Asset = ({ device }: { device: DeviceResponseDto }) => {
    return (
      <Box display="flex" alignItems="center">
        <Box>
          <Typography
            variant="body2"
            color="text.primary"
            fontWeight={500}
          >
            {device.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textTransform: 'lowercase' }}
          >
            {device.type}
          </Typography>
        </Box>
      </Box>
    )
  }

  const Content = () => (
    <Box display="flex" flexDirection="column" height="100%">
      <List sx={{ flexGrow: 1 }}>
        {devicesResponse.data?.content.length === 0 && (
          <ListItem>
            <Box display="flex" justifyContent="center" width="100%">
              <Typography variant="body2" color="text.secondary">
                No devices found
              </Typography>
            </Box>
          </ListItem>
        )}
        {devicesResponse.data?.content.map((device) => (
          <ListItem key={device.id}>
            <Asset device={device} />
          </ListItem>
        ))}
      </List>
      <Box
        mt="auto"
        display="flex"
        justifyContent="center"
        pt={2}
      >
        <Pagination
          onChange={(_event, newPage) => setPage(newPage - 1)}
          count={devicesResponse.data?.page.totalPages}
          page={page + 1}
        />
      </Box>
    </Box>
  )

  return (
    <DashboardComponent
      name="Devices"
      description="Your devices"
      icon={<DevicesRounded />}
      action="Open"
      onClick={handleClick}
    >
      {devicesResponse.isLoading ? (
        <SkeletonList rows={5} />
      ) : (
        <Content />
      )}
    </DashboardComponent>
  )
}
