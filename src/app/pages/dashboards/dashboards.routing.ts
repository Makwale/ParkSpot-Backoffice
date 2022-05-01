import { Routes } from "@angular/router";
import { LoginComponent } from "../examples/login/login.component";
import { RegisterComponent } from "../examples/register/register.component";


export const DashboardsRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "examples",
        loadChildren: () => import('../examples/examples.module').then(m => m.ExamplesModule)
      }
    ]
  },
];
