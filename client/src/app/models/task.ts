import { User } from "./user";

export class Task {
    public start_Date: string;
    public end_Date: string;
    public task_Name: string;
    public project_ID: number;
    public taskId: number;
    public priority: number;
    public parent_ID: number;
    public status: number;
    public user: User;
    public parentTaskName: string;

    constructor() {
        this.user = new User();
    }
}
