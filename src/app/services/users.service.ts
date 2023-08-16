import { Injectable } from "@angular/core";
import { Observable, first, map, of, throttleTime } from "rxjs";
import { IUser } from "../store/user.model";
import { UsersStore } from "../store/users.store";
import { UsersQuery } from "../store/user.query";
import { guid } from "@datorama/akita";

/** Constants used to fill up our data base. */

const NAMES: string[] = [
  "Maia",
  "Asher",
  "Olivia",
  "Atticus",
  "Amelia",
  "Jack",
  "Charlotte",
  "Theodore",
  "Isla",
  "Oliver",
  "Isabella",
  "Jasper",
  "Cora",
  "Levi",
  "Violet",
  "Arthur",
  "Mia",
  "Thomas",
  "Elizabeth",
];

@Injectable({ providedIn: "root" })
export class UsersService {
  constructor(private usersStore: UsersStore, private usersQuery: UsersQuery) {
    this.initUsers();
  }

  get users() {
    return this.usersQuery.getAll();
  }
  set users(users: IUser[]) {
    this.usersStore.set(users);
  }

  initUsers(length = 3) {
    const users = Array.from({ length }, (_, k) =>
      this.createNewRandomUser(k + 1)
    );

    of(users)
      .pipe(first(), throttleTime(1000))
      .subscribe((users) => {
        this.users = users;
      });
  }

  createNewRandomUser(id: number): IUser {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      " " +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      ".";

    return {
      id: guid(),
      name,
      active: Math.round(Math.random()) === 0 ? true : false,
    };
  }

  changeUser(user: IUser): void {
    this.usersStore.update(user.id, user);
    console.log(this.usersQuery.getAll());
  }

  toggleActive(id: string): void {
    const user = this.users.find((user) => user.id === id);

    if (user) {
      return this.changeUser({
        ...user,
        active: !user.active,
      });
    }
  }

  hasUser(name: string): Observable<boolean> {
    return of(this.users).pipe(
      throttleTime(1000),
      map((users) => users.some((user) => user.name === name))
    );
  }

  addUser(user: IUser): void {
    this.usersStore.add(this.createUser(user.name, user.active));
  }

  private createUser(name: string, active = false) {
    return {
      id: guid(),
      name,
      active,
    } as IUser;
  }
}
