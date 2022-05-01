import { Routes } from "@angular/router";
import { ClientpropertiesComponent } from "./clientproperties/clientproperties.component";

import { ProfileComponent } from "./profile/profile.component";
// import { TimelineComponent } from "./timeline/timeline.component";

export const ExamplesRoutes: Routes = [
  
  {
    path: "",
    children: [
      {path: "",
       redirectTo: "profile"
      },
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "properties",
        component: ClientpropertiesComponent
      }
    ]
  }
];
