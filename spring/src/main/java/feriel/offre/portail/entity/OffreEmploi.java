package feriel.offre.portail.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class OffreEmploi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titre;
    private String description;
    private String entreprise;
    private String localisation;
    private Double salaire;
    private TypeContrat typeContrat;
    private long addedBy ;
    @ManyToOne
    private Category category ;


}