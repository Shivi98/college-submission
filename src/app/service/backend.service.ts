import { Injectable }      from "@angular/core";
import { HttpClient }      from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BackendService {
  private readonly BASE_URL = "http://loalhost:3000";

  constructor(private httpClient: HttpClient) {
  }

  getFileToTally(fileName: string): Observable<any> {
    return this.httpClient.get("./assets/json/dummy-resp.json");
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
    return this.httpClient.get(`${this.BASE_URL}/getFiles`).pipe(map((response) => response["fileId_list"]));
  }
}
