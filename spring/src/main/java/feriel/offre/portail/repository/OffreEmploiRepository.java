package feriel.offre.portail.repository;

import feriel.offre.portail.entity.OffreEmploi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OffreEmploiRepository extends JpaRepository<OffreEmploi, Long> {
    List<OffreEmploi> findByTitreContaining(String titre);
    List<OffreEmploi> findByEntrepriseContaining(String entreprise);
    List<OffreEmploi> findByCategoryId(Long categoryId);

    @Query("SELECT o.category, COUNT(o) FROM OffreEmploi o GROUP BY o.category")
    List<Object[]> countOffresByCategory();
}