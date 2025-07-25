package com.MyTutor2.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;

@Configuration
public class ApplicationBeanConfiguration {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    //SpringSecurity_3
    @Bean
    public PasswordEncoder passwordEncoder() {
        //return Pbkdf2PasswordEncoder.defaultsForSpringSecurity_v5_8();
        //we update the password encoder for maximum flexibility. This supports multiple formats (bcrypt, pbkdf2, scrypt, etc.)
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

}
