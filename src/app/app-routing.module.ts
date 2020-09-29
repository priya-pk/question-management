import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    data: {
      title:"Home",
    },
    children:[
      {
        path:"question-management",
        loadChildren: () =>
          import("./question-management/question-management.module").then((m)=>m.QuestionManagementModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
