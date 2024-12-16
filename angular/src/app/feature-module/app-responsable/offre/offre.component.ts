import { Component, OnInit, HostListener, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { OffreService } from 'src/app/core/services/offre/offre.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {

  @ViewChild('closeAdd') closeAdd!: ElementRef;
  @ViewChild('closeEdit') closeEdit!: ElementRef;
  @ViewChild('closeModelDelete') closeModelDelete!: ElementRef;
  public lstOffres: any = [];
  public searchDataValue = '';
  public addOffreForm: FormGroup | any;
  public editOffreForm: FormGroup | any;
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


  categories : any
  constructor(
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private offreEmploiService: OffreService,
    private categoriesService : CategoriesService
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
    this.getAllCategory()

    this.addOffreForm = this.formBuilder.group({
      titre: ['', [Validators.required]],
      description: ['', [Validators.required]],
      entreprise: ['', [Validators.required]],
      localisation: ['', [Validators.required]],
      salaire: ['', [Validators.required]],
      typeContrat: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
    });

    this.editOffreForm = this.formBuilder.group({
      id: [''],
      titre: ['', [Validators.required]],
      description: ['', [Validators.required]],
      entreprise: ['', [Validators.required]],
      localisation: ['', [Validators.required]],
      salaire: ['', [Validators.required]],
      typeContrat: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
    });
  }

  getAllCategory(){
    this.categoriesService.getAllCategories().subscribe(res=>{
      this.categories = res
    })
  }

  onSubmit() {
    this.offreEmploiService
      .creerOffre(this.addOffreForm.value)
      .subscribe((res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Offre créée avec succès',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.getTableData();
          this.closeAdd.nativeElement.click();
          this.addOffreForm.reset();
        });
      }, (err) => {
        Swal.fire({
          title: 'Erreur!',
          text: `Quelque chose s'est mal passé`,
          icon: 'error',
          timer: 4000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      });
  }

  onSubmitEdit() {
    this.offreEmploiService
      .modifierOffre(this.editOffreForm.value.id, this.editOffreForm.value)
      .subscribe((res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Offre modifiée avec succès',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.getTableData();
          this.closeEdit.nativeElement.click();
          this.editOffreForm.reset();
        });
      });
  }

  loadDataToEdit(data: any) {
    this.editOffreForm.patchValue({
      id: data.id,
      titre: data.titre,
      description: data.description,
      entreprise: data.entreprise,
      localisation: data.localisation,
      salaire: data.salaire,
      typeContrat: data.typeContrat
    });
  }

  idToDelete: any;

  loadDataDelete(id: any) {
    this.idToDelete = id;
  }

  delete() {
    this.offreEmploiService.supprimerOffre(this.idToDelete).subscribe(res => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Offre supprimée avec succès',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        this.getTableData();
        this.closeModelDelete.nativeElement.click();
      });
    });
  }

  private getTableData(): void {
    this.lstOffres = [];
    this.serialNumberArray = [];

    this.offreEmploiService.getOffres().subscribe((res: any) => {
      this.totalData = res.length;
      res.map((res: any, index: number) => {
        let serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          this.lstOffres.push(res);
          this.serialNumberArray.push(res.id);
        }
      });
      this.dataSource = new MatTableDataSource<any>(this.lstOffres);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }

  public sortData(sort: Sort) {
    const data = this.lstOffres.slice();

    if (!sort.active || sort.direction === '') {
      this.lstOffres = data;
    } else {
      this.lstOffres = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.lstOffres = this.dataSource.filteredData;
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
    this.totalPages = Math.ceil(totalData / pageSize);
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
