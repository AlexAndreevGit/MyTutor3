package com.MyTutor2.controller;

import com.MyTutor2.model.DTOs.TutorialViewDTO;
import com.MyTutor2.model.enums.CategoryNameEnum;
import com.MyTutor2.service.TutorialsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tutorials")
public class TutorialsRestController {

    private final TutorialsService tutorialsService;

    public TutorialsRestController(TutorialsService tutorialsService) {
        this.tutorialsService = tutorialsService;
    }

    @GetMapping("/info")
    public ResponseEntity<List<TutorialViewDTO>> getInformaticsTutorials(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();  //set the HTTP status code to 401 unauthorized
        }

        List<TutorialViewDTO> tutorials = tutorialsService.findAllByCategoryID(2L);
        return ResponseEntity.ok(tutorials);
        // ResponseEntity is a pbject that can be used to build a response with a specific HTTP status code and body
        // The body can receive any kind of Object (list, Integer, custom Object) and it will serialise to JSON
        // On the Frontend React side, when the JSON is received the JS knows how to desiarilis teh JSON
        // .ok means that the header for the state will be 200 which is "ok"
    }

    @GetMapping("/math")
    public ResponseEntity<List<TutorialViewDTO>> getMathTutorials(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<TutorialViewDTO> tutorials = tutorialsService.findAllByCategoryID(1L);
        return ResponseEntity.ok(tutorials);
    }

    @GetMapping("/other")
    public ResponseEntity<List<TutorialViewDTO>> getOtherTutorials(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<TutorialViewDTO> tutorials = tutorialsService.findAllByCategoryID(3L);
        return ResponseEntity.ok(tutorials);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {

        //
        List<String> categories =
                Arrays.stream(CategoryNameEnum.values()) // Get all enum values
                .map(Enum::name) // Convert enum to string
                .collect(Collectors.toList());

        return ResponseEntity.ok(categories); //VB_11 ResponseEntity.ok?
    }
}