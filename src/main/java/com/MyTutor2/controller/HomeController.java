package com.MyTutor2.controller;

import com.MyTutor2.model.entity.TutoringOffer;
import com.MyTutor2.repo.TutoringRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Controller
public class HomeController {

    private TutoringRepository tutoringRepository;

    //constructor injection
    public HomeController(TutoringRepository tutoringRepository) {
        this.tutoringRepository = tutoringRepository;
    }

//    @GetMapping("/api/home-stats")
//    @ResponseBody
//    public Map<String, Integer> getHomeStats() {
//        List<TutoringOffer> countInformaticsTutorials = tutoringRepository.findAllByCategoryId(2L);
//        List<TutoringOffer> countMathematicsTutorials = tutoringRepository.findAllByCategoryId(1L);
//        List<TutoringOffer> countOtherTutorials = tutoringRepository.findAllByCategoryId(3L);
//
//
//        Map<String, Integer> stats = new HashMap<>();
//        stats.put("countInformaticsTutorials", countInformaticsTutorials.size());
//        stats.put("countMathematicsTutorials", countMathematicsTutorials.size());
//        stats.put("countOtherTutorials", countOtherTutorials.size());
//
//        return stats;
//    }

    @GetMapping("/api/home-stats")
    @ResponseBody
    public Map<String, Integer> getHomeState(){
        List<TutoringOffer> countInformaticsTutorials = tutoringRepository.findAllByCategoryId(2L);
        List<TutoringOffer> countMathematicsTutorials = tutoringRepository.findAllByCategoryId(1L);
        List<TutoringOffer> countOtherTutorials = tutoringRepository.findAllByCategoryId(3L);

        Map<String,Integer> status = new HashMap<>();
        status.put("countInformaticsTutorials",countInformaticsTutorials.size());
        status.put("countMathematicsTutorials",countMathematicsTutorials.size());
        status.put("countOtherTutorials",countOtherTutorials.size());

        return status;
    }


    @GetMapping(value={"/", "/home", "/about-us"})
    public String serveReactApp() {
        return "forward:/index.html";
    }


    @RequestMapping("/app/**")
    public String forwardToReact() {
        return "forward:/index.html";
    }
}