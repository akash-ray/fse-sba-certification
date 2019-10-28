import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectComponent } from './project.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FilteruserPipe } from '../pipes/filteruser.pipe';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { EventService } from '../services/event.service';
import { ProjectService } from '../services/project.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng5SliderModule } from 'ng5-slider';
import { ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';


describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProjectComponent,
        FilteruserPipe],
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
      fixture = TestBed.createComponent(ProjectComponent);
      component = fixture.componentInstance;
    });
  }));

  it(`should create 'Project' Component`, () => {
    expect(component).toBeTruthy();
  });

  it(`should render a panel / section with heading 'Add Project'`, () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.panel-heading')[0].textContent).toContain('Add Project');
  });

  it(`should render a panel / section with heading 'View Project'`, () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.panel-heading')[1].textContent).toContain('View Project');
  });
});