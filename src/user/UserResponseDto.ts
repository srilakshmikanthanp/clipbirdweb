import z from 'zod';

export default interface UserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  avatar: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const UserResponseDtoSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  userName: z.string(),
  email: z.string(),
  password: z.string(),
  avatar: z.string().nullable(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
