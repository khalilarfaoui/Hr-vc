
import {
  Component,
  OnInit,
  HostListener,
  NgZone,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/core/core.index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent {

  @ViewChild('closeAdd') closeAdd!: ElementRef;
  @ViewChild('closeEdit') closeEdit!: ElementRef;
  @ViewChild('closeModelDelete') closeModelDelete!: ElementRef;
  public lstUsers: any = [];
  public searchDataValue = '';
  public addUsersForm: FormGroup | any;
  public editUsersForm: FormGroup | any;
  dataSource!: MatTableDataSource<any>;

  // pagination variables
  public lastIndex: number = 0;
  public pageSize: number = 10;
  public totalData: any = 0;
  public skip: number = 0;
  public limit: number = this.pageSize;
  public pageIndex: number = 0;
  public serialNumberArray: Array<any> = [];
  public currentPage: number = 1;
  public pageNumberArray: Array<any> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages: number = 0;
  //** / pagination variables

  constructor(
    private ngZone: NgZone,
    private data: DataService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + 'px';
      });
    };
    this.getScreenHeight();
  }

  ngOnInit(): void {
    this.getTableData();

    this.addUsersForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      role: ['RESPONSABLE', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]*$')]],  // Add a pattern for phone numbers if needed
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.editUsersForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.addUsersForm.value)
    this.userService
      .addUser(this.addUsersForm.value)
      .subscribe((res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: this.userService.message.create,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.getTableData();
          this.closeAdd.nativeElement.click()
          this.addUsersForm.reset()
        });
      },(err) => {
        console.log(err)
        if (err.error) {
          Swal.fire({
            title: 'Error !',
            text: `${err.error}`,
            icon: 'error',
            timer: 4000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: 'Error !',
            text: `Something went wrong`,
            icon: 'error',
            timer: 4000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      });
  }

  onSubmitEdit() {
    this.userService
      .updateUser( this.editUsersForm.value)
      .subscribe((res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: this.userService.message.update,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.getTableData();
          this.closeEdit.nativeElement.click()
          this.editUsersForm.reset()
        });
      });
  }

  loadDataToEdit(data: any) {
    this.editUsersForm.patchValue({
      id: data.id,
      name: data.name,
    });
  }

  idToDelete :any

  loadDataDelete(id:any){
    this.idToDelete = id
  }
  delete(){
    this.userService.deleteUser(this.idToDelete).subscribe(res=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: this.userService.message.delete,
        showConfirmButton: false,
        timer: 1500,
      }).then(()=>{
        this.getTableData()
        this.closeModelDelete.nativeElement.click()
      })
    })
  }

  private getTableData(): void {
    this.lstUsers = [];
    this.serialNumberArray = [];

    this.userService.getAll().subscribe((res: any) => {
      console.log(res);

      this.totalData = res.length;
      res.map((res: any, index: number) => {
        let serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          this.lstUsers.push(res);
          this.serialNumberArray.push(res.id);
        }
      });
      this.dataSource = new MatTableDataSource<any>(this.lstUsers);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }

  public sortData(sort: Sort) {
    const data = this.lstUsers.slice();

    if (!sort.active || sort.direction === '') {
      this.lstUsers = data;
    } else {
      this.lstUsers = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.lstUsers = this.dataSource.filteredData;
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableData();
  }

  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    for (var i = 1; i <= this.totalPages; i++) {
      let limit = pageSize * i;
      let skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }

  public innerHeight: any;
  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }
  onResize(event: any) {
    this.innerHeight = event.target.innerHeight + 'px';
  }
}
export interface pageSelection {
  skip: number;
  limit: number;
}

