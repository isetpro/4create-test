import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { IUser } from "./user.model";

export interface UsersState extends EntityState<IUser> {}

@StoreConfig({ name: "users" })
@Injectable({ providedIn: "root" })
export class UsersStore extends EntityStore<UsersState, IUser> {
  constructor() {
    super();
  }
}
