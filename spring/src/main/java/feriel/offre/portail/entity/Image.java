package feriel.offre.portail.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Image {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "type")
	private String type;

	@Column(name = "image", unique = false, nullable = false, length = 100000)
	private byte[] image;

	@ManyToOne
	private Utilisateur utilisateur;



}