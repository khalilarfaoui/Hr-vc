import { UserService } from './../../../core/services/user/user.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OffreEmploi } from 'src/app/core/models/offre-emploi';
import { Postulation } from 'src/app/core/models/postulation.model';
import { OffreService } from 'src/app/core/services/offre/offre.service';
import { PostulerService } from 'src/app/core/services/postuler/postuler.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postuler',
  templateUrl: './postuler.component.html',
  styleUrls: ['./postuler.component.scss'],
})
export class PostulerComponent implements OnInit {
  offre: OffreEmploi | null = null;
  postulerForm: FormGroup;
  idUser = localStorage.getItem("id")
  selectedFile: File | null = null;
  data:any
  constructor(
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private offreEmploiService: OffreService,
    private postulerService : PostulerService,
    private fb: FormBuilder,
    private router : Router,
    private userService : UserService
  ) {
    this.postulerForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      addedBy : [''],
      cv: [null],
    });
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
      this.userService.getUserById(this.idUser).subscribe(res=>{
        console.log(res);
        this.data = res
        this.postulerForm.patchValue({
          email : this.data.email ,
          nom : this.data.firstName + " "+ this.data.lastName ,
          addedBy : this.offre?.addedBy
        })
      })
    });

  }
  public innerHeight: any;
  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }
  onResize(event: any) {
    this.innerHeight = event.target.innerHeight + 'px';
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];  // Récupère le premier fichier sélectionné
    this.selectedFile = file;
  }
  postuler(): void {
    if (this.postulerForm.valid && this.selectedFile) {
      const formData: Postulation = {
        nom: this.postulerForm.get('nom')?.value,
        email: this.postulerForm.get('email')?.value,
        message: this.postulerForm.get('message')?.value,
        addedBy: this.postulerForm.get('addedBy')?.value,
        cv: this.selectedFile, // Utiliser le fichier sélectionné
        offreId: this.offre?.id ?? 0,
      };

      this.postulerService.postuler(formData.offreId, formData).subscribe({
        next: (response) => {
          console.log('Postulation envoyée avec succès', response);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Successfully Done',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.router.navigateByUrl("/acceuil/acceuil-page")
          });
        },
        error: (err) => {
          console.error('Erreur lors de la postulation', err);
        }
      });
    } else {
      console.error('Le formulaire est invalide ou le fichier est manquant');
    }
  }



}
