import { Status } from "./Status";
import { Task } from "./Task";
import { User } from "./User";

export class Timesheet{
    //fields name will effect created json so need same as in spring boot entities
     id!:number;
     projectname!:String;
     task!:String;
     datefrom!:Date;
     dateto!:Date;
     assignto!:User;
     status!:Status;

    constructor(){}
}