import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/core.index';

@Component({
  selector: 'app-employee-page-content',
  templateUrl: './employee-page-content.component.html',
  styleUrls: ['./employee-page-content.component.scss']
})
export class EmployeePageContentComponent implements OnInit {
  selected = 'option2';
  public lstEmployee: any[] | any;
  constructor(public router: Router, private dataservice: DataService) {
   this.lstEmployee = this.dataservice.lstEmployee

  }

  ngOnInit(): void {
  }

}
