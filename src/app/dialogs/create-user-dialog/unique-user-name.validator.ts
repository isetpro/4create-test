import { Injectable } from "@angular/core";
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from "@angular/forms";
import { Observable, map, catchError, of, tap } from "rxjs";
import { UsersService } from "src/app/services/users.service";

@Injectable({ providedIn: "root" })
export class UniqueUserNameValidator implements AsyncValidator {
  constructor(private usersService: UsersService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.usersService.hasUser((control.value as string).trim()).pipe(
      map((hasUser) => (hasUser ? { uniqueUserName: true } : null)),
      catchError(() => of(null))
    );
  }
}
