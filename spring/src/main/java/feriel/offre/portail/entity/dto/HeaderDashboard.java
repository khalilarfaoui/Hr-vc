package feriel.offre.portail.entity.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HeaderDashboard {

    private long users ;
    private long categories ;
    private long offres ;
    private long postulations ;
}
