package com.bonc.javaonline.dao;

import com.bonc.javaonline.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @Author: songjiajun
 * @Description:
 * @Date:2018-01-23 11:21
 */
@Transactional
public interface UserDao extends JpaRepository<User, Long> {
    /**
     * 查重
     */
    User findByUsername(String username);

    /**
     * 登录校验
     */
    List<User> findByUsernameAndPassword(String username, String password);
}
