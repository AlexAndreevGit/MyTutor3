package com.MyTutor2.controller;

import com.MyTutor2.model.DTOs.TutorialViewDTO;
import com.MyTutor2.model.entity.User;
import com.MyTutor2.repo.UserRepository;
import com.MyTutor2.service.ExRateService;
import com.MyTutor2.service.TutorialsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserRestController {


    private UserRepository userRepository;
    private TutorialsService tutorialsService;
    private ExRateService exRateService;

    public UserRestController(UserRepository userRepository,
                              TutorialsService tutorialsService, ExRateService exRateService) {
        this.userRepository = userRepository;
        this.tutorialsService = tutorialsService;
        this.exRateService = exRateService;
    }

    @GetMapping("/my-information")
    public ResponseEntity<Map<String, Object>> myInformation(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User loggedInUser = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<TutorialViewDTO> submittedByMeTutorialsAsView =
                tutorialsService.findAllTutoringOffersByUserId(loggedInUser.getId());

        double averagePriceEU = submittedByMeTutorialsAsView.stream()
                .mapToDouble(TutorialViewDTO::getPrice)
                .average()
                .orElse(0.0);

        BigDecimal averagePriceBGN = BigDecimal.ZERO;

        try {
            averagePriceBGN = exRateService.convert("EUR", "BGN", BigDecimal.valueOf(averagePriceEU));
        } catch (Exception e) {
            System.out.println("It is not possible to calculate the average price.");
        }

        DecimalFormat df = new DecimalFormat("#.00");

        Map<String, Object> result = new HashMap<>();
        result.put("userName", loggedInUser.getName());
        result.put("userEmail", loggedInUser.getEmail());
        result.put("numberOfClasses", submittedByMeTutorialsAsView.size());
        result.put("submittedByMeTutorialsAsView", submittedByMeTutorialsAsView);
        result.put("averagePriceEUR", df.format(averagePriceEU));
        result.put("averagePriceBGN", df.format(averagePriceBGN));

        return ResponseEntity.ok(result);
    }
}