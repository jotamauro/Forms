import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConsultaCepService } from "../shared/service/consulta-cep.service";

@Component({
  selector: "app-template-form",
  templateUrl: "./template-form.component.html",
  styleUrls: ["./template-form.component.css"]
})
export class TemplateFormComponent implements OnInit {
  usuario: any = {
    nome: null,
    email: null
  };
  constructor(
    private Http: HttpClient,
    private retornaCep: ConsultaCepService
  ) {}

  ngOnInit() {}
  onSubmit(form) {
    this.Http.post(
      "https://httpbin.org/post",
      JSON.stringify(form.value)
    ).subscribe(dados => console.log(dados));
  }

  verificaValidTouched(campo) {
    return campo.invalid && campo.touched;
  }
  aplicaCssErro(campo) {
    return {
      "has-error": this.verificaValidTouched(campo),
      "class.has-feedback": this.verificaValidTouched(campo)
    };
  }
  consultaCEP(cep, form) {
    if (cep !== null && cep !== "") {
      this.retornaCep
        .getCEP(cep)
        .subscribe(dados => this.populaDadosForm(dados, form));
    }
  }

  populaDadosForm(dados, form) {
    form.form.patchValue({
      endereco: {
        cep: dados.cep,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
        complemento: dados.complemento
      }
    });
  }
  resetaDadosForm(formulario) {
    formulario.form.patchValue({
      endereco: {
        cep: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null,
        complemento: null
      }
    });
  }
}
