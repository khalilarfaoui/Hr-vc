package feriel.offre.portail.controller;



import feriel.offre.portail.config.MailConfig;
import feriel.offre.portail.entity.AuthRequest;
import feriel.offre.portail.entity.ChangePasswordDTO;
import feriel.offre.portail.entity.PasswordGenerator;
import feriel.offre.portail.entity.Utilisateur;
import feriel.offre.portail.entity.dto.LoginResponseDTO;
import feriel.offre.portail.repository.UserRepository;
import feriel.offre.portail.detailsService.JwtService;
import feriel.offre.portail.services.IUserService;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private IUserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MailConfig emailService;

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody AuthRequest authRequest){
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword()));
        if(authenticate.isAuthenticated()){
            Utilisateur utilisateur = userRepository.findByUserName(authRequest.getUserName()).orElse(null);
            return new LoginResponseDTO(
                    jwtService.generateToken(authRequest.getUserName()), utilisateur.getId(), utilisateur.getRole()
            );
        }else {
            throw new UsernameNotFoundException("Invalid user request");
        }
    }

    public UserController(IUserService userService) {
        this.userService = userService;
    }



    @GetMapping("username/{username}")
    public Optional<Utilisateur> getByUsername(@PathVariable String username){
        return userRepository.findByUserName(username);
    }

    @GetMapping(path= "/getAll")
    //@PreAuthorize("hasAuthority('USER')")
    public List<Utilisateur> getAll(){
        return userService.getAllUsers();
    }

    @GetMapping(path= "/getUser/{id}")
    // @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Utilisateur> getUserById(@PathVariable Long id){
        Utilisateur utilisateur= userService.findById(id);
        return (utilisateur== null)
                ? new ResponseEntity<Utilisateur>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<Utilisateur>(utilisateur,HttpStatus.OK);
    }



    @PostMapping(path = "/addUser")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public Utilisateur addUser(@RequestBody Utilisateur user){
        String randomPassword = RandomStringUtils.randomAlphanumeric(12);
        user.setPassword(randomPassword);
        System.out.println(user.getPassword());
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("hrportal2023@gmail.com");
        simpleMailMessage.setTo(user.getEmail());
        simpleMailMessage.setSubject("Password");
        simpleMailMessage.setText(randomPassword);
        emailService.sendEmail(simpleMailMessage);
        return userService.createUser(user );
    }

    @PostMapping(path = "/addUser2")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public Utilisateur addUser2(@RequestBody Utilisateur user){

        return userService.createUser(user );
    }

    @PutMapping(path = "/updateUser")
    public Utilisateur updateUser(@RequestBody Utilisateur user){
        return userService.updateUser(user);
    }

    @DeleteMapping(path = "/deleteUser/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }

    @GetMapping("byUsename/{username}")
    public Optional<Utilisateur> getByUserName(@PathVariable String username){
        return userRepository.findByUserName(username);
    }

    @PostMapping("changePassword/{id}")
    public ResponseEntity<?> changePasword(@PathVariable long id, @RequestBody ChangePasswordDTO changePasswordDTO) {
        if (!changePasswordDTO.getPassword().equals(changePasswordDTO.getConfirmation())) {
            return ResponseEntity.badRequest().body("Confirmation incorrect.");
        }

        Utilisateur utilisateur = userRepository.findById(id).orElse(null);
        if (utilisateur == null) {
            return ResponseEntity.badRequest().body("Utilisateur non trouvé.");
        }
        utilisateur.setPassword(passwordEncoder.encode(changePasswordDTO.getPassword()));
        return ResponseEntity.ok(userRepository.save(utilisateur));

    }

    @GetMapping("forgetPassword/{email}")
    public boolean forgetPassword(@PathVariable String email) {

        Utilisateur user = userRepository.findByEmail(email).orElse(null);
        if(user==null){
            return false;
        }else{
            try{
                String tomporalPassword = PasswordGenerator.generatePassword(8);
                SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
                simpleMailMessage.setFrom("hrportal2023@gmail.com");
                simpleMailMessage.setTo(user.getEmail());
                simpleMailMessage.setSubject("New Password");
                simpleMailMessage.setText("Youre new password is "+tomporalPassword);
                emailService.sendEmail(simpleMailMessage);
                user.setPassword(passwordEncoder.encode(tomporalPassword));
                userRepository.save(user);
                return true;
            }catch (RuntimeException e){
                return false;
            }
        }
    }

}
