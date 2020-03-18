import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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
  constructor(private Http: HttpClient) {}

  ngOnInit() {}
  onSubmit(form) {
    console.log(form);

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
    cep = cep.replace(/\D/g, "");
    console.log(form);
    if (cep != "") {
      var validaCEP = /^[0-9]{8}$/;
      if (validaCEP.test(cep)) {
        this.resetaDadosForm(form);
        this.Http.get(
          "https://viacep.com.br/ws/" + cep + "/json"
        ).subscribe(dados => this.populaDadosForm(dados, form));
      }
    }
    console.log(cep);
  }

  populaDadosForm(dados, form) {
    // form.setValue({
    //   nome: form.value.nome,
    //   email: form.value.email
    // });
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
