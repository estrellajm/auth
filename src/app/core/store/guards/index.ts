import { AuthGuard } from "./auth.guard";
import { UserGuard } from "./user.guard";

export const guards: any[] = [AuthGuard, UserGuard];

export * from './auth.guard'
export * from './user.guard'