<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/1/23 0023
  Time: 16:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>BONC - 函数计算</title>
    <%@include file="./public.jsp" %>
    <style>
        .main {
            position: relative;
            top: 20px;
            width: 600px;
            margin: auto;
        }

        .breadfont {
            font-size: 20px;
        }

        .baseMsg_tab {
            font-family: "Microsoft YaHei UI Light";
            font-size: 15px;
            color: #6c6783;
        }

        .rh40 {
            text-align: right;
            height: 40px;
        }

        .pl20 {
            padding-left: 20px;
        }

        /*代码编辑器样式*/
        .CodeMirror-linenumber {
            background-color: #F7F7F7;
            color: #999;
        }

        .CodeMirror {
            font-size: 16px;
            color: #333;
            font-family: Microsoft YaHei Arial sans-serif;
            background-color: #FFF;
            border: 1px solid #ece2e2;
        }

        #codeare {
            width: 80%;
            margin: auto;
        }
    </style>
</head>
<body class="layui-layout-body">
<div class="layui-layout layui-layout-admin">
    <!-- layui-header -->
    <div class="layui-header">
        <div class="layui-logo">BONC - 函数计算</div>
        <!-- 头部区域（可配合layui已有的水平导航） -->
        <ul class="layui-nav layui-layout-left">
            <li class="layui-nav-item">
                <a href="">控制台</a>
            </li>
            <li class="layui-nav-item">
                <a href="">服务管理</a>
            </li>
            <li class="layui-nav-item">
                <a href="">权限管理</a>
            </li>
            <li class="layui-nav-item">
                <a href="javascript:;">其它系统</a>
                <dl class="layui-nav-child">
                    <dd>
                        <a href="">邮件管理</a>
                    </dd>
                    <dd>
                        <a href="">消息管理</a>
                    </dd>
                    <dd>
                        <a href="">授权管理</a>
                    </dd>
                </dl>
            </li>
        </ul>
        <ul class="layui-nav layui-layout-right">
            <li class="layui-nav-item">
                <a href="javascript:;">
                    <img src="http://t.cn/RCzsdCq" class="layui-nav-img"> 宋佳俊
                </a>
                <dl class="layui-nav-child">
                    <dd>
                        <a href="">基本资料</a>
                    </dd>
                    <dd>
                        <a href="">安全设置</a>
                    </dd>
                </dl>
            </li>
            <li class="layui-nav-item">
                <a href="">退出</a>
            </li>
        </ul>
    </div>

    <div class="layui-side layui-bg-black">
        <div class="layui-side-scroll">
            <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
            <ul class="layui-nav layui-nav-tree" lay-filter="test" id="nav_list">
                <li class="layui-nav-item layui-nav-itemed">
                    <a class="" href="javascript:;" id="nav_title">服务列表</a>
                    <dl class="layui-nav-child" id="list">
                    </dl>
                </li>
            </ul>
        </div>
    </div>

    <div class="layui-body" id="mainbody">
        <!-- 主体内容显示 -->
        <!-- 面包屑显示 -->
        <button class="layui-btn" onclick="test()">test</button>
    </div>
    <div class="layui-footer">
        <!-- 底部固定区域 -->
        © bonc.com - 函数计算
    </div>
</div>
</body>
<script>
    layui.use(['form', 'layer', 'element', 'upload', 'table'], function () {
        var form = layui.form
            , layer = layui.layer
            , element = layui.element
            , upload = layui.upload
            , table = layui.table;

        upload.render({ //允许上传的文件后缀
            elem: '#upbutton',
            url: '/upload/',
            accept: 'file', //普通文件
            exts: 'zip|jar', //只允许上传压缩文件
            auto: false,
            size: 20 * 1024, //限制文件大小，单位 KB
            done: function (res) {
                console.log(res)
            }
        });

        //监听提交请求
        form.on('submit(submit)', function (data) {
            var lastevent = $("input[name='attrName']").last();
            if (lastevent.val() != "") {
                var code = editor.getValue();
                data.field.fcCode = code;
                var attrs_Name = [];
                $("input[name='attrName']").each(function () {
                    attrs_Name.push($(this).val());
                });
                var attrs_Type = [];
                $("select[name='attrType']").each(function () {
                    attrs_Type.push($(this).val());
                });
                var attrs_str = "[";
                for (var i = 0; i < attrs_Name.length; i++) {
                    attrs_str = attrs_str + '{"attrName" : "' + attrs_Name[i] + '","attrType" : "' + attrs_Type[i] + '"}';
                    if (i < attrs_Name.length - 1) attrs_str = attrs_str + ",";
                }
                attrs_str = attrs_str + "]";
                data.field.fcAttrs = attrs_str;
                var fcData = JSON.stringify(data.field);
                $.ajax({
                    url: 'function/java/add',
                    type: 'POST',
                    contentType: "application/json;charset=utf-8",
                    async: false,
                    data: fcData,
                    success: function (callback) {
                        if (callback == 200) {
                            layer.msg("添加成功", {
                                icon: 1,
                                time: 1000
                            });
                            getOneServer(data.field.serverId);
                        } else if (callback == 100) {
                            layer.msg("该函数名已经存在", {
                                icon: 1,
                                time: 1000
                            });
                            $("#fcName").focus();
                        } else {
                            layer.open({
                                type: 1,
                                content: "<pre>" + callback + "</pre>",
                                shadeClose: true,
                                title: '错误提示',
                                area: ['600px', '400px']
                            });
                        }
                    }
                });
            } else {
                layer.msg("请先完善当前参数信息", {
                    icon: 9,
                    time: 1000
                });
                lastevent.focus();
            }
            return false;
        });
        //根据所选打包方式不同 显示不同信息
        form.on('radio(codeonline)', function (data) {
            if (data.value == 'codeonline') {
                $("#upload").hide();
                $("#codeare").show()
            } else {
                $("#codeare").hide();
                $("#upload").show();
            }
        });
        //根据所选按钮选择是否展示参数配置
        form.on('radio(ifevent)', function (data) {
            if (data.value == 'yes') {
                $("#eventconfig").html("<div style=\"padding-left: 15px;\">\n" +
                    "       <h4>参数配置</h4>\n" +
                    "      </div>\n" +
                    "      <hr class=\"layui-bg-green\">\n" +
                    "      <div class=\"main\" style=\"width: 466px;\">\n" +
                    "       <div class=\"layui-form\" id=\"attrTable\">\n" +
                    "        <div class=\"layui-form-item\">\n" +
                    "         <div class=\"layui-input-inline\" style=\"width: 250px;\">\n" +
                    "          <input type=\"text\" name=\"attrName\" lay-verify=\"required|attrName\" placeholder=\"在此输入属性名称，注意首字母小写\" autocomplete=\"off\" class=\"layui-input\">\n" +
                    "         </div>\n" +
                    "         <div class=\"layui-input-inline\" style=\"width: 100px;\">\n" +
                    "          <select name=\"attrType\" lay-verify=\"\" lay-search>\n" +
                    "           <option value=\"byte\">byte</option>\n" +
                    "           <option value=\"short\">short</option>\n" +
                    "           <option value=\"int\">int</option>\n" +
                    "           <option value=\"float\">float</option>\n" +
                    "           <option value=\"double\">double</option>\n" +
                    "           <option value=\"long\">long</option>\n" +
                    "           <option value=\"boolean\">boolean</option>\n" +
                    "           <option value=\"String\" selected=\"selected\">String</option>\n" +
                    "          </select>\n" +
                    "         </div>\n" +
                    "         <div class=\"layui-input-inline\" style=\"width: 38px;\">\n" +
                    "          <img src=\"/pic/add.png\" height=\"38\" onclick=\"addEvent()\" />\n" +
                    "         </div>\n" +
                    "        </div>\n" +
                    "       </div>\n" +
                    "      </div>");
                layui.form.render();
                $("input[name='attrName']").last().focus();
            } else {
                $("#eventconfig").html("");
            }
        });
        //生命包含java关键字的数组
        var java = ["abstract", "boolean", "break", "byte", "case", "catch", "char", "class", "continue", "default", "do", "double", "else", "extends", "false", "final", "finally", "float", "for", "if", "implements", "import", "instanceof", "int", "interface", "long", "native", "new", "null", "package", "private", "protected", "public", "return", "short", "static", "super", "switch", "synchronized", "this", "throw", "throws", "transient", "try", "true", "void", "volatile", "while"];
        //自定义验证方法
        form.verify({
            fcName: function (value, item) {
                for (var i = 0; i < java.length; i++) {
                    if (value == java[i]) return '函数名不能和JAVA关键字相同';
                }
                if (!new RegExp("^[a-zA-Z_][a-zA-Z0-9_]{0,128}$").test(value)) return '只能包含字母、数字、下划线和中划线， 不能以数字、中划线开头，最大长度为128';
            },
            attrName: function (value, item) { //value：表单的值、item：表单的DOM对象
                for (var i = 0; i < java.length; i++) {
                    if (value == java[i]) return '参数命名不能和JAVA关键字相同';
                }
                if (!new RegExp("^[a-z_][a-zA-Z0-9_]{0,128}$").test(value)) return '参数名应以小写字母，下划线开头，不能出现除_外的特殊字符，最大长度为128';
            }
        })
    });
    function createEditor(domId){
        var editor = CodeMirror.fromTextArea(document.getElementById(domId), {
            //实现Java代码高亮
            mode: "text/x-java",

            //设置显示行号
            lineNumbers: true,

            //设置主题
            theme: "eclipse",

            //括号自动补全
            autoCloseBrackets: true,

            //在长行时文字是换行(wrap)还是滚动(scroll)，默认为滚动(scroll)
            lineWrapping: true,

            //在选择时是否显示光标，默认为false
            showCursorWhenSelecting: true,

            //光标高度。默认为1
            cursorHeight: 0.85,

            //代码折叠
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],

            // //全屏模式
            // fullScreen: false,

            //括号匹配
            matchBrackets: true,

            //智能缩进
            smartIndent: true,

            //智能提示
            extraKeys: {
                "Alt-/": "autocomplete",
                "Ctrl-Enter": function(cm) {
                    cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                    if(cm.getOption("fullScreen")) {
                        cm.setSize("100%");
                    } else {
                        cm.size("510px");
                    }
                }
            }
        });
        return editor;
    }
</script>

</html>
