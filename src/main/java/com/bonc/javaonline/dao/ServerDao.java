package com.bonc.javaonline.dao;

import com.bonc.javaonline.entity.Server;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @Author: songjiajun
 * @Description:
 * @Date:2018-01-23 11:11
 */
@Transactional
public interface ServerDao extends JpaRepository<Server,Long>{
    /**
     * 同一用户下服务名称查重
     */
    Server findByServerNameAndUserId(String serverName,long userId);

    /**
     * 查询该用户下的所有服务
     */
    List<Server> findByUserId(Long UserId);

    /**
     * 查询该用户下的所有服务，返回分页数据
     */
    Page<Server> findByUserId(Long UserId, Pageable pageable);
}
