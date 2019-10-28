import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { Ng5SliderModule } from 'ng5-slider';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { FilteruserPipe } from './pipes/filteruser.pipe';
import { ProjectComponent } from './project/project.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        Ng5SliderModule,
        BsDatepickerModule.forRoot(),
        ToastrModule.forRoot({
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true
        })
      ],
      declarations: [
        AppComponent,
        FilteruserPipe,
        UserComponent,
        ProjectComponent,
        AddTaskComponent,
        ViewTaskComponent
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.debugElement.componentInstance;
    });
  }));

  it('should create the Application', () => {
    expect(component).toBeTruthy();
  });

  it(`should render the Application Name as 'Project Manager' in the menu bar`, () => {
    fixture.detectChanges();
    const ele = fixture.debugElement.nativeElement;
    expect(ele.querySelector('.navbar-brand').textContent).toContain('Project Management');
  });
});