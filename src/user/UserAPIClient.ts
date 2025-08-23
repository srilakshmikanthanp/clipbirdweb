import Message from 'common/types/Message';
import UserRequestDto from 'user/UserRequestDto';
import UserResponseDto, { UserResponseDtoSchema } from 'user/UserResponseDto';
import axios from 'axios';

export default class UserAPIClient {
  private userApiBaseUrl = `/users`;

  create = async (userReq: UserRequestDto): Promise<UserResponseDto> => {
    const { data } = await axios.post<UserResponseDto>(
      this.userApiBaseUrl,
      userReq,
    );
    return UserResponseDtoSchema.parse(data);
  };

  resendVerificationMail = async (): Promise<void> => {
    return (await axios.post<void>(`${this.userApiBaseUrl}/verify/resend`)).data;
  }

  verify = async (token: string): Promise<void> => {
    return (await axios.post<void>(`${this.userApiBaseUrl}/verify/${token}`)).data;
  }

  get = async (): Promise<UserResponseDto> => {
    const { data } = await axios.get<UserResponseDto>(`${this.userApiBaseUrl}/me`);
    return UserResponseDtoSchema.parse(data);
  };

  update = async (userReq: UserRequestDto): Promise<UserResponseDto> => {
    const { data } = await axios.patch<UserResponseDto>(
      this.userApiBaseUrl,
      userReq,
    );
    return UserResponseDtoSchema.parse(data);
  };

  delete = async (): Promise<Message> => {
    return (await axios.delete<Message>(this.userApiBaseUrl)).data;
  };
}
