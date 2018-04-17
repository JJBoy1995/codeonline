var editor;
var attrs = [];
function addFunction(serverId) {
    var html;
    $.ajax({
        url: ctx + '/server/list',
        async: false,
        dataType: 'json',
        success: function (data) {
            if (data.code == 200) {
                var list = data.list;
                var serverList = "";
                for (var i = 0; i < list.length; i++) {
                    (function () {
                        if (list[i].id == serverId) {
                            serverList += "<option value=\"" + list[i].id + "\" selected='selected'>" + list[i].serverName + "</option>\n";
                        } else {
                            serverList += "<option value=\"" + list[i].id + "\">" + list[i].serverName + "</option>\n";
                        }
                    })(i);
                }
                html = serverList;
            }
        }
    });
    $("#mainbody").html(" <div style=\"padding-left: 20px;padding-top: 20px;\">\n" +
        "     <h1>新建函数</h1></div>\n" +
        "    <hr class=\"layui-bg-green\">\n" +
        "    <div style=\"padding-left: 15px;\">\n" +
        "     <h3 style=\"font-weight: bold;\">基础管理配置</h3><br/><br />\n" +
        "     <h4>基础信息</h4></div>\n" +
        "    <hr class=\"layui-bg-green\">\n" +
        "    <form class=\"layui-form\" action=\"\">\n" +
        "     <div class=\"main\">\n" +
        "      <div class=\"layui-form-item\">\n" +
        "       <label class=\"layui-form-label\"><font color=\"red\">*</font>所在服务：</label>\n" +
        "       <div class=\"layui-input-inline\" style=\"width: 347px;\">\n" +
        "        <select name=\"serverId\" id='serverList' required lay-verify=\"required\" lay-search>\n" +
        "         <option value=\"\"></option>\n" + html +
        "        </select>\n" +
        "       </div>\n" +
        "       <div class=\"layui-form-mid layui-word-aux\">\n" +
        "        <a href=\"javascript:addServer()\" style=\"color:#009688;\">新建服务</a>\n" +
        "       </div>\n" +
        "      </div>\n" +
        "      <div class=\"layui-form-item\">\n" +
        "       <label class=\"layui-form-label\"><font color=\"red\">*</font>函数名称：</label>\n" +
        "       <div class=\"layui-input-inline\" style=\"width: 347px;\">\n" +
        "        <input type=\"text\" name=\"fcName\" id=\"fcName\" lay-verify=\"required|fcName\" placeholder=\"请输入函数名称\" autocomplete=\"off\" class=\"layui-input\" style=\"width: 347px;\">\n" +
        "       </div>\n" +
        "      </div>\n" +
        "      <div class=\"layui-form-label\"></div>\n" +
        "      <div class=\"layui-form-mid\">\n" +
        "       <pre style=\"color: #8D8D8D;\">\n" +
        "1. 只能包含字母、数字、下划线和中划线\n" +
        "2. 不能以数字、中划线开头\n" +
        "3. 长度限制在1-128之间</pre>\n" +
        "      </div>\n" +
        "      <div class=\"layui-form-item layui-form-text\">\n" +
        "       <label class=\"layui-form-label\">函数描述：</label>\n" +
        "       <div class=\"layui-input-block\">\n" +
        "        <textarea name=\"fcDescription\" placeholder=\"请输入服务描述\" class=\"layui-textarea\" style=\"width: 347px;resize: none;\"></textarea>\n" +
        "       </div>\n" +
        "      </div>\n" +
        "      <div class=\"layui-form-item\">\n" +
        "       <label class=\"layui-form-label\"><font color=\"red\">*</font>运行环境：</label>\n" +
        "       <div class=\"layui-input-inline\" style=\"width: 347px;\">\n" +
        "        <select name=\"codeType\" id=\"codeType\" required lay-verify=\"required\" lay-search>\n" +
        "         <option value=\"\"></option>\n" +
        "         <option value=\"Java8\">Java8</option>\n" +
        "         <option value=\"Python3\" disabled>Python3</option>\n" +
        "        </select>\n" +
        "       </div>\n" +
        "       <div class=\"layui-form-mid layui-word-aux\">\n" +
        "        <a href=\"javascript:makeCode()\" style=\"color:#009688;\">生成示例代码</a>\n" +
        "       </div>\n" +
        "      </div>\n" +
        "     </div>\n" +
        "     <br /><br />\n" +
        "     <div style=\"padding-left: 15px;\">\n" +
        "      <h4>代码配置</h4>\n" +
        "     </div>\n" +
        "     <hr class=\"layui-bg-green\">\n" +
        "     <div class=\"main\">\n" +
        "      <div class=\"layui-form\">\n" +
        "       <div class=\"layui-form-item\">\n" +
        "        <label class=\"layui-form-label\" style=\"width: 100px;\">代码上传方式：</label>\n" +
        "        <div class=\"layui-input-inline\">\n" +
        "         <input lay-filter=\"codeonline\" type=\"radio\" name=\"uptype\" value=\"codeonline\" title=\"在线编辑\" checked>\n" +
        "        </div>\n" +
        "        <div class=\"layui-input-inline\">\n" +
        "         <input lay-filter=\"codeonline\" type=\"radio\" name=\"uptype\" value=\"codepackage\" title=\"代码包上传\">\n" +
        "        </div>\n" +
        "       </div>\n" +
        "       <div class=\"layui-form-item\">\n" +
        "        <label class=\"layui-form-label\" style=\"width: 100px;\">是否含参：</label>\n" +
        "        <div class=\"layui-input-inline\">\n" +
        "         <input lay-filter=\"ifevent\" type=\"radio\" name=\"eventif\" value=\"yes\" title=\"是\">\n" +
        "        </div>\n" +
        "        <div class=\"layui-input-inline\">\n" +
        "         <input lay-filter=\"ifevent\" type=\"radio\" name=\"eventif\" value=\"no\" title=\"否\" checked>\n" +
        "        </div>\n" +
        "       </div>\n" +
        "      </div>\n" +
        "     </div>\n" +
        "     <div id=\"upload\" class=\"main\" style=\"padding-left: 80px;display: none;\">\n" +
        "      <div class=\"layui-upload-drag\" id=\"upbutton\" style=\"width: 60%; margin: auto;\">\n" +
        "       <i class=\"layui-icon\"></i>\n" +
        "       <p>点击上传，或将文件拖拽到此处</p>\n" +
        "      </div>\n" +
        "     </div>\n" +
        "     <div id=\"codeare\">\n" +
        "      <textarea name=\"code\" id=\"code\"></textarea>\n" +
        "     </div>\n" +
        "     <div class=\"layui-footer\" style=\"width: 144px;margin: auto;\">\n" +
        "      <button class=\"layui-btn\" lay-submit lay-filter=\"submit\">创建</button>\n" +
        "      <button class=\"layui-btn layui-btn layui-btn-primary\">取消</button>\n" +
        "     </div>\n" +
        "     <br />\n" +
        "     <br />\n" +
        "     <div id=\"eventconfig\">\n" +
        "     </div>\n" +
        "     <br /><br />\n" +
        "    </form>");
    layui.form.render();
    //根据DOM元素的id构造出一个编辑器
    editor = createEditor("code");
}

var java = ["abstract", "boolean", "break", "byte", "case", "catch", "char", "class", "continue", "default", "do", "double", "else", "extends", "false", "final", "finally", "float", "for", "if", "implements", "import", "instanceof", "int", "interface", "long", "native", "new", "null", "package", "private", "protected", "public", "return", "short", "static", "super", "switch", "synchronized", "this", "throw", "throws", "transient", "try", "true", "void", "volatile", "while"];

//生成示例代码
function makeCode() {
    var fcName = $("#fcName").val();
    if (fcName != null && fcName != "") {
        if ($("#codeType").val() != null && $("#codeType").val() != "") {
            if ($("#codeType").val() == "Java8") {
                var bb = true;
                for (var i = 0; i < java.length; i++) {
                    if (fcName == java[i]) {
                        bb = false;
                        layer.msg("请检查函数名不要与JAVA关键字相同", {
                            icon: 9,
                            time: 1000
                        });
                        $("#fcName").focus();
                        break;
                    }
                }
                if (bb) {
                    if (new RegExp("^[a-zA-Z_][a-zA-Z0-9_]{0,128}$").test(fcName)) {
                        editor.setValue("public void " + fcName + "(" + fcName + " e){" +
                            "\n     System.out.println(\"Hello World!!!\");" +
                            "\n}");
                    } else {
                        layer.msg("函数名只能包含字母、数字、下划线和中划线， 不能以数字、中划线开头，并且最大长度为128", {
                            icon: 9,
                            time: 1000
                        });
                        $("#fcName").focus();
                    }
                }
            }
        } else {
            layer.msg("请选择运行环境", {
                icon: 9,
                time: 1000
            });
        }
    } else {
        layer.msg("请先填写函数名称", {
            icon: 9,
            time: 1000
        });
        $("#fcName").focus();
    }
}

//添加参数
var index = 0;

function addEvent() {
    index++;
    var table = $("#attrTable");
    var lastevent = $("input[name='attrName']").last();
    if (lastevent.val() != "") {
        table.append("<div class='layui-form-item' id='attrDiv" + index + "'>\n" +
            "      <div class='layui-input-inline' style='width: 250px;'>\n" +
            "       <input type='text' name='attrName' lay-verify='required' placeholder='在此输入属性名称，注意首字母小写' autocomplete='off' class='layui-input'>\n" +
            "      </div>\n" +
            "      <div class='layui-input-inline' style='width: 100px;'>\n" +
            "       <select name='attrType' lay-verify='' lay-search>\n" +
            "        <option value='byte'>byte</option>\n" +
            "        <option value='short'>short</option>\n" +
            "        <option value='int'>int</option>\n" +
            "        <option value='float'>float</option>\n" +
            "        <option value='double'>double</option>\n" +
            "        <option value='long'>long</option>\n" +
            "        <option value='boolean'>boolean</option>\n" +
            "        <option value='String' selected='selected'>String</option>\n" +
            "       </select>\n" +
            "      </div>\n" +
            "      <div class='layui-input-inline' style='width: 38px;'>\n" +
            "       <img src='/pic/add.png' height='38' onclick='addEvent()'/>\n" +
            "      </div>\n" +
            "      <div class='layui-input-inline' style='width: 38px;'>\n" +
            "       <img src='/pic/delete.png' height='38' onclick='delEvent(" + index + ")'/>\n" +
            "      </div>\n" +
            "     </div>");
        layui.form.render('select');
        $("input[name='attrName']").last().focus();
    } else {
        layer.msg("请先完善当前参数信息，再添加参数", {
            icon: 9,
            time: 1000
        });
        lastevent.focus();
    }
}

//删除参数
function delEvent(a) {
    $("#attrDiv" + a + "").remove();
}

//获取一个函数详细信息
function getOneFunction(id, serverName) {
    $.ajax({
        url: 'function/java/get',
        data: {id: id},
        dataType: 'json',
        success: function (data) {
            var creatTime = new Date(parseInt(data.createTime)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
            var updateTime = new Date(parseInt(data.updateTime)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
            $("#mainbody").html("    <!-- 内容主体区域 -->\n" +
                "    <div class=\"pl20\">\n" +
                "     <table width=\"100%\">\n" +
                "      <tr>\n" +
                "       <td id=\"breadcrumb\">\n" +
                "        <span class=\"layui-breadcrumb\" lay-separator=\">\" style=\"font-size: 50px\">\n" +
                "                            <a href=\"\" class=\"breadfont\">函数计算</a>\n" +
                "                            <a href=\"\" class=\"breadfont\">" + serverName + "</a>\n" +
                "                            <a class=\"breadfont\"><cite>" + data.fcName + "</cite></a>\n" +
                "                        </span>\n" +
                "       </td>\n" +
                "       <td width=\"60%\" valign=\"bottom\" align=\"right\">\n" +
                "        <button class=\"layui-btn layui-btn-primary\" id=\"delServer\" onclick='delFunction(" + data.id + ")'>删除函数</button>\n" +
                "        <button class=\"layui-btn layui-btn-primary\">帮助文档</button>\n" +
                "        <button class=\"layui-btn layui-btn-primary\">服务监控</button>\n" +
                "       </td>\n" +
                "      </tr>\n" +
                "     </table>\n" +
                "    </div>\n" +
                "    <hr class=\"layui-bg-green\">\n" +
                "    <div class=\"layui-tab layui-tab-brief\" lay-filter=\"myTab\">\n" +
                "     <ul class=\"layui-tab-title\">\n" +
                "      <li class=\"layui-this\">概览</li>\n" +
                "      <li>代码执行</li>\n" +
                "     </ul>\n" +
                "     <div class=\"layui-tab-content\">\n" +
                "      <div class=\"layui-tab-item layui-show\">\n" +
                "       <!-- 计量数据显示 -->\n" +
                "       <div style=\"padding-left: 20px;\" id=\"measurementdata\">\n" +
                "        <table width=\"100%\">\n" +
                "         <tr>\n" +
                "          <td colspan=\"2\" height=\"60px\" style=\"font-family: 'Microsoft YaHei Arial';font-weight: bold;font-size: 15px;\">计量数据</td>\n" +
                "         </tr>\n" +
                "         <tr>\n" +
                "          <td style=\"padding-left: 20px;font-family:'Microsoft YaHei UI Light';color: #6c6783;font-size: 15px \">本月执行次数</td>\n" +
                "          <td width=\"80%\" style=\"padding-left: 20px;border-left:#cccccc solid 1px;font-family:'Microsoft YaHei UI Light';color: #6c6783;font-size: 15px \">本月资源使用量</td>\n" +
                "         </tr>\n" +
                "         <tr>\n" +
                "          <td style=\"padding-left: 20px;font-size: 50px;font-family: 'Microsoft YaHei Arial';color: #6c6783\">**次</td>\n" +
                "          <td style=\"padding-left: 20px;border-left:#cccccc solid 1px;font-size: 50px;font-family: 'Microsoft YaHei Arial';color: #6c6783\">****</td>\n" +
                "         </tr>\n" +
                "        </table>\n" +
                "       </div>\n" +
                "       <hr class=\"layui-bg-green\">\n" +
                "       <!-- 基础信息显示 -->\n" +
                "       <div style=\"padding-left: 20px;\" class=\"baseMsg_server\">\n" +
                "        <table width=\"100%\" class=\"baseMsg_tab\">\n" +
                "         <tr>\n" +
                "          <td colspan=\"3\" height=\"60px\" style=\"font-family: 'Microsoft YaHei Arial';font-weight: bold;color: black\">函数属性</td>\n" +
                "          <td align=\"right\" style=\"padding-right: 20px\"><button class=\"layui-btn\" id=\"upServer\">修改</button><button class=\"layui-btn layui-btn-primary\" id=\"downCode\">下载代码</button></td>\n" +
                "         </tr>\n" +
                "         <tr>\n" +
                "          <td width=\"10%\" class=\"rh40\">函数名称：</td>\n" +
                "          <td class=\"pl20\" id=\"fcName\">" + data.fcName + "</td>\n" +
                "          <td width=\"10%\" align=\"right\">所在区域：</td>\n" +
                "          <td class=\"pl20\">北京</td>\n" +
                "         </tr>\n" +
                "         <tr>\n" +
                "          <td width=\"10%\" class=\"rh40\">代码大小：</td>\n" +
                "          <td class=\"pl20\" id=\"fileSize\">" + data.fileSize + "</td>\n" +
                "          <td width=\"10%\" align=\"right\">运行环境：</td>\n" +
                "          <td class=\"pl20\" id=\"codeType\">" + data.codeType + "</td>\n" +
                "         </tr>\n" +
                "         <tr>\n" +
                "          <td width=\"10%\" class=\"rh40\">创建时间：</td>\n" +
                "          <td class=\"pl20\" id=\"createTime\">" + creatTime + "</td>\n" +
                "          <td width=\"10%\" align=\"right\">修改时间：</td>\n" +
                "          <td class=\"pl20\" id=\"updateTime\">" + updateTime + "</td>\n" +
                "         </tr>\n" +
                "         <tr>\n" +
                "          <td width=\"10%\" class=\"rh40\">信息描述：</td>\n" +
                "          <td width=\"40%\" class=\"pl20\" id=\"fcDescription\">" + data.fcDescription + "</td>\n" +
                "          <td></td>\n" +
                "          <td></td>\n" +
                "         </tr>\n" +
                "        </table>\n" +
                "       </div>\n" +
                "      </div>\n" +
                "      <div class=\"layui-tab-item\">\n" +
                "       <h4 style=\"font-weight: bold;\">代码执行管理</h4>\n" +
                "       <br />\n" +
                "       <div class=\"layui-btn-container\">\n" +
                "        <button class=\"layui-btn\" id=\"runBtn\" onclick='runFunction("+data.id+")'>执行</button>\n" +
                "        <button class=\"layui-btn layui-btn-primary\" id=\"saveAndRunBtn\" style=\"display: none;\">保存并执行</button>\n" +
                "        <i class=\"layui-icon\" id=\"tip1\">&#xe607;</i>\n" +
                "       </div>\n" +
                "       <textarea id=\"code\"></textarea>\n" +
                "       <br />\n" +
                "       <table id=\"attrTable\" lay-filter=\"attrTable\"></table>\n" +
                "       <hr class=\"layui-bg-green\" />\n" +
                "       <h4 style=\"font-weight: bold;\">执行结果</h4>\n" +
                "       <br />\n" +
                "       <div style=\"background-color: #e2e2e2; width: 100%;height: auto;\" id='result'></div>\n" +
                "      </div>\n" +
                "     </div>\n" +
                "    </div>\n" +
                "\n" +
                "    <input type=\"hidden\" id=\"fcId\" />\n");
            layui.element.render('breadcrumb');
            var editorFlag = true;
            //监听tab选项卡切换
            layui.element.on("tab(myTab)", function (data1) {
                //绑定 tips元素hover事件
                $("#tip1").hover(function () {
                    var that = this;
                    layer.tips('如果函数存在参数，那么您必须完善这些参数的值', that, {
                        tips: 1,
                        area: ["300px"],
                        time: 0
                    });
                }, function () {
                    layer.closeAll("tips");
                });
                if (editorFlag) {
                    editorFlag = false;
                    //根据DOM元素的id构造出一个编辑器
                    var editor = createEditor("code");
                    editor.setValue(data.fcCode);
                    //监听编辑器内容 改变事件
                    editor.on("change", function (editor, changes) {
                        if (changes) $("#saveAndRunBtn").show();
                    });
                    //回显参数信息
                    if (data.fcAttrs != "[]" && data.fcAttrs != "") {
                        //先将json字符串转换成对象（数组）
                        var attr =eval(data.fcAttrs);
                        layui.table.render({
                            elem: '#attrTable',
                            page: true, //开启分页
                            data: attr,
                            limit: 5,
                            limits: [5, 10, 15],
                            cols: [
                                [ //表头
                                    {
                                    field: 'attrName',
                                    title: '参数名称'
                                    },
                                    {
                                    field: 'attrType',
                                    title: '参数类型'
                                    },
                                    {
                                        field: 'attrValue',
                                        title: '参数值',
                                        edit: 'text'
                                    }
                                ]
                            ]
                        });

                        //监听单元格编辑
                        layui.table.on('edit(attrTable)', function(obj) { //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
                            // console.log(obj.value); //得到修改后的值
                            // console.log(obj.field); //当前编辑的字段名
                            //console.log(obj.data); //所在行的所有相关数据
                            attrs[obj.data.LAY_TABLE_INDEX] = obj.value;
                        });
                    }
                }
            });
        }
    });
}

//删除一个函数
function delFunction(id) {
    $.ajax({
        url: 'function/java/delete',
        data: {id: id},
        success: function (data) {
            if (data == 200) {
                layer.msg('删除成功', {
                    icon: 1,
                    time: 1000
                });
            }

        }
    });
}

//执行一个函数
function runFunction(id) {
    $.ajax({
        url: 'function/java/run',
        traditional:true,
        data:{id:id ,attrs: attrs},
        success: function (data) {
            $("#result").html("<pre>"+data+"</pre>");
        }
    });
}