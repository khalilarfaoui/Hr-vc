package feriel.offre.portail.entity;


import java.util.ArrayList;
import java.util.List;

public class EmailSubjectDTO {
    private static final List<String> emailSubjects = new ArrayList<>();
    private static final List<String> emailTypes = new ArrayList<>();

    static {
        emailSubjects.add("Demande d'activation du compte utilisateur");
        emailSubjects.add("Demande de changement de role vers ");
        emailSubjects.add("Confirmation de la demande de changement de role vers");
        emailSubjects.add("Refus de la demande de changement de role vers");
        emailSubjects.add("Acceptation de la demande d'activation de votre compte");
        emailSubjects.add(("demande de réinitialisation de mot de passe"));
        emailSubjects.add(("demande d'inscription au formation "));
        emailSubjects.add(("Confirmation de la demande de particiaption à la formation "));
        emailSubjects.add(("Refus de la demande de particiaption à la formation "));
    }
    static {
        emailTypes.add("AddingAccount");
        emailTypes.add("ChangeRole");
        emailTypes.add("ValidationChangementRole");
        emailTypes.add("RefusChangementRole");
        emailTypes.add("AcceptationActivationCompte");
        emailTypes.add("reinitialisationpasse");
        emailTypes.add("inscriptionformation");
        emailTypes.add("validationinscriptionformation");
        emailTypes.add("refusinscriptionformation");

    }

    public static String getSubject(int index) {
        if (index >= 0 && index < emailSubjects.size()) {
            return emailSubjects.get(index);
        } else {
            return "sujet d'e-mail non trouvé";
        }
    }
    public static String getType(int index) {
        if (index >= 0 && index < emailTypes.size()) {
            return emailTypes.get(index);
        } else {
            return "type d'e-mail non trouvé";
        }
    }
}

