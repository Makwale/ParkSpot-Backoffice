import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { ProfileComponent } from "./profile/profile.component";
// import { TimelineComponent } from "./timeline/timeline.component";

import { RouterModule } from "@angular/router";
import { ExamplesRoutes } from "./examples.routing";
import { ClientpropertiesComponent } from './clientproperties/clientproperties.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsModalService } from "ngx-bootstrap/modal";
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { SpinnerModule } from "src/app/components/spinner/spinner.module";

@NgModule({
  declarations: [
    ProfileComponent,
    ClientpropertiesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ExamplesRoutes),
    ProgressbarModule.forRoot(),
    CollapseModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [BsModalService]
})
export class ExamplesModule {}
