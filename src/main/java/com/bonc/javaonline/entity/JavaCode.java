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
 * @Date:2018-01-11 17:49
 */
@Entity
@Data
public class JavaCode {
    @Id
    @GeneratedValue
    private long id;

    @NotBlank
    private String fcName;

    @NotBlank
    private String fcCode;

    private String fcAttrs;

    private String fcDescription;

    private Date createTime;

    private Date updateTime;

    private long serverId;

    private long fileSize;

    private String codeType;

    public JavaCode() {
    }

    public JavaCode(String fcName, String fcCode, String fcAttrs, String fcDescription, Date createTime, Date updateTime, long serverId, long fileSize, String codeType) {
        this.fcName = fcName;
        this.fcCode = fcCode;
        this.fcAttrs = fcAttrs;
        this.fcDescription = fcDescription;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.serverId = serverId;
        this.fileSize = fileSize;
        this.codeType = codeType;
    }
}
