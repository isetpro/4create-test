import { guid } from "@datorama/akita";

export interface IUser {
  id: string;
  name: string;
  active: boolean;
}

export function createUser(name: string, active = false) {
  return {
    id: guid(),
    name,
    active,
  } as IUser;
}
