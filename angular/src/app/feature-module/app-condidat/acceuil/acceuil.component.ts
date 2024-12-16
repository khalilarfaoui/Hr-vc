import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OffreEmploi } from 'src/app/core/models/offre-emploi';
import { OffreService } from 'src/app/core/services/offre/offre.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css'],
})
export class AcceuilComponent implements OnInit {
  offres: OffreEmploi[] = [];
  selectedCaategory: any;
  categories: any;
  constructor(
    private ngZone: NgZone,
    private offreEmploiService: OffreService,
    private router: Router,
    private categoriesService: CategoriesService
  ) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + 'px';
      });
    };
    this.getScreenHeight();
  }

  ngOnInit() {
    this.getAllCategories();
    this.getAllOffre();
  }

  getAllOffre() {
    this.offreEmploiService.getOffres().subscribe((data) => {
      this.offres = data;
    });
  }

  onSearch() {
    console.log(this.selectedCaategory);
    if (this.selectedCaategory == 'All') {
      this.getAllOffre();
    } else {
      this.offreEmploiService.getOffreFilterByCategory(this.selectedCaategory).subscribe(res=>{
        this.offres = res
      })
    }
  }

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  public innerHeight: any;
  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }
  onResize(event: any) {
    this.innerHeight = event.target.innerHeight + 'px';
  }

  viewDetails(id: any): void {
    console.log('Viewing details for offer ID:', id);
    const url = 'acceuil/offre-details/' + id;
    this.router.navigateByUrl(url);
    // Redirigez vers une page de détails ou affichez un modal.
  }
}
