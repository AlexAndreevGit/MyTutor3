package com.MyTutor2.controller;


import com.MyTutor2.service.impl.WeatherService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/weather")
public class WeatherController {


    private WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/berlin")
    public Map<String, Object> getBerlinTemperature(){

        Map<String,Object> result= new HashMap<>();

        double tempBerlin = weatherService.getCurrentTemperatureInBerlin();
        result.put("city","Berlin");
        result.put("template",tempBerlin);

        return result;
    }

}
