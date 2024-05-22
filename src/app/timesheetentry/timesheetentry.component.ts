import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { DatabaseService } from '../database.service';
import { MaterialModule } from '../material/material.module';
import { Status } from '../model/Status';
import { Timesheet } from '../model/Timesheet';
import { User } from '../model/User';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-timesheetentry',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, MatExpansionModule],
  templateUrl: './timesheetentry.component.html',
  styleUrl: './timesheetentry.component.css',
  providers: [DatePipe, provideMomentDateAdapter(MY_FORMATS),],
})
export class TimesheetentryComponent implements OnInit{
  [x: string]: any;

  selectedDate: Date = new Date();
  minDate: Date = new Date(2000, 1, 1); // January 1, 2023
  maxDate: Date = new Date(2030, 11, 31); // December 31, 2023
  ts: Timesheet = {
    id:  0,
    projectname: 'Project',
    task: new String("Task"),
    datefrom: new Date(), // Set to current date
    dateto: new Date(), // Set to current date
    status: new Status(),
    assignto: new User()
  };
  keyValueUser:User[] = [];
  keyValueStatuses:Status[] = [];

  constructor(
    public dialogRef: DialogRef<Timesheet>,
    @Inject(DIALOG_DATA) public data: any,
    private databaseService: DatabaseService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    //queery task and query timesheet
    //put on variable that acessable by angular ui 
    let result_tsk$!: Observable<Timesheet>;
    console.log(this.data.id);
    // if got id means it from edit button
    //get a row with corespoding id 
    if(this.data.id != undefined){
      this.databaseService.getTimesheetsById(this.data.id).subscribe(
        (rts:Timesheet) =>{
          this.ts = rts;
        },
        error => {
          console.error('Error fetching timesheetbyid:', error);
        }
      );
    }
    
    //get lists of users
    this.databaseService.getUsers().subscribe(
      (users: User[]) => {
        this.keyValueUser = users;
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
    //get list of statuses
    this.databaseService.getStatuses().subscribe(
      (statuses: Status[]) => {
        this.keyValueStatuses = statuses;
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }
  openSnackBar(message: string, action: string): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, {
      duration: 1000, // Duration in milliseconds
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }

  saveDataToDb(){
    console.info("timesheetentry:");
    console.log(this.ts);
    let result_tsk$!: Observable<Timesheet>;
    // Save task at the database first, then get its ID to put in the timesheet table
    result_tsk$ =  this.databaseService.createTimesheet(this.ts); 
    result_tsk$.subscribe(
      (result: Timesheet) => {
        console.log('Emitted value:', result); // Log the emitted value
        this.openSnackBar("Succes","the data saved to database").afterDismissed().subscribe(() => {
          console.log('Snackbar dismissed'); // Call your function here
          this.closeDialog();
        });;
      },
      (error: any) => {
        console.error('Error:', error); // Log any errors if they occur
        this.openSnackBar("Error","some error");
      }
    );
  }
}
