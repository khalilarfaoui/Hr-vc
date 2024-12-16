package feriel.offre.portail.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Postulation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String email;
    private String message;
    private String cvPath;  // Chemin vers le fichier CV


    public Postulation() {
    }

    public Postulation(String nom, String email, String message, String cvPath) {
        this.nom = nom;
        this.email = email;
        this.message = message;
        this.cvPath = cvPath;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCvPath() {
        return cvPath;
    }

    public void setCvPath(String cvPath) {
        this.cvPath = cvPath;
    }
}
