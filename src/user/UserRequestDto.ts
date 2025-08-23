export default interface UserRequestDto {
  firstName: string;
  lastName: string;
  userName: string;
  email?: string;
  password?: string;
  avatar: string | null;
  isActive: boolean;
}
