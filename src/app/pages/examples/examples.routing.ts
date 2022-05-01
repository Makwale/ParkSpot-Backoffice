import { Routes } from "@angular/router";

import { ProfileComponent } from "../../layouts/auth-layout/profile/profile.component";
// import { TimelineComponent } from "./timeline/timeline.component";

export const ExamplesRoutes: Routes = [

  {
    path: "",
    children: [
      {
        path: "",
        redirectTo: "profile"
      },
      {
        path: "profile",
        component: ProfileComponent
      },
    ]
  }
];
