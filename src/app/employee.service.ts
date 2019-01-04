import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { DatePipe } from '../../node_modules/@angular/common';
import * as _ from 'lodash';
import { fillProperties } from '../../node_modules/@angular/core/src/util/property';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient,private datePipe: DatePipe) { }
  employeeList: String[];
  rows;

  form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl('')
  });

  //initializeFormGroup() {
  //   this.form.setValue({
  //     $empid: null,
  //     fullName: '',
  //     email: '',
  //     mobile: '',
  //     city: '',
  //     gender: '1',
  //     department: 0,
  //     hireDate: ''
  //   });
  // }

  getEmployees() {
    this.http.get('http://172.17.20.19:3000/getProducts')
    .subscribe((response) => {
      this.employeeList = response as string[];
      this.rows = response;
      console.log(this.rows);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
        } else {
          console.log('Server-side error occured.');
        }
      });
    
      //need to write return  ?
  }

  insertEmployee(employee) {

    this.http.post('http://172.17.20.19:3000/postProduct', {
      fname: employee.value.userData.fname,
      lname: employee.value.userData.lname,
      email: employee.value.userData.email,
      mobile: employee.value.userData.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
       //hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
    });
      
  }
  // need to put the url for update  PUT method / EDIT button
  updateEmployee(employee) {
    this.http.put(employee.$key,
      {
        fullName: employee.fullName,
        email: employee.email,
        mobile: employee.mobile,
        city: employee.city,
        gender: employee.gender,
        department: employee.department,
        // hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
        
      });
  }


  deleteEmployee($empid: string) {
    this.http.delete('http://172.17.20.19:3000/delete/' + $empid )
    .subscribe(data => { });
  }

  populateForm(employee) {
    // this.form.setValue(_.omit(employee,'departmentName'));
    this.form.setValue(employee);
  }

}
