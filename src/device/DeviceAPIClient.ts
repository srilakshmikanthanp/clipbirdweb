import PageResponse from 'common/types/PageResponse';
import { Pageable } from 'common/types/Pageable';
import DeviceResponseDto, {
  DeviceResponseDtoSchema,
} from './DeviceResponseDto';
import axios from 'axios';

export default class DeviceAPIClient {
  private readonly deviceBaseUrl = '/devices';

  getDeviceById = async (id: string): Promise<DeviceResponseDto> => {
    const { data } = await axios.get<DeviceResponseDto>(
      `${this.deviceBaseUrl}/${id}`,
    );
    return DeviceResponseDtoSchema.parse(data);
  };

  getAllDevices = async (
    pageable: Pageable,
    search?: string | null,
  ): Promise<PageResponse<DeviceResponseDto>> => {
    const { data } = await axios.get<PageResponse<DeviceResponseDto>>(
      this.deviceBaseUrl,
      {
        params: {...pageable, search },
      },
    );
    return {
      ...data,
      content: data.content.map((device) =>
        DeviceResponseDtoSchema.parse(device),
      ),
    };
  };

  deleteDevice = async (id: string): Promise<void> => {
    await axios.delete(`${this.deviceBaseUrl}/${id}`);
  };
}
