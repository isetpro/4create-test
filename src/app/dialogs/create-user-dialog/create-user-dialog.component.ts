import { CommonModule } from "@angular/common";
import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { IUser } from "src/app/store/user.model";
import { UniqueUserNameValidator } from "./unique-user-name.validator";

export interface CreateUserDialogComponentData {
  users: IUser[];
}
@Component({
  selector: "app-create-user-dialog",
  templateUrl: "./create-user-dialog.component.html",
  styleUrls: ["./create-user-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
})
export class CreateUserDialogComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl("", {
      validators: [Validators.required],
      asyncValidators: [
        this.uniqueUserNameValidator.validate.bind(
          this.uniqueUserNameValidator
        ),
      ],
    }),
    active: new FormControl(false),
  });
  users: IUser[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: CreateUserDialogComponentData,
    private uniqueUserNameValidator: UniqueUserNameValidator
  ) {
    this.users = data.users;
  }

  public get nameControl(): FormControl {
    return this.form.get("name") as FormControl;
  }

  ngOnInit() {}
  create() {
    this.dialogRef.close(this.form.value);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  getErrorMessage() {
    if (this.nameControl.hasError("required")) {
      return "You must enter a value";
    }
    return this.nameControl.hasError("uniqueUserName")
      ? "Name already exists"
      : "";
  }
}
