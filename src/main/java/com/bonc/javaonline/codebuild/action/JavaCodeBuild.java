package com.bonc.javaonline.codebuild.action;

import com.alibaba.fastjson.JSON;
import com.bonc.javaonline.codebuild.utils.FreemarkerUtil;
import com.bonc.javaonline.entity.JavaCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: songjiajun
 * @Description:
 * @Date:2018-01-15 19:44
 */
@Component
public class JavaCodeBuild {
    /*输出路径*/
    @Value("${codebuild.dir}")
    private String outFileDir;

    public String getOutFileDir() {
        return outFileDir;
    }

    public void build(JavaCode javaCode, String ftlName, String outFile) {
        Map<String, Object> root = new HashMap<String, Object>();
        root.put("fcName", javaCode.getFcName());
        root.put("fcCode", javaCode.getFcCode());
        // root.put("proPath", outFileDir.substring(1).replace("/", ".") + javaCode.getFcName());
        List<Map<String, String>> attrsList = JSON.parseObject(javaCode.getFcAttrs(),List.class);
        if (attrsList!=null&&attrsList.size()>0)root.put("attrs", attrsList);
        FreemarkerUtil.getInstance().build(ftlName, root, outFile);
    }
}
