package feriel.offre.portail.controller;
import feriel.offre.portail.entity.Postulation;
import feriel.offre.portail.entity.dto.ResponseDTO;
import feriel.offre.portail.repository.PostulationRepository;
import feriel.offre.portail.services.PostulationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/offres-to")
public class PostulationController {

    private final PostulationService postulationService;

    private final PostulationRepository postulationRepository;

    @Autowired
    public PostulationController(PostulationService postulationService, PostulationRepository postulationRepository) {
        this.postulationService = postulationService;
        this.postulationRepository = postulationRepository;
    }

    @GetMapping
    public List<Postulation> getAllPostulation() {
        return postulationRepository.findAll();
    }

    // Endpoint pour postuler avec un fichier CV
    @PostMapping("/{offreId}/postuler")
    public ResponseEntity<?> postuler(@PathVariable Long offreId,
                                           @RequestParam("nom") String nom,
                                           @RequestParam("email") String email,
                                           @RequestParam("message") String message,
                                           @RequestParam("addedBy") long addedBy,
                                           @RequestParam("cv") MultipartFile cv) {

        // Sauvegarde du fichier CV
        String cvPath = saveCV(cv);

        if (cvPath == null) {
            return new ResponseEntity<>("Erreur lors du téléchargement du CV", HttpStatus.BAD_REQUEST);
        }

        // Créer l'objet de postulation
        Postulation postulation = new Postulation(nom, email, message,addedBy , cvPath);

        // Sauvegarder la postulation dans la base de données
        postulationService.postuler(postulation);

        return new ResponseEntity<>(new ResponseDTO("Postulation envoyée avec succès"), HttpStatus.CREATED);
    }

    // Endpoint pour récupérer et afficher le PDF
    @GetMapping("/cv/{filename}")
    public ResponseEntity<?> getCV(@PathVariable String filename) {
        try {
            // Spécifiez le répertoire où les fichiers sont sauvegardés
            Path filePath = Path.of("uploads/cv", filename);

            // Vérifier si le fichier existe
            if (!Files.exists(filePath)) {
                return new ResponseEntity<>("Fichier non trouvé", HttpStatus.NOT_FOUND);
            }

            // Créer une ressource pour le fichier
            Resource resource = new FileSystemResource(filePath);

            // Si le fichier existe, renvoyer le fichier PDF avec un en-tête pour le type de contenu
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + filename);
            headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf");

            return new ResponseEntity<>(resource, headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors du chargement du fichier", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private String saveCV(MultipartFile cv) {
        try {
            // Définir le répertoire où les CV seront sauvegardés
            Path uploadDirectory = Path.of("uploads/cv");
            if (!Files.exists(uploadDirectory)) {
                Files.createDirectories(uploadDirectory);
            }

            // Nom du fichier unique
            String filename = cv.getOriginalFilename();
            Path targetPath = uploadDirectory.resolve(filename);

            // Sauvegarder le fichier
            Files.copy(cv.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            // Retourner le chemin du fichier sauvegardé
            return targetPath.toString();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
