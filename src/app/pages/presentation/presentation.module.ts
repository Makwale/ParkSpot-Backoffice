import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { RouterModule } from "@angular/router";
import { PresentationComponent } from "./presentation.component";
import { SpinnerComponent } from "src/app/components/spinner/spinner.component";


@NgModule({
  declarations: [
    PresentationComponent,
  ],
  imports: [CommonModule, RouterModule, TooltipModule.forRoot(), BsDropdownModule.forRoot(), CollapseModule.forRoot()],
  providers: [BsModalService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PresentationModule {}
