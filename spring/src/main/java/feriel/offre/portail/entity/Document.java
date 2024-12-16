package feriel.offre.portail.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name ;

    private LocalDateTime date ;


}
