package com.myTutor2.service.impl;

import com.MyTutor2.service.impl.PasswordCheck;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class PasswordCheckTest {

    private PasswordCheck passwordCheck;

    @BeforeEach
    void setUp() {
        passwordCheck = new PasswordCheck();
    }

        @Test
        void throwsExceptionWhenPasswordIsNull() {
            Exception exception = assertThrows(Exception.class, () -> passwordCheck.checkPasswordAndThrowAReason(null));
            assertEquals("Password is too short or null. It must be at least 8 characters long.", exception.getMessage());
        }

        @Test
        void throwsExceptionWhenPasswordIsTooShort() {
            Exception exception = assertThrows(Exception.class, () -> passwordCheck.checkPasswordAndThrowAReason("short"));
            assertEquals("Password is too short or null. It must be at least 8 characters long.", exception.getMessage());
        }

        @Test
        void throwsExceptionWhenPasswordIsTooLong() {
            Exception exception = assertThrows(Exception.class, () -> passwordCheck.checkPasswordAndThrowAReason("ThisPasswordIsWayTooLong123"));
            assertEquals("Password is too long. It must not exceed 20 characters.", exception.getMessage());
        }

        @Test
        void throwsExceptionWhenPasswordHasNoDigit() {
            Exception exception = assertThrows(Exception.class, () -> passwordCheck.checkPasswordAndThrowAReason("NoDigitsHere"));
            assertEquals("Password must contain at least one digit.", exception.getMessage());
        }

        @Test
        void throwsExceptionWhenPasswordHasNoLowercaseLetter() {
            Exception exception = assertThrows(Exception.class, () -> passwordCheck.checkPasswordAndThrowAReason("NOLOWERCASE123"));
            assertEquals("Password must contain at least one lowercase letter.", exception.getMessage());
        }

        @Test
        void throwsExceptionWhenPasswordHasNoUppercaseLetter() {
            Exception exception = assertThrows(Exception.class, () -> passwordCheck.checkPasswordAndThrowAReason("nouppercase123"));
            assertEquals("Password must contain at least one uppercase letter.", exception.getMessage());
        }

        @Test
        void doesNotThrowExceptionForValidPassword() {
            assertDoesNotThrow(() -> passwordCheck.checkPasswordAndThrowAReason("Valid123Password"));
        }

}
