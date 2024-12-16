import { Component, NgZone } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OffreService } from 'src/app/core/services/offre/offre.service';
import { PostulerService } from 'src/app/core/services/postuler/postuler.service';

@Component({
  selector: 'app-postulation-list',
  templateUrl: './postulation-list.component.html',
  styleUrls: ['./postulation-list.component.scss'],
})
export class PostulationListComponent {
  offres: any[] = [];
  selectedCvUrl: any;
  constructor(
    private ngZone: NgZone,
    private offreService: OffreService,
    private sanitizer: DomSanitizer,
    private postulationService : PostulerService
  ) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + 'px';
      });
    };
    this.getScreenHeight();
  }

  ngOnInit(): void {
    this.loadOffres();
  }

  loadOffres(): void {
    this.postulationService.getOffres().subscribe((data) => {
      this.offres = data;
      console.log(data);

    });
  }

  // Afficher le CV dans une modal
  viewCv(cvPath: string): void {
    const apiUrl = `http://localhost:8081/api/offres-to/cv/chat.pdf`;
    this.selectedCvUrl = this.sanitizer.bypassSecurityTrustResourceUrl(apiUrl);
  }

  // Fermer la modal
  closeModal(): void {
    this.selectedCvUrl = null;
  }

  // Télécharger le CV
  downloadCv(cvPath: string): void {
    this.postulationService.downloadCv('chat.pdf').subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = cvPath.split('/').pop() || 'cv.pdf'; // Nom par défaut
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

  public innerHeight: any;
  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }
  onResize(event: any) {
    this.innerHeight = event.target.innerHeight + 'px';
  }
}
