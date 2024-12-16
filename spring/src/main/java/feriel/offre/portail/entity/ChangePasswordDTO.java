package feriel.offre.portail.entity;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordDTO {
    private String password ;
    private String confirmation ;
}
