package feriel.offre.portail.services;

import feriel.offre.portail.entity.Postulation;
import feriel.offre.portail.repository.PostulationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostulationService {

    private final PostulationRepository postulationRepository;

    @Autowired
    public PostulationService(PostulationRepository postulationRepository) {
        this.postulationRepository = postulationRepository;
    }

    public Postulation postuler(Postulation postulation) {
        // Vous pouvez ajouter des validations ou des logiques supplémentaires ici
        return postulationRepository.save(postulation);
    }
}
