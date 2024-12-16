package feriel.offre.portail.repository;

import feriel.offre.portail.entity.Image;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {
	Optional<Image> findByName(String name);

	List<Image> findImageByUtilisateurId(long id);








	@Transactional
	@Modifying
	@Query("DELETE FROM Image i WHERE i.utilisateur.id = :utilisateurId")
	void deleteByUtilisateurId(@Param("utilisateurId") Long utilisateurId);
}
