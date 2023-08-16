import { QueryEntity } from "@datorama/akita";
import { Injectable } from "@angular/core";
import { IUser } from "../store/user.model";
import { UsersState, UsersStore } from "../store/users.store";

@Injectable({
  providedIn: "root",
})
export class UsersQuery extends QueryEntity<UsersState, IUser> {
  constructor(protected override store: UsersStore) {
    super(store);
  }
}
