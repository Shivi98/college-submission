import { Component, OnInit } from "@angular/core";
import { BackendService }    from "../service/backend.service";

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"]
})
export class FileUploadComponent implements OnInit {
  uploadStatus: "success" | "failure";
  selectedFile: File;

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
  }

  uploadFile() {
    console.log('Upload Clicked');
    if (this.selectedFile) {
      this.backendService.uploadFile(this.selectedFile).subscribe({
        next: () => {
          this.uploadStatus = "success";
        },
        error: () => {
          this.uploadStatus = "failure";
        }
      });
    }
  }

  onFileSelected($event: Event) {
    this.selectedFile = ($event.target as HTMLInputElement).files?.[0];
  }

  dismissMessage() {
    this.uploadStatus = undefined;
  }
}
