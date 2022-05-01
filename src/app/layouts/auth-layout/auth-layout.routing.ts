import { Routes } from "@angular/router";
import { PropertiesComponent } from "src/app/pages/examples/properties/properties.component";

import { LoginComponent } from "../../pages/examples/login/login.component";

import { RegisterComponent } from "../../pages/examples/register/register.component";
import { PresentationComponent } from "../../pages/presentation/presentation.component";

export const AuthLayoutRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: "login",
        component: LoginComponent
      }
    ]
  },

  {
    path: "",
    children: [
      {
        path: "register",
        component: RegisterComponent
      }
    ]
  },
  {
    path: "",
    children: [
      {
        path: "csproperties",
        component: PropertiesComponent
      }
    ]
  },

];
