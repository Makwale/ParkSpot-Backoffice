import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ToastrModule } from "ngx-toastr";
import { TagInputModule } from "ngx-chips";
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from "./app.component";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { PresentationComponent } from "./pages/presentation/presentation.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { GraphQLModule } from "./graphql.module";
import { Apollo } from "apollo-angular";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { PresentationModule } from "./pages/presentation/presentation.module";
import { ComponentsModule } from "./components/components.module";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { SpinnerModule } from "./components/spinner/spinner.module";


@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    AdminLayoutComponent,
  
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ComponentsModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    TagInputModule,
    PresentationModule,
    BrowserModule,
    AppRoutingModule,
    AmplifyAngularModule,
    GraphQLModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AmplifyService, Apollo],
  bootstrap: [AppComponent]
})
export class AppModule { }
