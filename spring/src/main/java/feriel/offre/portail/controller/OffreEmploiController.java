package feriel.offre.portail.controller;

import feriel.offre.portail.entity.OffreEmploi;
import feriel.offre.portail.entity.dto.OffreDTO;
import feriel.offre.portail.services.OffreEmploiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/offres")
public class OffreEmploiController {



    @Autowired
    private OffreEmploiService offreEmploiService;

    @PostMapping
    public OffreEmploi creerOffre(@RequestBody OffreDTO offreDTO) {
        return offreEmploiService.creerOffre(offreDTO);
    }

    @PutMapping("/{id}")
    public OffreEmploi modifierOffre(@PathVariable Long id, @RequestBody OffreDTO offre) {
        return offreEmploiService.modifierOffre(id, offre);
    }

    @DeleteMapping("/{id}")
    public void supprimerOffre(@PathVariable Long id) {
        offreEmploiService.supprimerOffre(id);
    }

    @GetMapping
    public List<OffreEmploi> listerOffres() {
        return offreEmploiService.listerToutesLesOffres();
    }

    @GetMapping("/recherche")
    public List<OffreEmploi> rechercherParTitre(@RequestParam String titre) {
        return offreEmploiService.rechercherParTitre(titre);
    }


    @GetMapping("/category/{categoryId}")
    public List<OffreEmploi> getOffresByCategoryId(@PathVariable Long categoryId) {
        return offreEmploiService.getOffresByCategoryId(categoryId);
    }
}
