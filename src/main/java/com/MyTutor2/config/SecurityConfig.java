package com.MyTutor2.config;

import com.MyTutor2.repo.UserRepository;

import com.MyTutor2.service.impl.UserDetailsService;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity  //Enable method level security   ->   .requestMatchers("/admin/**").hasRole("ADMIN")
public class SecurityConfig {

    //SpringSecurity_1 ->
    //With HttpSecurity we can easily create security filer chain. It is a builder for the class "SecurityFilterChain"
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.authorizeHttpRequests(
                    authorizeRequests ->   //which pages are public(no logIn needed) and which are not
                            authorizeRequests
                                    .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                                    .requestMatchers("/static/**").permitAll() //.permitAll() means that I will always receive information. Not matter if I'm authenticated or send a csrf token
                                    .requestMatchers("/*.js", "/*.css", "/*.ico", "/*.json").permitAll()
                                    .requestMatchers("/index.html").permitAll()
                                    .requestMatchers("/", "/home", "/about-us", "/users/login", "/users/login-error","/users/register", "/api/home-stats", "/api/auth/status", "/api/convert", "/api/**", "/index.html").permitAll()
                                    .requestMatchers("/api/tutorials/**").authenticated()
                                    .requestMatchers("/admin/**").hasRole("ADMIN")
                                    .anyRequest().authenticated()
                )
                .formLogin(formLogin ->  //how login works
                        formLogin
                                .loginPage("/users/login")        //use a custom login page
                                .usernameParameter("username")    //the name of the input field in your login form for username.
                                .passwordParameter("password")    //the name of the password input field
                                .defaultSuccessUrl("/home",true)
                                .failureUrl("/users/login-error")
                )
                .logout(
                        logout ->       //how logout works
                                logout.logoutUrl("/users/logout")
                                        .logoutSuccessUrl("/")
                                        .invalidateHttpSession(true)

                )
                .build();
    }

    //SpringSecurity_4 -> we are exposing "UserDetailsService" as a bean, so it is managed by spring

    @Bean
    public UserDetailsService userDetailsService(UserRepository userRepository){
        return new UserDetailsService(userRepository);  //we translate the users to representation that spring security understands
    }



}
