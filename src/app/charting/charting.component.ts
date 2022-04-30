import { Component, HostBinding, OnInit }               from "@angular/core";
import { filter, forkJoin, map, Observable, switchMap } from "rxjs";
import { FormBuilder, Validators }                      from "@angular/forms";
import { BackendService }                               from "../service/backend.service";

@Component({
  selector: "app-charting",
  templateUrl: "./charting.component.html",
  styleUrls: ["./charting.component.scss"]
})
export class ChartingComponent implements OnInit {
  @HostBinding("class") classes = "d-block p-4";
  files: string[] = ["File One", "File Two", "File Three"];
  form = this.formBuilder.group({
    file1: ["", [Validators.required]],
    file2: [{ value: "", disabled: true }, [Validators.required]],
    key: [[], [Validators.required]]
  });
  fileObject$ = this.backendService.dummyFileObject();
  view: any[] = [700, 400];

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
    this.chartData$ = this.form.valueChanges.pipe(
      filter((formValue) => formValue.file1 && formValue.file2 && formValue.key.length),
      switchMap((formValue) => forkJoin([this.backendService.getFileToTally(formValue.file1), this.backendService.getFileToTally(formValue.file2)])),
      map(([file1, file2]) => {
        const formValue = this.form.getRawValue();
        this.yAxisLabel = formValue.key[formValue.key.length - 1];

        return [
          { name: formValue.file1, value: this.getValueFromSchema(file1, formValue.key) },
          { name: formValue.file2, value: this.getValueFromSchema(file2, formValue.key) }
        ];
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
}
