import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "pages", pathMatch: "full" },
  {
    path: "pages",
    loadChildren: () =>
      import("./pages/table/table.module").then((m) => m.TableModule),
  },
  {
    path: "**",
    redirectTo: "pages",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
