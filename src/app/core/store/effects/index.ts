import { RouterEffects } from './router.effects';
import { UserEffects } from './user.effects';

export const effects: any[] = [RouterEffects, UserEffects];

export * from './router.effects';
export * from './user.effects';
