import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule }                 from "./app-routing.module";
import { AppComponent }                     from "./app.component";
import { NgbModule }                        from "@ng-bootstrap/ng-bootstrap";
import { FileUploadComponent }              from "./file-upload/file-upload.component";
import { ChartingComponent }                from "./charting/charting.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TreeComponent }                    from "./tree/tree.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IsObjectPipe }      from "./pipes/is-object.pipe";
import { HttpClientModule }  from "@angular/common/http";
import { NgxChartsModule }                  from "@swimlane/ngx-charts";
import { BrowserAnimationsModule }          from "@angular/platform-browser/animations";
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    ChartingComponent,
    TreeComponent,
    IsObjectPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
