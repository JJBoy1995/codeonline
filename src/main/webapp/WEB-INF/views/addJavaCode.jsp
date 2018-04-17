<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/1/10 0010
  Time: 10:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>在线编程-JAVA</title>
    <script src="/js/jq.js"></script>
    <script src="/js/index.js"></script>
    <!--核心文件-->
    <script src="/codemirror-5.33.0/lib/codemirror.js"></script>
    <link rel="stylesheet" href="/codemirror-5.33.0/lib/codemirror.css">
    <script src="/codemirror-5.33.0/mode/clike/clike.js"></script>
    <!--引入css文件，用以支持主题-->
    <link rel="stylesheet" href="/codemirror-5.33.0/theme/eclipse.css">
    <link rel="stylesheet" href="/codemirror-5.33.0/theme/seti.css">
    <link rel="stylesheet" href="/codemirror-5.33.0/theme/dracula.css">

    <!--支持代码折叠-->
    <link rel="stylesheet" href="/codemirror-5.33.0/addon/fold/foldgutter.css"/>
    <script src="/codemirror-5.33.0/addon/fold/foldcode.js"></script>
    <script src="/codemirror-5.33.0/addon/fold/foldgutter.js"></script>
    <script src="/codemirror-5.33.0/addon/fold/brace-fold.js"></script>
    <script src="/codemirror-5.33.0/addon/fold/comment-fold.js"></script>

    <!--全屏模式-->
    <link rel="stylesheet" href="/codemirror-5.33.0/addon/display/fullscreen.css">
    <script src="/codemirror-5.33.0/addon/display/fullscreen.js"></script>

    <!--括号匹配-->
    <script src="/codemirror-5.33.0/addon/edit/matchbrackets.js"></script>

    <!--自动补全-->
    <link rel="stylesheet" href="/codemirror-5.33.0/addon/hint/show-hint.css">
    <script src="/codemirror-5.33.0/addon/hint/show-hint.js"></script>
    <script src="/codemirror-5.33.0/addon/hint/anyword-hint.js"></script>
    <!--括号自动补全-->
    <script src="/codemirror-5.33.0/addon/edit/closebrackets.js"></script>
    <style>
        #main {
            margin: auto;
            width: 520px;
        }

        #attrType {
            width: 120px;
        }

        .attrs {
            width: 100px;
        }

        #attrTable {
            display: none;
        }

        /*代码编辑器样式*/
        .CodeMirror-linenumber {
            background-color: #F7F7F7;
            color: #999;
        }
        .CodeMirror {
            font-size:14px;
            color: #333;
            width: 510px;
            font-family: Microsoft YaHei Arial sans-serif;
            background-color: #FFF;
            border:1px solid #ece2e2;
        }
        /*textarea {*/
            /*resize: none;*/
        /*}*/
    </style>
</head>
<body>
<div id="main">
    <table class="table table-bordered">

        <tr>
            <td colspan="5" align="center" nowrap="nowrap" bgcolor="#f1f1f1"><strong>Java</strong></td>
        </tr>
        <tr>
            <td nowrap="nowrap" bgcolor="#f1f1f1"><strong>方法名：</strong>
            <td bgcolor="#f1f1f1"><input type="text" id="name" onchange="checkFC(this)"></td>
            <td bgcolor="#f1f1f1"><input
                    type="button" id="add" value="添加"/></td>
            <td bgcolor="#f1f1f1"><input type="button" id="sel" value="查询"/></td>
            <td bgcolor="#f1f1f1" align="right"><input type="button" id="test" value="快速生成代码" onclick="code()"/></td>
        </tr>
        <tr>
            <td nowrap="nowrap" bgcolor="#f1f1f1" colspan="4"><strong>配置Event：</strong></td>
            <td bgcolor="#f1f1f1" align="right"><input type="button" id="addEvent" value="新增"/></td>
        </tr>
        <tr>
            <td colspan="5" align="center">
                <table id="attrTable">
                    <tr id="attrTableHead">
                        <th width="110">属性名</th>
                        <th width="110">属性类型</th>
                        <th width="110"></th>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td colspan="5"><textarea name="code" id="code"></textarea></td>
        </tr>
        <tr>

            <td colspan="5" align="center">
                <input type="button" id="run" value="运行"/>&nbsp;&nbsp;&nbsp;
                <input type="button" id="reset" value="重置"/>
            </td>

        </tr>
        <tr>
            <td colspan="5"><textarea name="msg" cols="70" rows="10" id="back"></textarea></td>
        </tr>
        <tr>
            <td colspan="5">使用Alt+/ 可以提示代码   Alt+F11开关全屏模式</td>
        </tr>
    </table>
</div>
<script type="text/javascript">
    //根据DOM元素的id构造出一个编辑器
    var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        //实现Java代码高亮
        mode: "text/x-java",

        //设置显示行号
        lineNumbers: true,

        //设置主题
        theme: "eclipse",

        //括号自动补全
        autoCloseBrackets: true,

        //在长行时文字是换行(wrap)还是滚动(scroll)，默认为滚动(scroll)
        lineWrapping: false,

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
        smartIndent : true,

        //智能提示
        extraKeys: {
            "Alt-/": "autocomplete", "Alt-F11": function (cm) {
                cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                if (cm.getOption("fullScreen")) {
                cm.setSize("100%");
                }else {
                    cm.size("510px");
                }
            }
        }
    });
</script>
</body>
</html>
