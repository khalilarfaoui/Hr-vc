package feriel.offre.portail.controller;

import feriel.offre.portail.config.MailConfig;
import feriel.offre.portail.entity.Reclamation;
import feriel.offre.portail.entity.Status;
import feriel.offre.portail.entity.Utilisateur;
import feriel.offre.portail.entity.dto.MailSendDTO;
import feriel.offre.portail.entity.dto.ReclamationDto;
import feriel.offre.portail.repository.ReclamationRepository;
import feriel.offre.portail.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/reclamations")
public class ReclamationController {
    @Autowired
    private IUserService userService;
    private final ReclamationRepository reclamationRepository;
    @Autowired
    private MailConfig emailService;

    public ReclamationController(ReclamationRepository reclamationRepository) {
        this.reclamationRepository = reclamationRepository;
    }

    @PostMapping("/{id}")
    public ResponseEntity<Reclamation> createReclamation(@RequestBody Reclamation reclamation, @PathVariable Long id) {
        Utilisateur utilisateur = userService.findById(id);
        reclamation.setName(utilisateur.getFirstName() + " " + utilisateur.getUserName());
        reclamation.setEmail(utilisateur.getEmail());
        reclamation.setIdUser(id);
        reclamation.setLocalDateTime(LocalDateTime.now());
        reclamation.setStatus(Status.PENDING);
        Reclamation savedReclamation = reclamationRepository.save(reclamation);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedReclamation);
    }

    @GetMapping
    public ResponseEntity<List<Reclamation>> getAllReclamations() {
        List<Reclamation> reclamations = reclamationRepository.findAll();
        return ResponseEntity.ok(reclamations);
    }

    @GetMapping("/{id}")
    public List<Reclamation> getReclamationById(@PathVariable Long id) {
        return reclamationRepository.findByIdUser(id);
    }


    @PostMapping("/send-email/response")
    public void sendEmailResponse(@RequestBody MailSendDTO mailSendDTO) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("hrportal2023@gmail.com");
        simpleMailMessage.setTo(mailSendDTO.getEmail());
        simpleMailMessage.setSubject("Response postulation");
        simpleMailMessage.setText(mailSendDTO.getText());
        emailService.sendEmail(simpleMailMessage);

    }

    @PutMapping("/{id}")
    public ResponseEntity<Reclamation> updateReclamation(@PathVariable Long id, @RequestBody ReclamationDto updatedReclamation) {
        return reclamationRepository.findById(id)
                .map(existingReclamation -> {
                    existingReclamation.setName(updatedReclamation.getName());
                    existingReclamation.setMessage(updatedReclamation.getMessage());
                    existingReclamation.setEmail(updatedReclamation.getEmail());
                    existingReclamation.setLocalDateTime(LocalDateTime.now());
                    existingReclamation.setStatus(Status.valueOf(updatedReclamation.getStatus()));
                    Reclamation savedReclamation = reclamationRepository.save(existingReclamation);
                    if (existingReclamation.getStatus() == Status.RESOLVED) {
                        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
                        simpleMailMessage.setFrom("hrportal2023@gmail.com");
                        simpleMailMessage.setTo(updatedReclamation.getEmail());
                        simpleMailMessage.setSubject("Response Reclamation");
                        simpleMailMessage.setText(updatedReclamation.getText());
                        emailService.sendEmail(simpleMailMessage);
                    }

                    return ResponseEntity.ok(savedReclamation);
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping("/simple-edit/{id}")
    public ResponseEntity<Reclamation> updateSimpleReclamation(@PathVariable Long id, @RequestBody ReclamationDto updatedReclamation) {
        return reclamationRepository.findById(id)
                .map(existingReclamation -> {
                    existingReclamation.setName(updatedReclamation.getName());
                    existingReclamation.setMessage(updatedReclamation.getMessage());

                    Reclamation savedReclamation = reclamationRepository.save(existingReclamation);


                    return ResponseEntity.ok(savedReclamation);
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReclamation(@PathVariable Long id) {
        if (reclamationRepository.existsById(id)) {
            reclamationRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

