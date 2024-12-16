package feriel.offre.portail.services;


import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import feriel.offre.portail.entity.Document;
import feriel.offre.portail.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UploadDownloadService {
    @Autowired
    DocumentRepository documentRepository;

    public List<String> uploadFile(MultipartFile file , int id) throws Exception {
        String uploadDir = "./uploads/";
        Path uploadPath = Paths.get(uploadDir);

        // Create the directory if it doesn't exist
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        // Save file on system
        if (!file.getOriginalFilename().isEmpty()) {
            Document document = new Document();
            document.setName(file.getOriginalFilename());
            document.setDate(LocalDateTime.now());

            documentRepository.save(document);
            BufferedOutputStream outputStream = new BufferedOutputStream(
                    new FileOutputStream(new File(String.valueOf(uploadPath), file.getOriginalFilename())));
            outputStream.write(file.getBytes());
            outputStream.flush();
            outputStream.close();
        } else {
            throw new Exception();
        }

        List<String> list = new ArrayList<String>();
        File files = new File(String.valueOf(uploadPath));
        String[] fileList = ((File) files).list();
        for (String name : fileList) {
            list.add(name);
        }

        return list;

    }

    public List<String> getListofFiles() throws Exception {
        String uploadDir = "./uploads/";
        Path uploadPath = Paths.get(uploadDir);

        // Create the directory if it doesn't exist
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        List<String> list = new ArrayList<String>();
        File files = new File(String.valueOf(uploadPath));
        String[] fileList = files.list();
        for (String name : fileList) {
            list.add(name);
        }

        return list;

    }
}
