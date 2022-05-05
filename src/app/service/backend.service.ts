import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BackendService {
  private readonly BASE_URL = "https://6cf9-103-37-201-177.in.ngrok.io";

  constructor(private httpClient: HttpClient) {
  }

  getFileToTally(fileName: string): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}/fetchJson?fieldId=${fileName}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
  }

  dummyFileObject(): Observable<any> {
    return this.httpClient.get("./assets/json/dummy-resp.json");
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.httpClient.post(`${this.BASE_URL}/uploadJson`, formData);
  }

  getFiles(): Observable<string[]> {
    return this.httpClient.get(`${this.BASE_URL}/fetchJsonList`).pipe(map((response: Array<Object>) => response.map((obj) => obj["fileId"])));
  }
}
