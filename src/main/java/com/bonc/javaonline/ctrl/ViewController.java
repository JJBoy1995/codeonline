package com.bonc.javaonline.ctrl;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: songjiajun
 * @Description:
 * @Date:2018-01-11 19:47
 */
@Controller
public class ViewController {
    @RequestMapping("/")
    public String index() {
        return "index.jsp";
    }

    @RequestMapping("/serverForm")
    public String serverForm() { return "serverForm.jsp";}
}
