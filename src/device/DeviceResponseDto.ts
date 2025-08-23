import { DeviceType } from './DeviceType';
import z from 'zod';

export default interface DeviceResponseDto {
  id: string;
  name: string;
  type: DeviceType;
  publicKey: string;
  isOnline: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const DeviceResponseDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.nativeEnum(DeviceType),
  publicKey: z.string(),
  isOnline: z.boolean(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
