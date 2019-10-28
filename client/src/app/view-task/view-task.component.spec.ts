import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewTaskComponent } from './view-task.component';
import { EventService } from '../services/event.service';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';
import { FormsModule } from '@angular/forms';
import { FilteruserPipe } from '../pipes/filteruser.pipe';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewTaskComponent,
        FilteruserPipe],
      providers: [
        ProjectService,
        TaskService,
        EventService],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule,
        ModalModule.forRoot(),
        ToastrModule.forRoot({
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true
        })
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ViewTaskComponent);
      component = fixture.componentInstance;
    });
  }));

  it(`should create 'View Task' Component`, () => {
    expect(component).toBeTruthy();
  });

  it(`should render a panel / section with heading 'View Task'`, () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.panel-heading').textContent).toContain('View Task');
  });
});