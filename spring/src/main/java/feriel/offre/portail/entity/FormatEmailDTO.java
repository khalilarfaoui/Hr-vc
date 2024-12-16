package feriel.offre.portail.entity;



import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Data
@Builder

public class FormatEmailDTO {

    private String to ;
    private String Subject ;
    private Long UserId;
    private String specialite;
    private String tomporalPassword;
    private Long idInscription;
    private String titreFormation;
    private String nomFormateur;
    private String prenomFormateur;
    private LocalDate dateDebut;public String getBody(String firstName, String lastName, String matricule,
                                                      String genderUser,
                                                      String type, String codeVerification) {

        String salutationUser = (genderUser.equalsIgnoreCase("Homme")) ? "Monsieur" : "Madame";

        String cherForUser = (genderUser.equalsIgnoreCase("Homme")) ? "Chèr" : "Chère";

        if (type.equals("AddingAccount")) {
            return "Bonjour " + cherForUser + " " + salutationUser + " " + firstName +" "+lastName+" . Nous espérons que ce message vous trouve bien.\n" +
                    "Suite à votre tentative de création d'un nouveau compte avec ce matricule "+matricule+" , nous vous envoyons un code de vérification pour nos protocoles de sécurité sur notre plateforme.\n " +
                    codeVerification + "\n Cordialement,";
        }else if(type.equals("ForgetPassword")) {
            return "Bonjour " + firstName +" "+lastName+" . Nous espérons que ce message vous trouve bien.\n" +
                    "Suite à votre tentative de réinitialsation de votre mot de passe, nous vous envoyons un nouveau mot de passe pour accèder à l'application.\n " +
                    codeVerification + "\n Cordialement,";
        }else if(type.equals("demande")) {
            return "Bonjour " + cherForUser + " " + salutationUser + " " + firstName +" "+lastName+" . Nous espérons que ce message vous trouve bien.\n" +
                    "Votre demande a été "+ codeVerification + "\n Cordialement,";
        }

        else{
            return null;
        }

    }

}

