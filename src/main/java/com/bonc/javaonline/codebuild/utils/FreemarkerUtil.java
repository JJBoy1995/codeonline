package com.bonc.javaonline.codebuild.utils;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateExceptionHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

public final class FreemarkerUtil {
    /**
     * 日志对象
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(FreemarkerUtil.class);

    /**
     * 工具对象
     */
    private static FreemarkerUtil freemarkerUtil = null;

    /**
     * config对象
     */
    private Configuration cfg = null;

    /**
     * 初始化
     */
    public FreemarkerUtil() {
        // 初始化
        cfg = new Configuration(Configuration.VERSION_2_3_22);
        cfg.setClassForTemplateLoading(FreemarkerUtil.class, "/templates/");
        cfg.setDefaultEncoding("UTF-8");
        cfg.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);
        cfg.setLogTemplateExceptions(false);
    }

    /**
     * Description: 异步初始化 void
     *
     * @see
     */
    private static synchronized void syncInit() {
        if (freemarkerUtil == null) {
            freemarkerUtil = new FreemarkerUtil();
        }
    }

    /**
     * Description: 获取对象
     *
     * @return FreemarkerUtil
     * @see
     */
    public static FreemarkerUtil getInstance() {
        if (freemarkerUtil == null) {
            syncInit();
        }
        return freemarkerUtil;
    }

    /**
     * Description: 获取模板
     *
     * @param fileName
     * @return Template
     * @see
     */
    public Template getTemplate(String fileName) {
        Template template = null;
        try {
            template = cfg.getTemplate(fileName, "UTF-8");
        }
        catch (Exception e) {
            LOGGER.error("loadTemplate error:", e);
        }
        return template;
    }

    /**
     * Description: 构建代码
     *
     * @param name
     * @param rootMap
     * @param outFile
     *            void
     * @see
     */
    public void build(String name, Map<String, Object> rootMap, String outFile) {
        LOGGER.info(name + "====" + outFile);
        FileWriter out = null;
        try {
            File file = new File(outFile);
            if (!file.getParentFile().exists()) {
                file.getParentFile().mkdirs();
            }
            if (!file.exists()) {
                file.createNewFile();
            }
            out = new FileWriter(file);
            Template template = this.getTemplate(name);
            template.process(rootMap, out);
        }
        catch (TemplateException e) {
            LOGGER.error("Template Error", e);
        }
        catch (IOException e) {
            LOGGER.error("File Not Found", e);
        }
        finally {
            if (null != out) {
                try {
                    out.close();
                }
                catch (IOException e) {
                    LOGGER.error("File Not Found", e);
                }
            }
        }
    }

    /**
     * 控制台输出文件内容
     *
     * @param name
     * @param rootMap
     */
    public void print(String name, Map<String, Object> rootMap) {
        try {
            // 通过Template类可以将模板文件输出到相应的文件
            Template temp = this.getTemplate(name);
            temp.process(rootMap, new PrintWriter(System.out));
        }
        catch (TemplateException e) {
            LOGGER.error("Template Error", e);
        }
        catch (IOException e) {
            LOGGER.error("File Not Found", e);
        }
    }
}

