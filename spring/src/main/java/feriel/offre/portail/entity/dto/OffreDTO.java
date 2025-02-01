package feriel.offre.portail.entity.dto;


import feriel.offre.portail.entity.TypeContrat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OffreDTO {

    private Long id;
    private String titre;
    private String description;
    private String entreprise;
    private String localisation;
    private Double salaire;
    private TypeContrat typeContrat;
    private Long categoryId ;
    private Long addedBy ;
}
