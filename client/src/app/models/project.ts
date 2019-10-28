import { User } from "./user";

export class Project {
    public projectId: string;
    public projectName: string;
    public projectStartDate: string;
    public projectEndDate: string;
    public priority: number;
    public user: User;
    public noOfTasks:number;
    public noOfCompletedTasks:number;
    constructor(){
        this.user=new User();
    }
}
