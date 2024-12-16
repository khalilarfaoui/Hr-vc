package feriel.offre.portail.entity.dto;

import feriel.offre.portail.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDTO {

    private String token ;
    private long id ;
    private Role role ;
}
