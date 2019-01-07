import { NotificationService } from './../notification.service';
import { EmployeeService } from './../employee.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DialogContentComponent } from './../dialog-content/dialog-content.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
@Component({
  selector: 'app-employee-body',
  templateUrl: './employee-body.component.html',
  styleUrls: ['./employee-body.component.css']
})
export class EmployeeBodyComponent implements OnInit {
  EmployeeDetails: string[];
  rows;
  constructor(public dialog: MatDialog, private http: HttpClient, private service: EmployeeService, private notificationService: NotificationService) { }

  //filtered data displaying conditions
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Id','FirstName', 'LastName','Email', 'Phone', 'City', 'Dept', 'Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

 
  //to load the records when page is loaded
  ngOnInit() {
    
    this.getData();
  }

  getData() {
    this.http.get('http://localhost:3000/emp/getAllEmployees')
    .subscribe((response) => {
      this.EmployeeDetails = response as string[];
      this.rows = response;
      //console.log(JSON.stringify(this.rows));

      this.listData = new MatTableDataSource(this.rows.employees);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  //this method is for displaying the dialog box for registring the new Employee
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      height: '500px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getData()
    });
  }
  
  //method to search records
  updateFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  //method for on edit button click 
  onEdit(row) {
    this.service.populateForm(row);
    const dialogRef = this.dialog.open(DialogContentComponent, {
      height: '500px',
      width: '800px',
      data:row
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //Method to call when delete button clicked
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      //this.service.deleteEmployee(Id);
      this.http.delete('http://localhost:3000/emp/deleteEmp/' + Id )
      .subscribe(data => { }),
      this.ngOnInit();
    };
    }

}
