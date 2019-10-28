import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task.component';
import { FilteruserPipe } from '../pipes/filteruser.pipe';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { EventService } from '../services/event.service';
import { ProjectService } from '../services/project.service';
import { HttpClientModule } from '@angular/common/http';
import { Ng5SliderModule } from 'ng5-slider';
import { ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddTaskComponent,
        FilteruserPipe
      ],
      providers: [
        UserService,
        TaskService,
        EventService,
        ProjectService
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule,
        Ng5SliderModule,
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot(),
        ToastrModule.forRoot({
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true
        })
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AddTaskComponent);
      component = fixture.componentInstance;
    });
  }));

  it(`should create 'Add Task' Component`, () => {
    expect(component).toBeTruthy();
  });
  
  it(`should render a panel / section with heading 'Add Task'`, () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.panel-heading').textContent).toContain('Add Task');
  });
});