package feriel.offre.portail.controller;


import feriel.offre.portail.entity.Image;
import feriel.offre.portail.repository.ImageRepository;
import feriel.offre.portail.repository.UserRepository;
import feriel.offre.portail.entity.Utilisateur;
import feriel.offre.portail.filter.ImageUtility;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
//@CrossOrigin(origins = "http://localhost:8082") open for specific port
@CrossOrigin() // open for all ports
public class ImageController {

    final
    ImageRepository imageRepository;


    final UserRepository userRepository;

    public ImageController(ImageRepository imageRepository, UserRepository userRepository) {
        this.imageRepository = imageRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/upload/image/{id}")
    public ResponseEntity<ImageUploadResponse> uplaodImage(
            @RequestParam("image") MultipartFile file,
            @PathVariable long id
    )
            throws IOException {
        Utilisateur utilisateur = userRepository.findById(id).orElse(null);
        imageRepository.save(Image.builder()
                .utilisateur(utilisateur)
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .image(ImageUtility.compressImage(file.getBytes())).build());
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ImageUploadResponse("Image uploaded successfully: " +
                        file.getOriginalFilename()));
    }



    @GetMapping(path = {"/get/image/info/{id}"})
    public Image getImageDetails(@PathVariable("id") long id) throws IOException {

        List<Image> dbImageList = imageRepository.findImageByUtilisateurId(id);
        if(dbImageList.isEmpty()){
            return null;
        }
        Image dbImage = dbImageList.get(dbImageList.size() - 1);
        return Image.builder()
                .utilisateur(dbImage.getUtilisateur())
                .id(dbImage.getId())
                .name(dbImage.getName())
                .type(dbImage.getType())
                .image(ImageUtility.decompressImage(dbImage.getImage())).build();
    }



    @GetMapping(path = {"/get/image/{name}"})
    public ResponseEntity<byte[]> getImage(@PathVariable("name") String name) throws IOException {

        final Optional<Image> dbImage = imageRepository.findByName(name);

        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImage.get().getType()))
                .body(ImageUtility.decompressImage(dbImage.get().getImage()));
    }
    @DeleteMapping("images/{id}")
    public void delete(@PathVariable Long id){
        imageRepository.deleteById(id);
    }
}