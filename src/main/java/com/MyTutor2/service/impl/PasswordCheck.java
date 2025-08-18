package com.MyTutor2.service.impl;

public class PasswordCheck {

    public boolean ckeckPassword(String password) {
        // Implement your password checking logic here
        // For example, check if the password meets certain criteria
        if (password == null || password.length() < 8) {
            return false; // Password is too short or null
        }

        //check if the length of the password is bigger then 20 characters
        if (password.length() > 20) {
            return false; // Password is too long
        }

        //check if the password contains an number
        if (!password.matches(".*[0-9].*")) {
            return false; // Password must contain at least one digit
        }

        //check if th epassword contains lower cas leters
        if (!password.matches(".*[a-z].*")) {
            return false; // Password must contain at least one lowercase letter
        }

        //check for upper case
        if (!password.matches(".*[A-Z].*")) {
            return false; // Password must contain at least one uppercase letter
        }

        // Add more checks as needed (e.g., special characters, numbers, etc.)
        return true; // Password is valid
    }



    /**
     * Validates a password against specific criteria and throws an exception with a detailed reason
     * if the password fails any of the checks.
     *
     * @param password The password to validate.
     * @throws Exception if the password does not meet the required criteria:
     *                   - Password is null or shorter than 8 characters.
     *                   - Password exceeds 20 characters.
     *                   - Password does not contain at least one digit.
     *                   - Password does not contain at least one lowercase letter.
     *                   - Password does not contain at least one uppercase letter.
     */
    public void checkPasswordAndThrowAReason(String password) throws Exception {
        if (password == null || password.length() < 8) {
            throw new Exception("Password is too short or null. It must be at least 8 characters long.");
        }

        if (password.length() > 20) {
            throw new Exception("Password is too long. It must not exceed 20 characters.");
        }

        if (!password.matches(".*[0-9].*")) {
            throw new Exception("Password must contain at least one digit.");
        }

        if (!password.matches(".*[a-z].*")) {
            throw new Exception("Password must contain at least one lowercase letter.");
        }

        if (!password.matches(".*[A-Z].*")) {
            throw new Exception("Password must contain at least one uppercase letter.");
        }
    }

}
