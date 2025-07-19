package com.myTutor2;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import com.MyTutor2.model.entity.Category;
import com.MyTutor2.model.enums.CategoryNameEnum;
import com.MyTutor2.model.entity.TutoringOffer;
import com.MyTutor2.model.entity.User;
import com.MyTutor2.repo.CategoryRepository;
import com.MyTutor2.repo.TutoringRepository;
import com.MyTutor2.repo.UserRepository;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
//@ActiveProfiles("test")
public class TutorialsControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TutoringRepository tutoringRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    private User testUser;
    private Category mathCategory;

    @BeforeAll
    public static void setupAll() {
        // Set the FOREX_API_KEY as a system property before the context loads
        System.setProperty("FOREX_API_KEY", "e1c2f30d79644bc798c585b49408fbfc");
    }

    @AfterAll
    public static void tearDownAll() {
        // Clear the system property after tests
        System.clearProperty("FOREX_API_KEY");
    }

    @BeforeEach
    public void setup() {

        tutoringRepository.deleteAll();

        // Set up test user
        testUser = new User();
        testUser.setUsername("testuser");
        testUser.setEmail("test@example.com");
        testUser.setPassword("password123");
        userRepository.save(testUser);

        // Create a test category if it doesn't already exist
        Category existingCategory = categoryRepository.findByName(CategoryNameEnum.MATHEMATICS);

        if (existingCategory != null) {
            mathCategory = existingCategory;
        } else {
            mathCategory = new Category(CategoryNameEnum.MATHEMATICS);
            mathCategory.setDescription("Mathematics tutoring");
            categoryRepository.save(mathCategory);
        }

        // Set up security context
        setupSecurityContext();
    }

    private void setupSecurityContext() {
        // Create a proper UserDetails object
        UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                .username(testUser.getUsername())
                .password(testUser.getPassword())
                .roles("USER")  // This adds ROLE_USER to authorities
                .build();

        // Use the UserDetails in the authentication token
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        userDetails,  // Use userDetails as the principal
                        null,
                        userDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    @AfterEach
    public void tearDown() {
        // Clean up test data
        tutoringRepository.deleteAll();
        userRepository.deleteAll();
        categoryRepository.deleteAll();

        // Clear security context
        SecurityContextHolder.clearContext();
    }

    @Test
    @WithMockUser(username = "testuser")
    @Transactional
    public void testCreateAndRemoveTutorial() throws Exception {
        // 1: Create a tutorial
        mockMvc.perform(post("/tutorials/add")
                        .with(csrf())  // Add this line to include CSRF token
                        .param("name", "Algebra Tutoring")
                        .param("description", "Learn algebra fundamentals")
                        .param("price", "25.0")
                        .param("category", "MATHEMATICS"))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/"));

        // 2: Verify tutorial was created in the database
        List<TutoringOffer> tutorials = tutoringRepository.findAll();
        assertEquals(1, tutorials.size());
        TutoringOffer createdTutorial = tutorials.get(0);
        assertEquals("Algebra Tutoring", createdTutorial.getName());
        assertEquals("Learn algebra fundamentals", createdTutorial.getDescription());
        assertEquals(25.0, createdTutorial.getPrice());

        // 3: Test removal of the tutorial
        Long tutorialId = createdTutorial.getId();
        mockMvc.perform(get("/tutorials/remove/" + tutorialId))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/home"));

        // Verify tutorial was removed
        Optional<TutoringOffer> deletedTutorial = tutoringRepository.findById(tutorialId);
        assertTrue(deletedTutorial.isEmpty());
    }
}