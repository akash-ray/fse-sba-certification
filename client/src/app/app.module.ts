import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
import { BsDatepickerModule, ModalModule } from 'ngx-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { UserComponent } from './user/user.component';
import { ToastrModule } from 'ngx-toastr';
import { EventService } from './services/event.service';
import { BaseService } from './services/base.service';
import { FilteruserPipe } from './pipes/filteruser.pipe';
import { ProjectComponent } from './project/project.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { ProjectService } from './services/project.service';
import { TaskService } from './services/task.service';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'user', component: UserComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'addTask', component: AddTaskComponent },
  { path: 'viewTask', component: ViewTaskComponent },
  { path: '**', redirectTo: 'user' }
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    FilteruserPipe,
    ProjectComponent,
    AddTaskComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true }),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    Ng5SliderModule
  ],
  providers: [BaseService,UserService, EventService, ProjectService,TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
