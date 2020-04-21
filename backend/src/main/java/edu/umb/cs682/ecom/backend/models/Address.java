package edu.umb.cs682.ecom.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import javax.validation.constraints.NotBlank;

public class Address {
    @Id private String id;

    @NotBlank @DBRef private User user;

    @NotBlank private String name;
    @NotBlank private String line1;
    @NotBlank private String line2;
    @NotBlank private String city;
    @NotBlank private String postal;
    @NotBlank private String phone;
    private String state;
    private String instructions;

    public Address() {}

    public Address(@NotBlank User user, @NotBlank String name, @NotBlank String line1,
                   @NotBlank String line2, @NotBlank String city, @NotBlank String postal, @NotBlank String phone) {
        this.user = user;
        this.name = name;
        this.line1 = line1;
        this.line2 = line2;
        this.city = city;
        this.postal = postal;
        this.phone = phone;
    }

    public Address(@NotBlank User user, @NotBlank String name, @NotBlank String line1, @NotBlank String line2,
                   @NotBlank String city, @NotBlank String postal, @NotBlank String phone, String state) {
        this(user, name, line1, line2, city, postal, phone);
        this.state = state;
    }

    public Address(@NotBlank User user, @NotBlank String name, @NotBlank String line1, @NotBlank String line2,
                   @NotBlank String city, @NotBlank String postal, @NotBlank String phone, String state, String instructions) {
        this(user, name, line1, line2, city, postal, phone, state);
        this.instructions = instructions;
    }

    public String getId()           { return id; }
    public User getUser()           { return user; }
    public String getName()         { return name; }
    public String getLine1()        { return line1; }
    public String getLine2()        { return line2; }
    public String getCity()         { return city; }
    public String getState()        { return state; }
    public String getPostal()       { return postal; }
    public String getPhone()        { return phone; }
    public String getInstructions() { return instructions; }

    public void setId(String id)                     { this.id = id; }
    public void setUser(User user)                   { this.user = user; }
    public void setName(String name)                 { this.name = name; }
    public void setLine1(String line1)               { this.line1 = line1; }
    public void setLine2(String line2)               { this.line2 = line2; }
    public void setCity(String city)                 { this.city = city; }
    public void setState(String state)               { this.state = state; }
    public void setPostal(String postal)             { this.postal = postal; }
    public void setPhone(String phone)               { this.phone = phone; }
    public void setInstructions(String instructions) { this.instructions = instructions; }
}
