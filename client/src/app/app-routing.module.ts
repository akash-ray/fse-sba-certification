import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'addTask', component: AddTaskComponent },
  { path: 'viewTask', component: ViewTaskComponent },
  { path: 'user', component: UserComponent},
  { path: 'project', component: ProjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
