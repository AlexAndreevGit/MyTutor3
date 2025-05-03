package com.MyTutor2.controller;

import com.MyTutor2.exceptions.TutorialNotFoundException;
import com.MyTutor2.model.DTOs.UserLogInDTO;
import com.MyTutor2.model.DTOs.UserRegisterDTO;
import com.MyTutor2.model.entity.User;
import com.MyTutor2.repo.UserRepository;
import com.MyTutor2.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.security.core.context.SecurityContextHolder;



@Controller
@RequestMapping("/users")
public class UserController {

    private UserService userService;
    private UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

//    @ModelAttribute("userRegisterDTO")
//    public UserRegisterDTO initUserRegisterDTO(){
//        return new UserRegisterDTO();
//    }

//    @GetMapping("/register")
//    public String register(HttpServletRequest request) {
//        String acceptHeader = request.getHeader("Accept");
//        boolean wantsHtml = acceptHeader != null && acceptHeader.contains("text/html");
//
//        return "forward:/index.html";
//    }



    @PostMapping("/register")
    public String registerConfirm(@Valid UserRegisterDTO userRegisterDTO,
                                  BindingResult bindingResult,
                                  RedirectAttributes redirectAttributes) {


        if(bindingResult.hasErrors() || !userRegisterDTO.getPassword().equals(userRegisterDTO.getConfirmPassword())) {
            redirectAttributes.addFlashAttribute("userRegisterDTO",userRegisterDTO);
            redirectAttributes.addFlashAttribute("org.springframework.validation.BindingResult.userRegisterDTO",bindingResult);

            return "redirect:register";
        }

        userService.registerUser(userRegisterDTO);
        return "redirect:/users/login";

    }

    @ModelAttribute("userLogInDTO")
    public UserLogInDTO initUserLogInDTO(){
        return new UserLogInDTO();
    }

    @GetMapping("/login")
    public String login() {
        return "forward:/index.html";
    }

    @GetMapping("/login-error")
    public String loginError() {
        return "forward:/index.html";
    }

    @PostMapping("/delete-account")
    public String deleteAccount(@AuthenticationPrincipal UserDetails userDetails,
                                HttpServletRequest request,    //is used to get the current user's request
                                HttpServletResponse response) throws TutorialNotFoundException {  //is used to get the current user's response

        User logedInUser= userRepository.findByUsername(userDetails.getUsername()).orElse(null);

        userService.deleteUser(logedInUser);

        //--- logout ---

        //get the current user's authentication
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        //securityContextLogoutHandler is used to log out the current user
        SecurityContextLogoutHandler securityContextLogoutHandler = new SecurityContextLogoutHandler();  //

        if (authentication != null) {
            securityContextLogoutHandler.logout(request, response, authentication);
        }

        return "redirect:/";
    }


}
