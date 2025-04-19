package com.MyTutor2.controller;

import com.MyTutor2.model.entity.TutoringOffer;
import com.MyTutor2.model.entity.User;
import com.MyTutor2.repo.TutoringRepository;
import com.MyTutor2.repo.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Controller
public class HomeController {

    private TutoringRepository tutoringRepository;
    private UserRepository userRepository;

    //constructor injection
    public HomeController(TutoringRepository tutoringRepository, UserRepository userRepository) {
        this.tutoringRepository = tutoringRepository;
        this.userRepository = userRepository;
    }

    // Create a separate API endpoint for the data
    @GetMapping("/api/home-stats")
    @ResponseBody
    public Map<String, Integer> getHomeStats() {
        List<TutoringOffer> countInformaticsTutorials = tutoringRepository.findAllByCategoryId(2L);
        List<TutoringOffer> countMathematicsTutorials = tutoringRepository.findAllByCategoryId(1L);
        List<TutoringOffer> countOtherTutorials = tutoringRepository.findAllByCategoryId(3L);
        List<User> countAllUsers = userRepository.findAll();

        Map<String, Integer> stats = new HashMap<>();
        stats.put("countInformaticsTutorials", countInformaticsTutorials.size());
        stats.put("countMathematicsTutorials", countMathematicsTutorials.size());
        stats.put("countOtherTutorials", countOtherTutorials.size());
        stats.put("countAllUsers", countAllUsers.size()-1);

        return stats;
    }

    // Serve the React app for specific routes
    @GetMapping(value={"/", "/home", "/about-us"})
    public String serveReactApp() {
        return "forward:/index.html";
    }

    // Catch-all for other routes
    @RequestMapping("/app/**")
    public String forwardToReact() {
        return "forward:/index.html";
    }
}