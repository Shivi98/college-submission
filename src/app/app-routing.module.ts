import { NgModule }             from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FileUploadComponent }  from "./file-upload/file-upload.component";
import { ChartingComponent }    from "./charting/charting.component";

const routes: Routes = [
  { path: "", component: FileUploadComponent },
  { path: "observe", component: ChartingComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
