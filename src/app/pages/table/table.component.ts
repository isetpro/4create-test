import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subject, takeUntil } from "rxjs";
import { CreateUserDialogComponent } from "src/app/dialogs/create-user-dialog/create-user-dialog.component";
import { UsersService } from "src/app/services/users.service";
import { IUser } from "src/app/store/user.model";
import { UsersQuery } from "src/app/store/user.query";
@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  dataSource: MatTableDataSource<IUser> = new MatTableDataSource(
    this.usersQuery.getAll()
  );

  readonly displayedColumns: string[] = ["id", "name", "active"];

  private readonly destroy$$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private userService: UsersService,
    private usersQuery: UsersQuery
  ) {}

  get addUserEnabled() {
    return (
      this.dataSource.data.length < 5 &&
      this.dataSource.data.every((user) => user.active)
    );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  toggleActive(id: string) {
    this.userService.toggleActive(id);

    this.dataSource.data = this.usersQuery.getAll();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      data: {
        users: this.dataSource?.data,
      },
      width: "450px",
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$$))
      .subscribe((user) => {
        if (!user) {
          return;
        }

        this.userService.addUser(user);
        this.dataSource.data = this.usersQuery.getAll();
      });
  }
}
