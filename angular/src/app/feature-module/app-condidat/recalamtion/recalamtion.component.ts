import { ReclamationService } from './../../../core/services/reclamation.service';
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
@Component({
  selector: 'app-recalamtion',
  templateUrl: './recalamtion.component.html',
  styleUrls: ['./recalamtion.component.css']
})
export class RecalamtionComponent implements OnInit {

  @ViewChild('closeAdd') closeAdd!: ElementRef;
   @ViewChild('closeEdit') closeEdit!: ElementRef;
   @ViewChild('closeModelDelete') closeModelDelete!: ElementRef;
   public lstreclamations: any = [];
   public searchDataValue = '';
   public addreclamationsForm: FormGroup | any;
   public editreclamationsForm: FormGroup | any;
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
     private reclamationsService: ReclamationService
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

     this.addreclamationsForm = this.formBuilder.group({
       name: ['', [Validators.required]],
       message: ['', [Validators.required]],
     });

     this.editreclamationsForm = this.formBuilder.group({
       id: [''],
       name: ['', [Validators.required]],
       message: ['', [Validators.required]],
     });
   }

   onSubmit() {
     this.reclamationsService
       .createReclamation(this.addreclamationsForm.value)
       .subscribe((res) => {
         Swal.fire({
           position: 'top-end',
           icon: 'success',
           title: this.reclamationsService.message.create,
           showConfirmButton: false,
           timer: 1500,
         }).then(() => {
           this.getTableData();
           this.closeAdd.nativeElement.click()
           this.addreclamationsForm.reset()
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
     this.reclamationsService
       .updateSimpleReclamation(this.editreclamationsForm.value.id , this.editreclamationsForm.value)
       .subscribe((res) => {
         Swal.fire({
           position: 'top-end',
           icon: 'success',
           title: this.reclamationsService.message.update,
           showConfirmButton: false,
           timer: 1500,
         }).then(() => {
           this.getTableData();
           this.closeEdit.nativeElement.click()
           this.editreclamationsForm.reset()
         });
       });
   }

   loadDataToEdit(data: any) {
     this.editreclamationsForm.patchValue({
       id: data.id,
       name: data.name,
       message: data.message,
     });
   }

   idToDelete :any

   loadDataDelete(id:any){
     this.idToDelete = id
   }
   delete(){
     this.reclamationsService.deleteReclamation(this.idToDelete).subscribe(res=>{
       Swal.fire({
         position: 'top-end',
         icon: 'success',
         title: this.reclamationsService.message.delete,
         showConfirmButton: false,
         timer: 1500,
       }).then(()=>{
         this.getTableData()
         this.closeModelDelete.nativeElement.click()
       })
     })
   }

   private getTableData(): void {
     this.lstreclamations = [];
     this.serialNumberArray = [];

     this.reclamationsService.getReclamationById().subscribe((res: any) => {
      console.log(res);

       this.totalData = res.length;
       res.map((res: any, index: number) => {
         let serialNumber = index + 1;
         if (index >= this.skip && serialNumber <= this.limit) {
           this.lstreclamations.push(res);
           this.serialNumberArray.push(res.id);
         }
       });
       this.dataSource = new MatTableDataSource<any>(this.lstreclamations);
       this.calculateTotalPages(this.totalData, this.pageSize);
     });
   }

   public sortData(sort: Sort) {
     const data = this.lstreclamations.slice();

     if (!sort.active || sort.direction === '') {
       this.lstreclamations = data;
     } else {
       this.lstreclamations = data.sort((a: any, b: any) => {
         const aValue = (a as any)[sort.active];
         const bValue = (b as any)[sort.active];
         return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
       });
     }
   }

   public searchData(value: any): void {
     this.dataSource.filter = value.trim().toLowerCase();
     this.lstreclamations = this.dataSource.filteredData;
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
