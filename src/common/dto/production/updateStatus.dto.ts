import { IsEnum } from 'class-validator';

// export enum ProductionStatus {
//   PENDING = 'Pending',
//   IN_PROGRESS = 'In Progress',
//   COMPLETED = 'Completed',
//   CANCELLED = 'Cancelled',
// }

export class UpdateStatusDto {
  @IsEnum(['pending', 'in_progress', 'completed', 'cancelled'])
  status: string;
}