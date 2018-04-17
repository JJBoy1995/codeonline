package com.bonc.javaonline.entity;

import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * @Author: songjiajun
 * @Description:
 * @Date:2018-01-23 11:03
 */
@Entity
@Data
public class User {
    @Id
    @GeneratedValue
    private long id;

    @NotBlank
    private String username;

    private String password;

    @NotBlank
    private int role;

    public User(String username, String password, int role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
