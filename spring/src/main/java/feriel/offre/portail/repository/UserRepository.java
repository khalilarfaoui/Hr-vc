package feriel.offre.portail.repository;

import feriel.offre.portail.entity.Utilisateur;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<Utilisateur,Long> {

    Optional<Utilisateur> findByUserName(String username);
    Optional<Utilisateur> findByEmail(String email);



}
