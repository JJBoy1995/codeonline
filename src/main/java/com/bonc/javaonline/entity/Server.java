package com.bonc.javaonline.entity;

import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * @Author: songjiajun
 * @Description:
 * @Date:2018-01-23 10:59
 */
@Entity
@Data
public class Server {
    @Id
    @GeneratedValue
    private long id;

    private long userId;
    @NotBlank
    private String serverName;

    private String serverDescription;

    private Date createTime;

    private Date updateTime;

    public Server() {

    }
    public Server(long userId, String serverName, String serverDescription, Date createTime, Date updateTime) {
        this.userId = userId;
        this.serverName = serverName;
        this.serverDescription = serverDescription;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}
