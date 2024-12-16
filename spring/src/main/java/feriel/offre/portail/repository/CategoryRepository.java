package feriel.offre.portail.repository;


import feriel.offre.portail.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);



}
