import { Component, HostBinding, OnDestroy, OnInit } from "@angular/core";
import { filter, forkJoin, map, Observable, Subject, switchMap, takeUntil } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { BackendService } from "../service/backend.service";

@Component({
  selector: "app-charting",
  templateUrl: "./charting.component.html",
  styleUrls: ["./charting.component.scss"]
})
export class ChartingComponent implements OnInit, OnDestroy {
  onDestroy: Subject<void> = new Subject<void>();
  @HostBinding("class") classes = "d-block p-4";
  files: string[] = ["File One", "File Two", "File Three"];
  form = this.formBuilder.group({
    file1: ["", [Validators.required]],
    file2: ["", [Validators.required]],
    file3: ["", [Validators.required]],
    file4: ["", [Validators.required]],
    key: [[], [Validators.required]]
  });
  fileObject$ = this.backendService.dummyFileObject();
  view: any[] = [700, 400];
  fileContentMap: Map<string, any> = new Map<string, any>();

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "";
  showYAxisLabel = true;
  yAxisLabel = "Population";
  chartData$!: Observable<any>;

  constructor(private formBuilder: FormBuilder, private backendService: BackendService) {
  }

  async ngOnInit() {
    this.files = await this.backendService.getFiles().toPromise();

    const fileKeys = ["file1", "file2", "file3", "file4"];
    for (const fileKey of fileKeys) {
      this.form.get(fileKey).valueChanges.pipe(takeUntil(this.onDestroy.asObservable())).subscribe((file) => this.fileContentMap.set(fileKey, file));
    }

    this.chartData$ = this.form.valueChanges.pipe(
      filter((formValue) => formValue.key?.length),
      map((formValue) => {
        this.yAxisLabel = formValue.key[formValue.key.length - 1];
        return fileKeys.map((name) => {
          return {
            name: formValue[name],
            value: this.getValueFromSchema(this.fileContentMap.get(name), formValue.key)
          };
        });
      })
    );
  }

  onKeySelected($event: string[]) {
    this.form.get("key").patchValue($event);
  }

  getValueFromSchema(schema: any, keyPath: string[]): number {
    return Number(keyPath.reduce((accumulator, key) => accumulator[key], schema));
  }

  enableOrDisableRelatedField() {
    const method = this.form.get("file1").valid ? "enable" : "disable";
    const formField = this.form.get("file2");
    formField[method]();
    formField.updateValueAndValidity();
    this.form.updateValueAndValidity();
  }

  ngOnDestroy(): void {
  }
}
