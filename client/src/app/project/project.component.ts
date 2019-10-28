import { Component, OnInit, TemplateRef } from '@angular/core';
import { Project } from '../models/project';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { User } from '../models/user';
import { EventService } from '../services/event.service';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectToAdd: Project;
  buttonName: string;
  startEndDateEnable: boolean;
  minStartDate: Date;
  minEndDate: Date;
  modalRef: BsModalRef;
  selectedIndexUser: number;
  selectedUser: string;
  users: Array<User>;
  searchText: string;
  searchTextUser: string;
  projects: Array<Project>;
  isStartDateAsc: boolean;
  isEndDateAsc: boolean;
  isPriorityAsc: boolean;
  isCompletedAsc: boolean;

  constructor(private eventService: EventService, private projectService: ProjectService,
    private userService: UserService, private modalService: BsModalService) {
    this.users = new Array<User>();
    this.projects = new Array<Project>();
  }

  ngOnInit() {
    this.projectToAdd = new Project();
    this.buttonName = 'Add';
    this.projectToAdd.priority = 0;
    this.minStartDate = new Date();
    this.minEndDate = new Date();
    this.minEndDate.setDate(this.minStartDate.getDate() + 1);
    this.eventService.showLoading(true);
    this.userService.getUser().subscribe((user) => {
      this.users = user;

      this.eventService.showLoading(false);
    },
      (error) => {
        this.eventService.showError(error);
        this.eventService.showLoading(false);
      });
    this.eventService.showLoading(true);
    this.projectService.getProject().subscribe((project) => {
      this.projects = project;
      this.eventService.showLoading(false);
    },
      (error) => {
        this.eventService.showError(error);
        this.eventService.showLoading(false);
      });
  }
  setStartEndDateChange($event) {
    if (this.startEndDateEnable) {
      this.projectToAdd.projectStartDate = this.projectToAdd.projectStartDate ?
        this.projectToAdd.projectStartDate : moment(new Date()).format('MM-DD-YYYY').toString();
      this.projectToAdd.projectEndDate = this.projectToAdd.projectEndDate ? this.projectToAdd.projectEndDate :
        moment(new Date()).add(1, 'days').format('MM-DD-YYYY').toString();
    } else {
      this.projectToAdd.projectStartDate = null;
      this.projectToAdd.projectEndDate = null;
    }
  }
  setMinEndDate($event) {
    this.minEndDate = moment(this.projectToAdd.projectStartDate).add(1, 'days').toDate();
    if (moment(this.projectToAdd.projectEndDate) <= moment(this.projectToAdd.projectStartDate)) {
      this.projectToAdd.projectEndDate = moment(this.minEndDate).format('MM-DD-YYYY').toString();
    }
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    document.getElementsByTagName("modal-container")[0].classList.remove("fade");

  }
  setIndex(index: number) {
    this.selectedIndexUser = index;
  }
  selectUser() {
    this.projectToAdd.user.userId = +this.users[this.selectedIndexUser].userId;
    this.selectedUser = this.users[this.selectedIndexUser].firstName;
    this.selectedIndexUser = null;
    this.modalRef.hide();
  }

  addProject() {
    if (!this.projectToAdd.projectName || this.projectToAdd.projectName === '') {
      this.eventService.showWarning('Please add project name ');
      return;
    }
    if (!this.projectToAdd.priority) {
      this.eventService.showWarning('Please set priority ');
      return;
    }
    if (this.startEndDateEnable && (!this.projectToAdd.projectStartDate || this.projectToAdd.projectStartDate.toString() === '')) {
      this.eventService.showWarning('Please select start date ');
      return;
    }
    if (this.startEndDateEnable && (!this.projectToAdd.projectEndDate || this.projectToAdd.projectEndDate.toString() === '')) {
      this.eventService.showWarning('Please select end date ');
      return;
    }
    if (!this.projectToAdd.user.userId || this.projectToAdd.user.userId.toString() === '') {
      this.eventService.showWarning('Please select userId ');
      return;
    }
    if (!this.startEndDateEnable) {
      this.projectToAdd.projectStartDate = null;
      this.projectToAdd.projectEndDate = null;
    }
    if (this.buttonName === 'Add') {
      this.eventService.showLoading(true);
      this.projectService.addProject(this.projectToAdd).subscribe((data) => {
        this.eventService.showSuccess('Saved successfully');
        this.resetProject();
        this.ngOnInit();
        this.eventService.showLoading(false);
      },
        (error) => {
          this.eventService.showError(error);
          this.eventService.showLoading(false);
        });
    }
    if (this.buttonName === 'Update') {
      this.eventService.showLoading(true);
      this.projectService.updateProject(this.projectToAdd).subscribe((data) => {
        this.eventService.showSuccess('Update successfully')
        this.ngOnInit();
        this.eventService.showLoading(false);
      },
        (error) => {
          this.eventService.showError(error);
          this.eventService.showLoading(false);
        });
    }

  }
  resetProject() {
    this.projectToAdd = new Project();
    this.startEndDateEnable = false;
    this.buttonName = 'Add';
    this.projectToAdd.priority = 0;
    this.minStartDate = new Date();
    this.minEndDate = new Date();
    this.minEndDate.setDate(this.minStartDate.getDate() + 1);
    this.selectedUser = null;
    this.selectedIndexUser = null;
  }

  editProject(project) {
    this.buttonName = 'Update';
    this.selectedUser = this.users.find(x => x.userId === project.user.userId).firstName;
    this.projectToAdd = project;
    if (project.projectStartDate && project.projectEndDate) {
      this.projectToAdd.projectStartDate = moment(this.projectToAdd.projectStartDate).format('MM-DD-YYYY').toString();
      this.projectToAdd.projectEndDate = moment(this.projectToAdd.projectEndDate).format('MM-DD-YYYY').toString();
      this.startEndDateEnable = true;
    } else {
      this.startEndDateEnable = false;
    }
  }

  deleteProject(project) {
    this.eventService.showLoading(true);
    this.projectService.deleteProject(project).subscribe((data) => {
      this.eventService.showSuccess('Project suspended successfully')
      this.ngOnInit();
      this.eventService.showLoading(false);
    },
      (error) => {
        this.eventService.showError(error);
        this.eventService.showLoading(false);
      });
  }

  sortProject(type: number) {
    if (type === 1) {
      this.isStartDateAsc = !this.isStartDateAsc;
      const direction = this.isStartDateAsc ? 1 : -1;
      this.projects.sort((a, b) => (a.projectStartDate > b.projectStartDate) ? 1 * direction
        : ((b.projectStartDate > a.projectStartDate) ? -1 * direction : 0));
    }
    if (type === 2) {
      this.isEndDateAsc = !this.isEndDateAsc;
      const direction = this.isEndDateAsc ? 1 : -1;
      this.projects.sort((a, b) => (a.projectEndDate > b.projectEndDate) ? 1 * direction :
        ((b.projectEndDate > a.projectEndDate) ? -1 * direction : 0));
    }
    if (type === 3) {
      this.isPriorityAsc = !this.isPriorityAsc;
      const direction = this.isPriorityAsc ? 1 : -1;
      this.projects.sort((a, b) => (a.priority > b.priority) ? 1 * direction :
        ((b.priority > a.priority) ? -1 * direction : 0));
    }
    if (type === 4) {
      this.isCompletedAsc = !this.isCompletedAsc;
      const direction = this.isCompletedAsc ? 1 : -1;
      this.projects.sort((a, b) => (a.noOfCompletedTasks > b.noOfCompletedTasks) ? 1 * direction :
        ((b.noOfCompletedTasks > a.noOfCompletedTasks) ? -1 * direction : 0));
    }
    this.projects = [...this.projects];
  }
}
