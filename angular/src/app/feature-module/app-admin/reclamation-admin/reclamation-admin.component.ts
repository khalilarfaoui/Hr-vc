import {
  Reclamation,
  ReclamationService,
} from './../../../core/services/reclamation.service';
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

enum Status {
  PENDING = 'PENDING', // En attente
  IN_PROGRESS = 'IN_PROGRESS', // En cours de traitement
  RESOLVED = 'RESOLVED', // Résolu
  REJECTED = 'REJECTED', // Rejeté
}

@Component({
  selector: 'app-reclamation-admin',
  templateUrl: './reclamation-admin.component.html',
  styleUrls: ['./reclamation-admin.component.scss'],
})
export class ReclamationAdminComponent {
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
  reclamationSelected = {} as Reclamation;
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

  onSubmitEmail() {
    this.onEditStatus(
      this.reclamationSelected,
      'RESOLVED',
      this.addreclamationsForm.value.message
    );
  }

  selectedResolve(reclamation: Reclamation) {
    this.reclamationSelected = reclamation;
  }

  onEditStatus(reclamation: Reclamation, status: any, text?: string) {
    console.log("status" ,status )
    reclamation.status = status;
    if (text !== '') {
      reclamation.text = text;
    }
    this.reclamationsService
      .updateReclamation(reclamation.id ?? 0, reclamation)
      .subscribe(() => {
        this.getTableData();
        this.closeAdd.nativeElement.click()
        this.addreclamationsForm.reset()
      });
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

  private getTableData(): void {
    this.lstreclamations = [];
    this.serialNumberArray = [];

    this.reclamationsService.getAllReclamations().subscribe((res: any) => {
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
