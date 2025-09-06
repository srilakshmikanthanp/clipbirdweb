import Message from 'common/types/Message';
import SessionResponseDto, { SessionResponseDtoSchema } from 'session/SessionResponseDto';
import axios from 'axios';

export default class SessionAPIClient {
  private sessionApiBaseUrl = `/sessions`;

  getAll = async (): Promise<SessionResponseDto[]> => {
    const { data } = await axios.get<SessionResponseDto[]>(this.sessionApiBaseUrl);
    return data.map((session) => SessionResponseDtoSchema.parse(session));
  }

  delete = async (id: string): Promise<Message> => {
    return (await axios.delete<Message>(`${this.sessionApiBaseUrl}/${id}`)).data;
  }
}
