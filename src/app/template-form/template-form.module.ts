import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "../shared/shared.module";
import { TemplateFormComponent } from "./template-form.component";

@NgModule({
  declarations: [TemplateFormComponent],
  imports: [CommonModule, FormsModule, SharedModule],
  providers: [HttpClientModule]
})
export class TemplateFormModule {}
