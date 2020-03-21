import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TemplateFormModule } from "./template-form/template-form.module";
import { TemplateFormComponent } from "./template-form/template-form.component";
import { FormDebugComponent } from "./shared/form-debug/form-debug.component";
import { CampoControlErroComponent } from "./shared/campo-control-erro/campo-control-erro.component";
import { HttpClientModule } from "@angular/common/http";
import { DataFormModule } from "./data-form/data-form.module";
import { SharedModule } from "./shared/shared.module";
import { DataFormMvcComponent } from "./data-form-mvc/data-form-mvc.component";
import { DropdownService } from "./shared/service/dropdown.service";

@NgModule({
  declarations: [AppComponent, DataFormMvcComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TemplateFormModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataFormModule
  ],
  providers: [DropdownService],
  bootstrap: [AppComponent]
})
export class AppModule {}
