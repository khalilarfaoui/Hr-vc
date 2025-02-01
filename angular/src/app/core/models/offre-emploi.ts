export interface OffreEmploi {
  id?: number;
  titre: string;
  description: string;
  entreprise: string;
  localisation: string;
  salaire: number;
  typeContrat: TypeContrat;
  addedBy  :number
}

export enum TypeContrat {
  CDD = 'CDD',
  CDI = 'CDI',
  FREELANCE = 'FREELANCE'
}
