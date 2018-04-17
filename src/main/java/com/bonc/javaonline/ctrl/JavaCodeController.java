package com.bonc.javaonline.ctrl;

import com.alibaba.fastjson.JSON;
import com.bonc.javaonline.codebuild.action.JavaCodeBuild;
import com.bonc.javaonline.constant.BaseConstant;
import com.bonc.javaonline.dao.JavaCodeDao;
import com.bonc.javaonline.dao.ServerDao;
import com.bonc.javaonline.entity.JavaCode;
import com.bonc.javaonline.entity.Server;
import com.bonc.javaonline.util.JavaRun;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.util.Date;

/**
 * @Author: songjiajun
 * @Description:
 * @Date:2018-01-11 18:03
 */
@Controller
@RequestMapping("/function/java")
public class JavaCodeController {
    @Autowired
    JavaCodeDao javaCodeDao;
    @Autowired
    ServerDao serverDao;
    @Autowired
    JavaCodeBuild javaCodeBuild;
    @Autowired
    JavaRun javaRun;

    @RequestMapping("")
    public String index() {
        return "addJavaCode.jsp";
    }

        /**
         *Description:获取用户代码 编译并打包成功后添加到数据库
         *
         *@param javaCode
         *@return java.lang.String
         *@see
         */
    @RequestMapping("/add")
    @ResponseBody
    public String add(@RequestBody JavaCode javaCode) {
        if (javaCodeDao.findByFcNameAndServerId(javaCode.getFcName(), javaCode.getServerId()) == null) {
            String ftlName = "event.ftl";
            String outFile = javaCodeBuild.getOutFileDir() +javaCode.getServerId()+ File.separator + javaCode.getFcName() + ".java";
            javaCodeBuild.build(javaCode, ftlName, outFile);
            String result = javaRun.compileAndJar(outFile);
            if (result != null) return result;
            javaCode.setCreateTime(new Date());
            javaCode.setUpdateTime(javaCode.getCreateTime());
            javaCode.setFileSize(new File(outFile).length());
            javaCodeDao.save(javaCode);
            Server server = serverDao.findOne(javaCode.getServerId());
            server.setUpdateTime(new Date());
            serverDao.saveAndFlush(server);
            return JSON.toJSONString(BaseConstant.STATE_SUCCESS);
        } else {
            return JSON.toJSONString(BaseConstant.STATE_CHONGFU);
        }
    }

    @RequestMapping("/get")
    @ResponseBody
    public String selFunction(Long id) {
        JavaCode javaCode = javaCodeDao.findOne(id);
        return JSON.toJSONString(javaCode);
    }

    @RequestMapping("/delete")
    @ResponseBody
    public String delFunction(Long id) {
        javaCodeDao.delete(id);
        return JSON.toJSONString(BaseConstant.STATE_SUCCESS);
    }

    @RequestMapping("/run")
    @ResponseBody
    public String testFunction(Long id, String[] attrs) {
        JavaCode javaCode = javaCodeDao.findOne(id);
        String result = null;
        String jarPath = javaCodeBuild.getOutFileDir() +javaCode.getServerId()+ File.separator + javaCode.getFcName() + ".jar";
        if (javaCode == null) {
            return "该方法不存在";
        }
        result = javaRun.run(jarPath, attrs);
        return result;
    }
}
