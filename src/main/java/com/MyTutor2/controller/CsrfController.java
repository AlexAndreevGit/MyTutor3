package com.MyTutor2.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CsrfController {


    @GetMapping("/csrf")
    public Map<String, String> getCsrfToken(HttpServletRequest request) {

        CsrfToken csrf = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        Map<String, String> token = new HashMap<>();

        token.put("token", csrf.getToken());
        token.put("headerName", csrf.getHeaderName());
        token.put("parameterName", csrf.getParameterName());

        return token;
    }
}