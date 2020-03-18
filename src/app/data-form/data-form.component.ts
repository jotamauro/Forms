import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-data-form",
  templateUrl: "./data-form.component.html",
  styleUrls: ["./data-form.component.css"]
})
export class DataFormComponent implements OnInit {
  formulario: FormGroup;
  constructor(private formBuilder: FormBuilder, private Http: HttpClient) {}

  ngOnInit() {
    // this.formulario = new FormGroup({
    //   nome: new FormControl("José Mauro"),
    //   email: new FormControl("josemaurodl@gmail.com")
    // });

    this.formulario = this.formBuilder.group({
      nome: [
        null,
        [Validators.required, Validators.min(3), Validators.max(50)]
      ],
      email: [null, [Validators.email, Validators.required]],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required]],
        numero: [null, [Validators.required]],
        complemento: [null],
        rua: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]]
      })
    });
  }

  aplicaCssErro(campo: string) {
    return {
      "has-error": this.verificaValidTouched(campo),
      "class.has-feedback": this.verificaValidTouched(campo)
    };
  }
  verificaValidTouched(campo: string) {
    return (
      this.formulario.get(campo).invalid && this.formulario.get(campo).touched
    );
  }
  verificaValidEmail() {
    let campoEmail = this.formulario.get("email").errors;
    if (campoEmail) {
      return campoEmail["email"];
    }
  }

  onSubmit() {
    console.log(this.formulario.value);

    if (this.formulario.valid) {
      this.Http.post(
        "https://httpbin.org/post",
        JSON.stringify(this.formulario.value)
      ).subscribe(
        dados => {
          console.log(dados);
          //Reseta o Form
          this.resetar();
        },
        //Dispara essa função se a requisição retornar erro.
        (erro: any) => alert("erro")
      );
    } else {
      console.log("Error");
    }
  }
  resetar() {
    this.formulario.reset();
  }
}
