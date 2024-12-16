import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OffreEmploi } from 'src/app/core/models/offre-emploi';
import { OffreService } from 'src/app/core/services/offre/offre.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss'],
})
export class ViewDetailsComponent implements OnInit {
  offre: OffreEmploi | null = null;
  constructor(
    private ngZone: NgZone,
    private offreEmploiService: OffreService,
    private route : ActivatedRoute,
    private router : Router
  ) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + 'px';
      });
    };
    this.getScreenHeight();
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.offreEmploiService.getOffres().subscribe((offres) => {
      this.offre = offres.find((o) => o.id === id) || null;
    });
  }

  public innerHeight: any;
  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }
  onResize(event: any) {
    this.innerHeight = event.target.innerHeight + 'px';
  }

  postuler(id:any){
    const url = 'acceuil/postuler/'+id
    this.router.navigateByUrl(url)
  }
}
