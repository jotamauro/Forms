import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ConsultaCepService {
  constructor(private Http: HttpClient) {}

  getCEP(cep: string) {
    cep = cep.replace(/\D/g, "");

    if (cep != "") {
      var validaCEP = /^[0-9]{8}$/;
      if (validaCEP.test(cep)) {
        return this.Http.get("https://viacep.com.br/ws/" + cep + "/json");
      }
    }
    return of({});
  }
}
