package com.bonc.javaonline.ctrl;

import com.alibaba.fastjson.JSON;
import com.bonc.javaonline.constant.BaseConstant;
import com.bonc.javaonline.dao.JavaCodeDao;
import com.bonc.javaonline.dao.ServerDao;
import com.bonc.javaonline.entity.JavaCode;
import com.bonc.javaonline.entity.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: songjiajun
 * @Description:
 * @Date:2018-01-23 11:23
 */
@Controller
@RequestMapping("/server")
public class ServersController {
    @Autowired
    private ServerDao serverDao;
    @Autowired
    private JavaCodeDao javaCodeDao;

    @RequestMapping("/save")
    @ResponseBody
    public Object save(String serverName, String serverDescription) {
        Map<String, Object> map = new HashMap<String, Object>();
        if (serverDao.findByServerNameAndUserId(serverName, 1) == null) {
            Server server = new Server(1, serverName, serverDescription, new Date(), new Date());
            serverDao.save(server);
            long id = serverDao.findByServerNameAndUserId(serverName, 1).getId();
            map.put("id", id);
            map.put("code", BaseConstant.STATE_SUCCESS);
        } else {
            map.put("code", BaseConstant.STATE_CHONGFU);
        }

        return map;
    }

    @RequestMapping("/delete")
    @ResponseBody
    public String delete(Long id) {
        serverDao.delete(id);
        return JSON.toJSONString(BaseConstant.STATE_SUCCESS);
    }

    @RequestMapping("/update")
    @ResponseBody
    public String update(Long id, String description) {
        Server server = serverDao.findOne(id);
        server.setServerDescription(description);
        server.setUpdateTime(new Date());
        serverDao.saveAndFlush(server);
        return JSON.toJSONString(BaseConstant.STATE_SUCCESS);
    }

    @RequestMapping("/list")
    @ResponseBody
    public Object list() {
        List<Server> list = serverDao.findByUserId(1L);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("list", list);
        map.put("code", BaseConstant.STATE_SUCCESS);
        return map;
    }

    @RequestMapping("/getOne")
    @ResponseBody
    public Object getOneServer(Long id) {
        System.out.println(id);
        Server server = serverDao.findOne(id);
        List<JavaCode> list = javaCodeDao.findByServerIdOrderByFcName(id);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("server", server);
        map.put("list", list);
        map.put("code", BaseConstant.STATE_SUCCESS);
        return map;
    }

    @RequestMapping("/test")
    @ResponseBody
    public Object test(Long userId, int page,int size) {
        Pageable pageable = new PageRequest(page-1, size);
        Map<String,Object> map = new HashMap<String, Object>();
        Page<Server> serverPage = serverDao.findByUserId(userId, pageable);
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", serverPage.getTotalElements());
        map.put("data", serverPage.getContent());

        return map;
    }

}
