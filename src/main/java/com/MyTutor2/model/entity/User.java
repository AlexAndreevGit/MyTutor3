package com.MyTutor2.model.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Entity // means that this class is an entity and is mapped to a database table
@Table(name = "Tutors")  //means that this class is mapped to a table named "Tutors" in the database
public class User extends BaseEntity {

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String designation;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;


    //SpringSecurity_11 list of all roles that the user has. If the user has the admin role then he is an administrator
    @ManyToMany(fetch = FetchType.EAGER)//@ManyToMany is "lasy" by default. We change it to "eager", so the roles are fetched when we retrieve a User.
    @JoinTable(
            name = "user_roles",
            // joinColumn and inverseJoinColumn are fixed attributes of the @JoinTable
            joinColumns = @JoinColumn(name = "User_id"), //specifies the foreign key that refers to the current entity
            inverseJoinColumns = @JoinColumn(name = "UserRoleEntity_id") //specifies the foreign key that refers to the other entity
    )
    private List<UserRoleEntity> roles = new ArrayList<>();


    public User() {

    }

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public User(String username, String designation, String password, String email) {
        this.username = username;
        this.designation = designation;
        this.password = password;
        this.email = email;
    }

}
