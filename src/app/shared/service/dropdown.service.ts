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
  getCargos() {
    return [
      { nome: "Dev", nivel: "Júnior", desc: "Dev Jr" },
      { nome: "Dev", nivel: "Pleno", desc: "Dev Pl" },
      { nome: "Dev", nivel: "Sênior", desc: "Dev Sr" }
    ];
  }
  getTecnologias() {
    return [
      { nome: "Java", desc: "Java" },
      { nome: "javascript", desc: "JavaScript" },
      { nome: "php", desc: "PHP" },
      { nome: "ruby", desc: "Ruby" }
    ];
  }
}
