package feriel.offre.portail.services;


import feriel.offre.portail.entity.Utilisateur;
import feriel.offre.portail.repository.ImageRepository;
import feriel.offre.portail.repository.UserRepository;
import feriel.offre.portail.detailsService.UserInfoDetails;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements IUserService, UserDetailsService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    ImageRepository imageRepository;



    @Override
    public List<Utilisateur> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Utilisateur createUser(Utilisateur user ) {


        user.setPassword(passwordEncoder.encode(user.getPassword()));



        return userRepository.save(user);
    }

    @Override
    public Utilisateur updateUser(Utilisateur user) {
        Utilisateur utilisateur = findById(user.getId());
        if (utilisateur != null) {
            userRepository.save(user);
            return utilisateur;
        } else {
            throw new RuntimeException("User does not exist");
        }
    }


    @Override
    public void deleteUser(Long id) {

    

        userRepository.deleteById(id);
    }

    @Override
    public Utilisateur findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Utilisateur> userInfo = userRepository.findByUserName(username);
        return userInfo.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }


}
