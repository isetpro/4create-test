import { Injectable } from "@angular/core";
import { IUser } from "../store/user.model";
import { BehaviorSubject, map, of, throttleTime } from "rxjs";

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
  users$$ = new BehaviorSubject<IUser[]>([]);
  get users() {
    return this.users$$.getValue();
  }
  set users(users: IUser[]) {
    this.users$$.next(users);
  }

  initUsers(length = 100) {
    const users = Array.from({ length }, (_, k) =>
      this.createNewRandomUser(k + 1)
    );
    this.users = users;
    return users;
  }

  createNewRandomUser(id: number): IUser {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      " " +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      ".";

    return {
      id: id.toString(),
      name: name,
      active: Math.round(Math.random()) === 0 ? true : false,
    };
  }

  addUser(user: IUser) {
    this.users = [
      { ...user, id: ((Number(this.users.at(-1)?.id) ?? 0) + 1).toString() },
      ...this.users,
    ];

    return this.users;
  }

  hasUser(name: string) {
    return of(this.users).pipe(
      throttleTime(1000),
      map((users) => users.some((user) => user.name === name))
    );
  }
}
