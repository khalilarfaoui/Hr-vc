package feriel.offre.portail.entity.dto;

import feriel.offre.portail.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReclamationDto {

    Long id;

    private String name;
    private String message;
    private String email ;
    private Long idUser ;
    private String status ;

    private LocalDateTime localDateTime;
    private String text ;
}
