package com.bonc.javaonline.util;

import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.charset.Charset;

/**
 * @Author: songjiajun
 * @Description:
 * @Date:2018-01-10 10:20
 */
@Component
public class JavaRun {
    private static Process process;

        /**
         *Description:编译并打包代码
         *
         *@param filePath
         *@return java.lang.String
         *@see
         */
    public String compileAndJar(String filePath) {
        String dirPath = filePath.substring(0, filePath.lastIndexOf(File.separator));
        String jarName = filePath.substring(filePath.lastIndexOf(File.separator) + 1, filePath.indexOf(".java"));
        String result = null;
        BufferedReader be = null;
        try {
            Runtime runtime = Runtime.getRuntime();
            process = runtime.exec("javac -encoding utf-8 " + filePath);
            Thread.sleep(1000);
            // 防止cmd.exe程序未启动，当然也可以直接使用javac命令
            // 往控制台注入命令
            be = new BufferedReader(new InputStreamReader(process.getErrorStream(), Charset.forName("GBK")));
            StringBuffer sb = new StringBuffer();
            String error = null;
            int i = 0;
            while ((error = be.readLine()) != null) {
                sb.append(error + "\n");
                i++;
            }
            String pr = sb.toString();
            if (i > 0) {
                result = "编译失败，请看错误提示\n" + pr;
            }
            //编译成功后执行打包操作
            if (i == 0) {
                process = runtime.exec("jar cfe " + jarName + ".jar " + jarName + " " + jarName + ".class", null, new File(dirPath));
            }
            be.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }finally {
            try {
                if (be != null) be.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return result;
    }


    public String run(String filePath, String[] attrs_value) {
        String dirPath = filePath.substring(0, filePath.lastIndexOf(File.separator));
        String jarName = filePath.substring(filePath.lastIndexOf(File.separator) + 1, filePath.indexOf(".jar"));
        String cmdStr = "java -jar " + jarName + ".jar";
        BufferedReader br = null;
        BufferedReader be = null;
        if (attrs_value!=null) {
            for (int i = 0; i < attrs_value.length; i++) {
                cmdStr = cmdStr + " " + attrs_value[i] + " ";
            }
        }
        String result = null;
        try {
            Runtime runtime = Runtime.getRuntime();
            process = runtime.exec(cmdStr, null, new File(dirPath));
            Thread.sleep(1000);
            // 防止cmd.exe程序未启动，当然也可以直接使用javac命令
            // 往控制台注入命令
            br = new BufferedReader(new InputStreamReader(process.getInputStream(), Charset.forName("GBK")));
            be = new BufferedReader(new InputStreamReader(process.getErrorStream(), Charset.forName("GBK")));
            StringBuffer sb = new StringBuffer();
            String input = null;
            String error = null;
            int i = 0;
            while ((error = be.readLine()) != null) {
                sb.append(error + "\n");
                i++;
            }
            if (i > 0) {
                String pr = sb.toString();
                result = "运行失败，请看错误提示\n" + pr;
            }
            if (i == 0) {
                while ((input = br.readLine()) != null) {
                    sb.append(input + "\n");
                }
                String pr = sb.toString();
                result = "运行成功，结果为\n" + pr;
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            try {
                if (br != null) {
                    br.close();
                }
                if (be != null) {
                    be.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return result;
    }

    public void createManifest(String filePath) {
        String path = filePath.substring(0, filePath.lastIndexOf(File.separator) + 1) + "manifest";
        String mainClass = filePath.substring(filePath.lastIndexOf(File.separator) + 1, filePath.indexOf(".java"));
        File manifest = new File(path);
        if (manifest.exists()) manifest.delete();
        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter(manifest));
            bw.write("Main-Class: " + mainClass + "\n");
            bw.flush();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
