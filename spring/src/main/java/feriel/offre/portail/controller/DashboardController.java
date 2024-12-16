package feriel.offre.portail.controller;


import feriel.offre.portail.entity.Category;
import feriel.offre.portail.entity.OffreEmploi;
import feriel.offre.portail.entity.Postulation;
import feriel.offre.portail.entity.Utilisateur;
import feriel.offre.portail.entity.dto.HeaderDashboard;
import feriel.offre.portail.repository.CategoryRepository;
import feriel.offre.portail.repository.OffreEmploiRepository;
import feriel.offre.portail.repository.PostulationRepository;
import feriel.offre.portail.repository.UserRepository;
import feriel.offre.portail.services.OffreEmploiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/dashboard")
public class DashboardController {


    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private OffreEmploiRepository offreEmploiRepository;
    @Autowired
    private PostulationRepository postulationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OffreEmploiService offreEmploiService;
    @GetMapping
    public HeaderDashboard getHeaderDashboard(){
        List<Category> categoryList = categoryRepository.findAll();
        List<Utilisateur> utilisateurList = userRepository.findAll();
        List<Postulation> postulationList = postulationRepository.findAll();
        List<OffreEmploi> offreEmploiList = offreEmploiRepository.findAll();
        HeaderDashboard headerDashboard = new HeaderDashboard();
        headerDashboard.setCategories(categoryList.size());
        headerDashboard.setOffres(offreEmploiList.size());
        headerDashboard.setUsers(utilisateurList.size());
        headerDashboard.setPostulations(postulationList.size());

        return headerDashboard ;
    }

    @GetMapping("/count-by-category")
    public Map<String, Long> getOffresCountByCategory() {
        return offreEmploiService.getOffresCountByCategory();
    }

}
