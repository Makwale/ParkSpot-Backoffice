import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "../../components/components.module";

import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";


import { RouterModule } from "@angular/router";
import { DashboardsRoutes } from "./dashboards.routing";
import { LoginComponent } from "../examples/login/login.component";
import { RegisterComponent } from "../examples/register/register.component";
import { ExamplesModule } from "../examples/examples.module";
import { ExamplesRoutes } from "../examples/examples.routing";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forChild(DashboardsRoutes),
    ExamplesModule
  ],
  exports: [ExamplesModule]
})
export class DashboardsModule {}
