import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { TableComponent } from "./table.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [TableComponent],
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,

    ReactiveFormsModule,
    RouterModule.forChild([{ path: "", component: TableComponent }]),
  ],
})
export class TableModule {}
