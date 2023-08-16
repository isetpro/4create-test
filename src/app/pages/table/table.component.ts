import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { IUser } from "src/app/store/user.model";
import { MatDialog } from "@angular/material/dialog";
import { CreateUserDialogComponent } from "src/app/dialogs/create-user-dialog/create-user-dialog.component";
import { UsersService } from "src/app/services/users.service";
@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  displayedColumns: string[] = ["id", "name", "active"];
  dataSource?: MatTableDataSource<IUser>;

  constructor(public dialog: MatDialog, private userService: UsersService) {}

  get addUserEnabled() {
    return (
      this.dataSource &&
      this.dataSource.data.length < 5 &&
      this.dataSource.data.every((user) => user.active)
    );
  }
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit() {
    // Assign the data to the data source for the table to render
    const users = this.userService.initUsers(4);
    this.dataSource = new MatTableDataSource(users);
  }

  applyFilter(event: Event) {
    if (!this.dataSource) {
      return;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  toggleActive(id: string) {
    if (!this.dataSource) {
      return;
    }
    const users = this.dataSource.data;
    const user = users.find((user) => user.id === id);
    if (user) {
      user.active = !user.active;
    }
    this.dataSource.data = users;
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      data: {
        users: this.dataSource?.data,
      },
      width: "450px",
    });

    dialogRef.afterClosed().subscribe((user) => {
      if (user) {
        if (!this.dataSource) {
          return;
        }

        this.dataSource.data = this.userService.addUser(user);
      }
    });
  }
}
