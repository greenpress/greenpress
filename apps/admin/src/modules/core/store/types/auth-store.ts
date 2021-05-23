import { IUser } from './user'

export interface IAuthStore {
  user: IUser | null,
  isLoaded: boolean,
  userPromise: Promise<IUser> | null,
}
