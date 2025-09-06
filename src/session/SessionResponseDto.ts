import z from 'zod';

export default interface SessionResponseDto {
  id: string;
  current: boolean;
  userAgent: string | null;
  ipAddress: string;
  expiry: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const SessionResponseDtoSchema = z.object({
  id: z.string().uuid(),
  current: z.boolean(),
  userAgent: z.string().nullable(),
  ipAddress: z.string().ip(),
  expiry: z.coerce.date(),
  userId: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
