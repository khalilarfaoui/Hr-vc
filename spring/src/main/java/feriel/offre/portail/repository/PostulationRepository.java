package feriel.offre.portail.repository;
import feriel.offre.portail.entity.Postulation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostulationRepository extends JpaRepository<Postulation, Long> {
}