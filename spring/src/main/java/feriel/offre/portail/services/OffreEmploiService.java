package feriel.offre.portail.services;

import feriel.offre.portail.entity.Category;
import feriel.offre.portail.entity.OffreEmploi;
import feriel.offre.portail.entity.dto.OffreDTO;
import feriel.offre.portail.repository.CategoryRepository;
import feriel.offre.portail.repository.OffreEmploiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class OffreEmploiService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private OffreEmploiRepository offreEmploiRepository;

    public OffreEmploi creerOffre(OffreDTO offre) {
        OffreEmploi offreEmploi = new OffreEmploi();
        offreEmploi.setDescription(offre.getDescription());
        offreEmploi.setSalaire(offre.getSalaire());
        offreEmploi.setTitre(offre.getTitre());
        offreEmploi.setTypeContrat(offre.getTypeContrat());
        offreEmploi.setLocalisation(offre.getLocalisation());
        offreEmploi.setEntreprise(offre.getEntreprise());
        offreEmploi.setAddedBy(offre.getAddedBy());
        Optional<Category> category = categoryRepository.findById(offre.getCategoryId());

        offreEmploi.setCategory(category.get());
        return offreEmploiRepository.save(offreEmploi);
    }

    public OffreEmploi modifierOffre(Long id, OffreDTO offre) {
        Optional<Category> category = categoryRepository.findById(offre.getCategoryId());
        return offreEmploiRepository.findById(id).map(existingOffre -> {
            existingOffre.setTitre(offre.getTitre());
            existingOffre.setDescription(offre.getDescription());
            existingOffre.setEntreprise(offre.getEntreprise());
            existingOffre.setLocalisation(offre.getLocalisation());
            existingOffre.setSalaire(offre.getSalaire());
            existingOffre.setTypeContrat(offre.getTypeContrat());
            existingOffre.setCategory(category.get());
            return offreEmploiRepository.save(existingOffre);
        }).orElseThrow(() -> new RuntimeException("Offre introuvable"));
    }

    public void supprimerOffre(Long id) {
        offreEmploiRepository.deleteById(id);
    }

    public List<OffreEmploi> rechercherParTitre(String titre) {
        return offreEmploiRepository.findByTitreContaining(titre);
    }

    public List<OffreEmploi> listerToutesLesOffres() {
        return offreEmploiRepository.findAll();
    }

    public List<OffreEmploi> getOffresByCategoryId(Long categoryId) {
        return offreEmploiRepository.findByCategoryId(categoryId);
    }

    public Map<String, Long> getOffresCountByCategory() {
        List<Object[]> results = offreEmploiRepository.countOffresByCategory();
        Map<String, Long> offresCountMap = new HashMap<>();
        for (Object[] result : results) {
            Category category = (Category) result[0];
            Long count = (Long) result[1];
            offresCountMap.put(category.getName(), count);
        }
        return offresCountMap;
    }
}
