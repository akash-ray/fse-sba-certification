import { Component, OnInit, TemplateRef } from '@angular/core';
import { Task } from '../models/task';
import { EventService } from '../services/event.service';
import { ActivatedRoute } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { Project } from '../models/project';
import { User } from '../models/user';
import { TaskService } from '../services/task.service';
import { ParentTask } from '../models/parentTask';

import * as moment from 'moment';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  modalRef: BsModalRef;
  tasks: Array<Task>;
  taskToAdd: Task;
  hasParentTask: boolean;
  projects: Array<Project>;
  users: Array<User>;
  selectedIndex: number;
  selectedProjName: string;
  selectedIndexParent: number;
  selectedParentTask: string;
  selectedIndexUser: number;
  selectedUser: string;
  parentTasks: Array<ParentTask>;
  searchText: string;
  minStartDate: Date;
  minEndDate: Date;
  buttonName: string;
  updateDisabled: boolean;

  constructor(private eventService: EventService, private projectService: ProjectService,
    private userService: UserService, private taskService: TaskService, private modalService: BsModalService, private route: ActivatedRoute) {

    if (route.snapshot.params['task']) {
      this.taskToAdd = JSON.parse(route.snapshot.params['task']);
      this.buttonName = 'Update';
      this.updateDisabled = true;
      this.taskToAdd.start_Date = this.taskToAdd.start_Date ?
        moment(this.taskToAdd.start_Date).format('MM-DD-YYYY').toString() : moment(new Date()).format('MM-DD-YYYY').toString();
      this.taskToAdd.end_Date = this.taskToAdd.end_Date ? moment(this.taskToAdd.end_Date).format('MM-DD-YYYY').toString() :
        moment(new Date()).add(1, 'days').format('MM-DD-YYYY').toString();
      this.selectedParentTask = this.taskToAdd.parentTaskName;
      this.selectedUser = this.taskToAdd.user.firstName;
    }
    else {
      this.taskToAdd = new Task();
      this.buttonName = 'Add';

      this.taskToAdd.priority = 0;
      this.minStartDate = new Date();
      this.minEndDate = new Date();
      this.minEndDate.setDate(this.minStartDate.getDate() + 1);
      this.taskToAdd.start_Date = moment(new Date()).format('MM-DD-YYYY').toString();
      this.taskToAdd.end_Date = moment(new Date()).add(1, 'days').format('MM-DD-YYYY').toString();

      this.projects = new Array<Project>();
      this.users = new Array<User>();
      this.parentTasks = new Array<ParentTask>();
    }
    console.log(this.taskToAdd);
  }

  ngOnInit() {
  }

  setMinEndDate($event) {
    this.minEndDate = moment(this.taskToAdd.start_Date).add(1, 'days').toDate();
    if (moment(this.taskToAdd.end_Date) <= moment(this.taskToAdd.start_Date)) {
      this.taskToAdd.end_Date = moment(this.minEndDate).format('MM-DD-YYYY').toString();
    }
  }

  addTask() {
    if (!this.taskToAdd.project_ID && this.buttonName=='Add') {
      this.eventService.showWarning('Please select project ');
      return;
    }
    if (!this.taskToAdd.task_Name || this.taskToAdd.task_Name === '') {
      this.eventService.showWarning('Please add task name ');
      return;
    }
    if (!this.hasParentTask && (!this.taskToAdd.priority || this.taskToAdd.priority === 0)) {
      this.eventService.showWarning('Please set priority ');
      return;
    }
    if (!this.hasParentTask && (!this.taskToAdd.start_Date || this.taskToAdd.start_Date.toString() === '')) {
      this.eventService.showWarning('Please select start date ');
      return;
    }
    if (!this.hasParentTask && (!this.taskToAdd.end_Date || this.taskToAdd.end_Date.toString() === '')) {
      this.eventService.showWarning('Please select end date ');
      return;
    }
    if (!this.hasParentTask && (!this.taskToAdd.user.userId || this.taskToAdd.user.userId.toString() === '')) {
      this.eventService.showWarning('Please select userId ');
      return;
    }
    if (this.hasParentTask) {
      this.taskToAdd.priority = 0;
    }
    if(this.buttonName==='Add'){
    this.eventService.showLoading(true);
    this.taskService.addTask(this.taskToAdd).subscribe((data) => {
      this.eventService.showSuccess('Saved successfully');
      this.resetTask();
      this.eventService.showLoading(false);
    },
      (error) => {
        this.eventService.showError(error);
        this.eventService.showLoading(false);
      });
    }
     if(this.buttonName==='Update'){
      this.eventService.showLoading(true);
      this.taskService.updateTask(this.taskToAdd).subscribe((data) => {
        this.eventService.showSuccess('Saved successfully');
        this.resetTask();
        this.eventService.showLoading(false);
      },
        (error) => {
          this.eventService.showError(error);
          this.eventService.showLoading(false);
        });
    }
  }

  openModal(template: TemplateRef<any>, type: number) {
    this.searchText = undefined;
    if (type === 1) {
      this.eventService.showLoading(true);
      this.projectService.getProject().subscribe((project) => {
        this.projects = project;
        this.modalRef = this.modalService.show(template);
        document.getElementsByTagName("modal-container")[0].classList.remove("fade");
        this.eventService.showLoading(false);
      },
        (error) => {
          this.eventService.showError(error);
          this.eventService.showLoading(false);
        });
    }
    if (type === 2) {
      if (!this.hasParentTask) {
        this.eventService.showLoading(true);
        this.taskService.getParentTask().subscribe((parentTask) => {
          this.parentTasks = parentTask;
          this.modalRef = this.modalService.show(template);
          document.getElementsByTagName("modal-container")[0].classList.remove("fade");
          this.eventService.showLoading(false);
        },
          (error) => {
            this.eventService.showError(error);
            this.eventService.showLoading(false);
          });
      } else {
        this.eventService.showWarning('parent task only needs task name and project');
      }
    }
    if (type === 3) {
      if (!this.hasParentTask) {
        this.eventService.showLoading(true);
        this.userService.getUser().subscribe((user) => {
          this.users = user;
          this.modalRef = this.modalService.show(template);
          document.getElementsByTagName("modal-container")[0].classList.remove("fade");
          this.eventService.showLoading(false);
        },
          (error) => {
            this.eventService.showError(error);
            this.eventService.showLoading(false);
          });
      } else {
        this.eventService.showWarning('parent task only needs task name and project');
      }
    }
  }

  resetTask() {
    this.taskToAdd = new Task();
    this.taskToAdd.priority = 0;
    this.minStartDate = new Date();
    this.minEndDate = new Date();
    this.minEndDate.setDate(this.minStartDate.getDate() + 1);
    this.taskToAdd.start_Date = moment(new Date()).format('MM-DD-YYYY').toString();
    this.taskToAdd.end_Date = moment(new Date()).add(1, 'days').format('MM-DD-YYYY').toString();
    this.hasParentTask = undefined;
    this.selectedUser = null;
    this.selectedIndexUser = null;
    this.selectedIndexParent = null;
    this.selectedParentTask = null;
    this.selectedIndex = null;
    this.selectedProjName = null;

  }

  setIndex(index: number, type: number) {
    if (type === 1) {
      this.selectedIndex = index;
    }
    if (type === 2) {
      this.selectedIndexParent = index;
    }
    if (type === 3) {
      this.selectedIndexUser = index;
    }
  }

  selectProj() {
    this.taskToAdd.project_ID = +this.projects[this.selectedIndex].projectId;
    this.selectedProjName = this.projects[this.selectedIndex].projectName;
    this.selectedIndex = null;
    this.modalRef.hide();
  }

  selectParentTask() {
    this.taskToAdd.parent_ID = +this.parentTasks[this.selectedIndexParent].parentTaskId;
    this.selectedParentTask = this.parentTasks[this.selectedIndexParent].parentTaskName;
    this.selectedIndexParent = null;
    this.modalRef.hide();
  }
  selectUser() {
    this.taskToAdd.user.userId = +this.users[this.selectedIndexUser].userId;
    this.selectedUser = this.users[this.selectedIndexUser].firstName;
    this.selectedIndexUser = null;
    this.modalRef.hide();
  }
  hasParTaskChange($event) {
    if (this.hasParentTask) {
      this.selectedIndexParent = null;
      this.selectedIndexParent = null;
      this.selectedParentTask = null;
      this.selectedUser = null;
      this.taskToAdd.priority = 0;
      this.taskToAdd.parent_ID = null;
      this.taskToAdd.start_Date = null;
      this.taskToAdd.end_Date = null;
      this.taskToAdd.user.userId = null;
    } else {
      this.taskToAdd.start_Date = this.taskToAdd.start_Date ?
      moment(this.taskToAdd.start_Date).format('MM-DD-YYYY').toString() : moment(new Date()).format('MM-DD-YYYY').toString();
    this.taskToAdd.end_Date = this.taskToAdd.end_Date ? moment(this.taskToAdd.end_Date).format('MM-DD-YYYY').toString() :
      moment(new Date()).add(1, 'days').format('MM-DD-YYYY').toString();

    }
  }
}
