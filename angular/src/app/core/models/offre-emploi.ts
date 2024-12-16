export interface OffreEmploi {
  id?: number;
  titre: string;
  description: string;
  entreprise: string;
  localisation: string;
  salaire: number;
  typeContrat: TypeContrat;
}

export enum TypeContrat {
  CDD = 'CDD',
  CDI = 'CDI',
  FREELANCE = 'FREELANCE'
}
