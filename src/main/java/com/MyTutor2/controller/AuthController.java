package com.MyTutor2.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class AuthController {

    @GetMapping("/auth/status")
    public Map<String, Object> getAuthStatus() {


        //authentication object contains the details of the current user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();


        boolean isAuthenticated = false;

        if (authentication != null) {
            if (authentication.isAuthenticated()) {

                boolean hasAnonymousRole = authentication.getAuthorities().stream()
                        .anyMatch(a -> a.getAuthority().equals("ROLE_ANONYMOUS"));

                if (!hasAnonymousRole) {
                    isAuthenticated = true;
                }
            }
        }

        Map<String, Object> status = new HashMap<>();
        status.put("authenticated", isAuthenticated);

        if (isAuthenticated) {
            status.put("username", authentication.getName());
            status.put("roles", authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList()));
        }

        return status;
    }
}