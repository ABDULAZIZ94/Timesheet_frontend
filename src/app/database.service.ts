import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './model/User';
import { Timesheet } from './model/Timesheet';
import { Task } from './model/Task';
import { Status } from './model/Status';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  crud_timesheet:string = "http://localhost:8080/timesheet";
  get_users:string = "http://localhost:8080/users";
  get_statuses:string = "http://localhost:8080/statuses";

  constructor(private http: HttpClient) {
    // This service can now make HTTP requests via `this.http`.
  }
  createTimesheet(bts:Timesheet):Observable<Timesheet>{
    const jsonObject = {
      "id": 0,
      "projectname": "Sample Project",
      "task": "simple task",
      "datefrom": "2024-03-05T00:40:28.275Z",
      "dateto": "2024-03-05T00:40:28.275Z",
      "status": {
          "id": "2"
      },
      "assignto": {
          "id": "2"
      }
    };  
    const jsonString = JSON.stringify(jsonObject);
    const ts: Timesheet = JSON.parse(jsonString);
    console.log("in service:");
    console.log(bts);
    return this.http.post<Timesheet>(this.crud_timesheet,bts,this.httpOptions);
  }
  getAllTimesheets(): Observable<Timesheet[]> {
    return this.http.get<Timesheet[]>(this.crud_timesheet);
  }
  //get timesheets by taskname
  getTimesheetsBytaskname(taskname:String): Observable<Timesheet[]> {
    return this.http.get<Timesheet[]>(this.crud_timesheet+`/taskname/${taskname}`);
  }
  //get timesheets by taskname
  getTimesheetsById(id:Number): Observable<Timesheet> {
    return this.http.get<Timesheet>(this.crud_timesheet+`/id/${id}`);
  }
  deleteTimesheetByid(id:number):Observable<Timesheet> {
    return this.http.delete<Timesheet>(this.crud_timesheet+`/${id}`);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.get_users);
  }
  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.get_statuses);
  }

}
