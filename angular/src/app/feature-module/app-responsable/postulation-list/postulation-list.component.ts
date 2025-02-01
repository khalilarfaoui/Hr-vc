import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OffreService } from 'src/app/core/services/offre/offre.service';
import { PostulerService } from 'src/app/core/services/postuler/postuler.service';
import { ReclamationService } from 'src/app/core/services/reclamation.service';

@Component({
  selector: 'app-postulation-list',
  templateUrl: './postulation-list.component.html',
  styleUrls: ['./postulation-list.component.scss'],
})
export class PostulationListComponent {
  offres: any[] = [];
  selectedCvUrl: any;

  @ViewChild('closeAdd') closeAdd!: ElementRef;
  public addOffreForm: FormGroup | any;
  constructor(
    private ngZone: NgZone,
    private offreService: OffreService,
    private sanitizer: DomSanitizer,
    private postulationService: PostulerService,
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
    this.loadOffres();

    this.addOffreForm = this.formBuilder.group({
      text: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }
  selectedOffre: any;
  onSelectedOffre(data: any) {
    this.selectedOffre = data;
  }

  response() {
    this.addOffreForm.patchValue({
      email: this.selectedOffre.email,
    });

    console.log(this.addOffreForm.value);
    this.reclamationsService
      .sendEmail(this.addOffreForm.value)
      .subscribe((res) => {
        this.closeAdd.nativeElement.click();
        this.addOffreForm.reset()
      });
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
