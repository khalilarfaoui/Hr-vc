package feriel.offre.portail.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Utilisateur implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String userName;
    String firstName;
    String lastName;
    String email;
    String phoneNumber;
    String password;

    LocalDate creationDate;
    boolean isActive;

    private Role role ;


    @JsonIgnore
    @OneToMany
    private List<Image> imageList;

}
