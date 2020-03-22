import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { DropdownService } from "../shared/service/dropdown.service";
import { Estados } from "../shared/service/models/estados-br";
import { ConsultaCepService } from "../shared/service/consulta-cep.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-data-form",
  templateUrl: "./data-form.component.html",
  styleUrls: ["./data-form.component.css"]
})
export class DataFormComponent implements OnInit {
  private formulario: FormGroup;
  //private estados: Estados[];
  private estados: Observable<Estados[]>;
  cargos: any[];
  tecnologias: any[];
  newsletters: any[];
  constructor(
    private formBuilder: FormBuilder,
    private Http: HttpClient,
    private dropDownService: DropdownService,
    private retornaCep: ConsultaCepService
  ) {}

  ngOnInit() {
    // this.dropDownService.getEstadosBR().subscribe((estados: Estados[]) => {
    //   this.estados = estados;
    // });
    this.cargos = this.dropDownService.getCargos();
    this.tecnologias = this.dropDownService.getTecnologias();
    this.estados = this.dropDownService.getEstadosBR();
    this.newsletters = this.dropDownService.getNewsletter();

    this.formulario = this.formBuilder.group({
      nome: [
        null,
        [Validators.required, Validators.min(3), Validators.max(50)]
      ],
      email: [null, [Validators.email, Validators.required]],
      cargo: [null],
      tecnologia: [null],
      newsletter: ["s"],
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
      this.verificaValidacoesFormularios(this.formulario);
    }
  }
  verificaValidacoesFormularios(formGroup: FormGroup) {
    //Retorna um array
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      //Marca o campo como tocado.
      controle.markAsTouched();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesFormularios(controle);
      }
    });
  }
  resetar() {
    this.formulario.reset();
  }
  consultaCEP() {
    let cep = this.formulario.get("endereco.cep").value;

    if (cep !== null && cep !== "") {
      this.retornaCep
        .getCEP(cep)
        .subscribe(dados => this.populaDadosForm(dados));
    }
  }
  resetaDadosForm() {
    this.formulario.patchValue({
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
  populaDadosForm(dados) {
    this.formulario.patchValue({
      endereco: {
        cep: dados.cep,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
        complemento: dados.complemento
      }
    });
    this.formulario.get("nome").setValue("Nome");
  }
  setarCargo() {
    const cargo = { nome: "Dev", nivel: "Júnior", desc: "Dev Jr" };
    this.formulario.get("cargo").setValue(cargo);
  }
  setarTecnologias() {
    this.formulario.get("tecnologia").setValue(["java", "php"]);
  }
  compararCargos(obj1, obj2) {
    return obj1 && obj2 ? obj1.nome === obj2.nome : obj1 === obj2;
  }
}
