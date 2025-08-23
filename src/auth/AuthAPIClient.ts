import AuthToken from 'auth/AuthToken';
import BasicAuthRequest from 'auth/BasicAuthRequest';
import axios from 'axios';
import Message from 'common/types/Message';

export default class AuthAPIClient {
  private authApiBaseUrl = `/auth`;

  signin = async (credentials: BasicAuthRequest) => {
    return (
      await axios.post<AuthToken>(`${this.authApiBaseUrl}/signin`, credentials)
    ).data;
  };

  forgotPassword = async (userName: string) => {
    return await axios.post<Message>(
      `${this.authApiBaseUrl}/forgot-password/${userName}`
    );
  }

  resetPassword = async (token: string, password: string) => {
    return await axios.post<Message>(
      `${this.authApiBaseUrl}/reset-password/${token}`,
      { password }
    );
  };
}
