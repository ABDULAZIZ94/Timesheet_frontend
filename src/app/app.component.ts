import { Dialog } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterOutlet } from '@angular/router';
import { DatabaseService } from './database.service';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { Timesheet } from './model/Timesheet';
import { TimesheetentryComponent } from './timesheetentry/timesheetentry.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      CommonModule,
      RouterOutlet,
      MaterialModule,
      FormsModule //template driven form
    ]
})
export class AppComponent implements OnInit{
  dialogResult !: Timesheet[];
  title = 'ui';
  search_task_name !: String;

  displayedColumns: string[] = [ 'projectname', 'task', 'datefrom', 'dateto', 'status', 'assignto', 'actions'];
  dataSource!: MatTableDataSource<Timesheet>;

  constructor(private databaseService: DatabaseService, public dialog: Dialog,
     private router : Router) {}
  ngOnInit() {
    this.databaseService.getAllTimesheets().subscribe((data: Timesheet[]) => {
      this.dataSource = new MatTableDataSource<Timesheet>(data);
    });
  }
  searchbutton(stn:String){
    this.databaseService.getTimesheetsBytaskname(stn).subscribe((data: Timesheet[]) => {
      this.dataSource = new MatTableDataSource<Timesheet>(data);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open<Timesheet>(TimesheetentryComponent, {
      autoFocus: false,
      maxHeight: '90vh', //you can adjust the value as per your view
      data: {},
    });

    dialogRef.closed.subscribe((result: Timesheet | undefined) => {
      console.log('The dialog was closed');
      window.location.reload()
      if (result) {
        //second choice to push to database
        // this.databaseService.createTimesheet(result);
      } else {
        //do nothing
       
      }

    });
  }

  openEditDialog(id: number): void {
    //passing timesheet_id throught dialog reference
    const dialogRef = this.dialog.open<Timesheet>(TimesheetentryComponent, {
      width: '800px',
      height: '600px',
      data: {
        "id":id
      },
    });

    dialogRef.closed.subscribe((result: Timesheet | undefined) => {
      console.log('The dialog was closed');
      window.location.reload()
      if (result) {
        //second choice to push to database
        // this.databaseService.createTimesheet(result);
      } else {
        //do nothing
       
      }

    });
  }

  closeDialog():void{
    this.dialog.closeAll();
  }
  
  editItem(itemId: number) {
    // Handle edit logic here based on the itemId
    console.log('Edit item with ID:', itemId);
    this.openEditDialog(itemId);
  }

  deleteItem(itemId: number) {
    // Handle edit logic here based on the itemId
    console.log('Delete item with ID:', itemId);
    this.databaseService.deleteTimesheetByid(itemId).subscribe();
    window.location.reload();
  }

}
