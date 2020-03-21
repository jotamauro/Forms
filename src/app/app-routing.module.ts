import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TemplateFormComponent } from "./template-form/template-form.component";
import { DataFormComponent } from "./data-form/data-form.component";
import { DataFormMvcComponent } from "./data-form-mvc/data-form-mvc.component";

const routes: Routes = [
  { path: "templateForm", component: TemplateFormComponent },
  { path: "dataForm", component: DataFormComponent },
  { path: "mvcToHtml", component: DataFormMvcComponent },
  { path: "", pathMatch: "full", redirectTo: "mvcToHtml" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
