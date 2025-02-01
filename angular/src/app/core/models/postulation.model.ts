export interface Postulation {
  nom: string;
  email: string;
  message: string;
  cv: File | null;  // Le fichier CV
  offreId: number;
  addedBy : number
}
