package feriel.offre.portail;

import feriel.offre.portail.repository.UserRepository;
import feriel.offre.portail.services.IUserService;
import feriel.offre.portail.entity.Role;
import feriel.offre.portail.entity.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class InitialDataLoader implements CommandLineRunner {
    @Autowired
    IUserService userService;

    @Autowired
    UserRepository userRepository;
    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByUserName("admin").isPresent()) {
            System.out.println("L'admin existe déjà, aucune action nécessaire.");
        } else {
            Utilisateur user = new Utilisateur();
            user.setActive(true);
            user.setPassword("123456");
            user.setUserName("admin");
            user.setFirstName("Administrateur");
            user.setLastName("Global");
            user.setEmail("admin@gmail.com"); 
            user.setRole(Role.ADMIN);
            user.setPhoneNumber("00000000");

            try {
                userService.createUser(user);
                System.out.println("Admin ajouté avec succès !");
            } catch (Exception e) {
                throw new Exception("Erreur lors de la création de l'administrateur.", e);
            }

        }
    }
}
