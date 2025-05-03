package com.MyTutor2.controller;


import com.MyTutor2.exceptions.CategoryNotFoundException;
import com.MyTutor2.exceptions.TutorialNotFoundException;
import com.MyTutor2.exceptions.UserNotFoundException;
import com.MyTutor2.model.DTOs.TutorialAddDTO;
import com.MyTutor2.service.OpenAIService;
import com.MyTutor2.service.TutorialsService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import jakarta.validation.Valid;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.HashMap;
import java.util.Map;


@Controller
@RequestMapping("/tutorials")
public class TutorialsController {

    private TutorialsService tutorialsService;
    private OpenAIService openAIService;

    public TutorialsController(TutorialsService tutorialsService, OpenAIService openAIService) {
        this.tutorialsService = tutorialsService;
        this.openAIService = openAIService;
    }

    //We need it if I dont navigate through the buttons. For example if I share a link
    @GetMapping("/add")
    public String addTutorial() {
        return "forward:/index.html";
    }


//    @ModelAttribute("tutorialAddDTO")
//    public TutorialAddDTO initTutorialAddDTO() {
//        return new TutorialAddDTO();
//    }

    //React is sending a JSON payload and spring is mapping it to the parameter TutorialAddDTO. Same names in the JSON and in the fields in the DTO
    @PostMapping("/add")
    public String createTutorial(@AuthenticationPrincipal UserDetails userDetails,
                                 @Valid TutorialAddDTO tutorialAddDTO,
                                 BindingResult bindingResult,
                                 RedirectAttributes redirectAttributes) throws UserNotFoundException, CategoryNotFoundException {


        //Second validation different from the on in React if I import tutorials
        //bindingResult - through bindingResult we can access the result(errors) from the validation
        if (bindingResult.hasErrors()) {

            //redirectAttributes will save the information in the DTO and errors for short time
            redirectAttributes.addFlashAttribute("tutorialAddDTO", tutorialAddDTO);
            redirectAttributes.addFlashAttribute("org.springframework.validation.BindingResult.tutorialAddDTO", bindingResult);

            return "redirect:add";

        }

        String userName = userDetails.getUsername();

        tutorialsService.addTutoringOffer(tutorialAddDTO, userName);

        return "redirect:/";
    }


    // ChatBotAPI_1 -> In commons
    // ChatBotAPI_2
    @PostMapping("/ask-question")
    public ResponseEntity<Map<String, Object>> ascQuestion(@RequestBody Map<String, String> payload) {

        Map<String, Object> response = new HashMap<>();
        String question = payload.get("query");
        String answer = openAIService.askQuestion(question);
        response.put("answer", answer);

        return ResponseEntity.ok(response);

    }

    //ResponseEntity is used in Spring Boot to return structured and flexible responses from REST APIs
    @GetMapping("/remove/{id}")
    // <a class="ml-3 text-danger" th:href="@{/tutoriels/remove/{id}(id = *{id})}">Remove</a>
    public String remove(@PathVariable Long id) throws TutorialNotFoundException {

        tutorialsService.removeOfferById(id);

        return "redirect:/home";
    }


}
