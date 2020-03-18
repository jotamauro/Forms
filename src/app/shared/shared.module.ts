import { NgModule } from "@angular/core";
import { FormDebugComponent } from "./form-debug/form-debug.component";
import { CampoControlErroComponent } from "./campo-control-erro/campo-control-erro.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [FormDebugComponent, CampoControlErroComponent],
  imports: [CommonModule],
  exports: [FormDebugComponent, CampoControlErroComponent]
})
export class SharedModule {}
