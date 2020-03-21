import { Injectable } from "@angular/core";
import {
  HttpClientModule,
  HttpResponse,
  HttpClient
} from "@angular/common/http";
import { Estados } from "./models/estados-br";
import { Observable, observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DropdownService {
  constructor(private http: HttpClient) {}

  // getEstadosBR(): Observable<Estados[]> {
  //   return this.http.get<Estados>("assets/dados/estadosbr.json");
  // }

  getEstadosBR(): Observable<Estados[]> {
    return this.http.get<Estados[]>("assets/dados/estadosbr.json").pipe();
  }
}
