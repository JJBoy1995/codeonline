package com.bonc.javaonline.dao;

import com.bonc.javaonline.entity.JavaCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @Author: songjiajun
 * @Description:
 * @Date:2018-01-11 18:00
 */
public interface JavaCodeDao extends JpaRepository<JavaCode, Long> {
    /**
     * 查重
     */
    JavaCode findByFcNameAndServerId(String fcName,long serverId);

    /**
     * 获取指定服务下的所有函数，并按照函数名称排序
     */
    List<JavaCode> findByServerIdOrderByFcName(long serverId);

    /**
     * 获取指定服务下的所有函数，返回分页数据
     */
    Page<JavaCode> findByServerIdOrderByFcName(long serverId, Pageable pageable);
}
