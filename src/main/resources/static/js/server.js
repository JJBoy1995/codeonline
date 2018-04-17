$(document).ready(function () {
    /*加载服务*/
    $("#list").html(loadServer());
});

/*删除服务*/
function delServer() {
    layer.confirm("<i class='layui-icon' style='color: red'>&#xe607;</i>是否删除服务，删除前确保服务下没有函数！", function () {
        var serId = $("#server_id").val();
        $.ajax({
            url: ctx + '/server/delete',
            type: 'POST',
            data: {id: serId},
            success: function (data) {
                if (data == 200) {
                    layer.msg("删除成功", {
                        icon: 1,
                        time: 1000
                    })
                }
                location = "";
            }
        });
    });
}

/*修改服务*/
function upServer() {
    var id = $("#server_id").val();
    layer.open({
        type: 1,
        title: "修改服务",
        offset: 'rt',
        anim: 1,
        move: false,
        shadeClose: true,
        btn: ['确定', '取消'],
        content: " <table width=\"100%\" class=\"baseMsg_tab\">\n" +
        "                <tr>\n" +
        "                    <td width=\"30%\" class=\"rh40\">服务名称：</td>\n" +
        "                    <td class=\"pl20\">" + parent.$("#server_name").html() + "</td>\n" +
        "                </tr>\n" +
        "                <tr>\n" +
        "                    <td class=\"rh40\">所在区域：</td>\n" +
        "                    <td class=\"pl20\">北京</td>\n" +
        "                </tr>\n" +
        "                <tr>\n" +
        "                    <td class=\"rh40\">创建时间：</td>\n" +
        "                    <td class=\"pl20\">" + parent.$("#server_createtime").html() + "</td>\n" +
        "                </tr>\n" +
        "                <tr>\n" +
        "                    <td class=\"rh40\">修改时间：</td>\n" +
        "                    <td class=\"pl20\">" + parent.$("#server_updatetime").html() + "</td>\n" +
        "                </tr>\n" +
        "                <tr>\n" +
        "                    <td valign=\"top\" class=\"rh40\">功能描述：</td>\n" +
        "                    <td class=\"pl20\"><textarea rows=\"9\" cols=\"40\" style=\"resize: none\" id='descr'>" + parent.$("#server_description").html() + "</textarea></td>\n" +
        "                </tr>\n" +
        "            </table>",
        area: ["30%", "100%"],
        yes: function (index, layero) {
            var descr = $("#descr").val();
            $.ajax({
                url: ctx + '/server/update',
                type: "POST",
                data: {id: id, description: descr},
                success: function (data) {
                    if (data == 200) {
                        parent.layer.closeAll();
                        layer.msg("修改成功", {
                            icon: 1,
                            time: 1000
                        });
                    }
                }
            });
        },
        end: function () {
            getOneServer(id);
        }
    });
};

/*加载服务列表*/
function loadServer() {
    var html;
    $.ajax({
        url: ctx + '/server/list',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            if (data.code == 200) {
                var list = data.list;
                var innerHtml = "<dd><a href=\"javascript:addServer()\"><i class=\"layui-icon\">&#xe654;</i> 新建服务</a></dd>";
                for (var i = 0; i < list.length; i++) {
                    (function () {
                        innerHtml += "<dd><a href=\"javascript:getOneServer(" + list[i].id + ");\"><i class='layui-icon' style='font-size: 10px'>&#xe617;</i>&nbsp;&nbsp;" + list[i].serverName + "</a></dd>";
                    })(i);
                }
                html = innerHtml;
            }
        }
    });
    return html;
}

/*获取一个服务的详细信息*/
function getOneServer(id) {
    $.ajax({
        url: ctx + '/server/getOne',
        type: 'POST',
        data: {id: id},
        dataType: 'json',
        success: function (data) {
            var index = layer.load(2, {time: 10 * 1000}); //又换了种风格，并且设定最长等待10秒
            var ser = data.server;
            var list = data.list;
            var innerHtml = "<dd><a href=\"javascript:addFunction(" + ser.id + ")\"><i class=\"layui-icon\">&#xe654;</i> 新建函数</a></dd>";
            for (var i = 0; i < list.length; i++) {
                (function () {
                    innerHtml += "<dd><a href=\"javascript:getOneFunction(" + list[i].id +",'"+ser.serverName+ "');\"><i class='layui-icon' style='font-size: 10px'>&#xe617;</i>&nbsp;&nbsp;" + list[i].fcName + "</a></dd>";
                })(i);
            }
            if ($("#back").length == 0) {
                $("#nav_list").prepend("<li class=\"layui-nav-item\" style='height: 70px;'><a href=''style='height: 70px;line-height: 70px;text-align: center' id='back'><i class=\"layui-icon\" style='font-size: 50px'>&#xe603;</i></a></li>" +
                    "<li class=\"layui-nav-item\" style='background-color: #FFFFFF;' id='server_title'><a href='javascript:getOneServer("+id+")'style='color: black;font-weight: bold'>服务概览</a></li>");
            }
            $("#list").html(innerHtml);
            $("#nav_title").html("函数列表<span class='layui-nav-more'></span>");
            var creatTime = new Date(parseInt(ser.createTime)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
            var updateTime = new Date(parseInt(ser.updateTime)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
            $("#mainbody").html("<div class=\"pl20\">\n" +
                "            <table width=\"100%\">\n" +
                "                <tr>\n" +
                "                    <td id=\"breadcrumb\">\n" +
                "                        <span class=\"layui-breadcrumb\" lay-separator=\">\" style=\"font-size: 50px\">\n" +
                "                            <a href=\"\" class=\"breadfont\">函数计算</a>\n" +
                "                            <a class=\"breadfont\"><cite>" + ser.serverName + "</cite></a>\n" +
                "                        </span>\n" +
                "                    </td>\n" +
                "                    <td width=\"60%\" valign=\"bottom\" align=\"right\">\n" +
                "                         <button class=\"layui-btn\" onclick='addFunction(" + ser.id + ")'>新建函数</button>\n" +
                "                         <button class=\"layui-btn layui-btn-primary\" id=\"delServer\" onclick='delServer()'>删除服务</button>\n" +
                "                         <button class=\"layui-btn layui-btn-primary\">帮助文档</button>\n" +
                "                         <button class=\"layui-btn layui-btn-primary\">服务监控</button>\n" +
                "                    </td>\n" +
                "                </tr>\n" +
                "            </table>\n" +
                "        </div>\n" +
                "            <hr class=\"layui-bg-green\">\n" +
                "        <!-- 计量数据显示 -->\n" +
                "        <div style=\"padding-left: 20px;\" id=\"measurementdata\">\n" +
                "            <table width=\"100%\">\n" +
                "                <tr><td colspan=\"2\" height=\"60px\" style=\"font-family: 'Microsoft YaHei Arial';font-weight: bold;font-size: 15px;\">计量数据</td></tr>\n" +
                "                <tr>\n" +
                "                    <td style=\"padding-left: 20px;font-family:'Microsoft YaHei UI Light';color: #6c6783;font-size: 15px \">本月执行次数</td>\n" +
                "                    <td width=\"80%\" style=\"padding-left: 20px;border-left:#cccccc solid 1px;font-family:'Microsoft YaHei UI Light';color: #6c6783;font-size: 15px \">本月资源使用量</td>\n" +
                "                </tr>\n" +
                "                <tr>\n" +
                "                    <td style=\"padding-left: 20px;font-size: 50px;font-family: 'Microsoft YaHei Arial';color: #6c6783\">**次</td>\n" +
                "                    <td style=\"padding-left: 20px;border-left:#cccccc solid 1px;font-size: 50px;font-family: 'Microsoft YaHei Arial';color: #6c6783\">****</td>\n" +
                "                </tr>\n" +
                "            </table>\n" +
                "        </div>\n" +
                "            <hr class=\"layui-bg-green\">\n" +
                "        <!-- 基础信息显示 -->\n" +
                "        <div style=\"padding-left: 20px;\" class=\"baseMsg_server\">\n" +
                "            <table width=\"100%\" class=\"baseMsg_tab\">\n" +
                "                <tr>\n" +
                "                    <td colspan=\"3\" height=\"60px\" style=\"font-family: 'Microsoft YaHei Arial';font-weight: bold;color: black\">基础信息</td>\n" +
                "                    <td align=\"right\" style=\"padding-right: 20px\"><button class=\"layui-btn layui-btn-primary\" id=\"upServer\" onclick='upServer()'>修改</button></td>\n" +
                "                </tr>\n" +
                "                <tr>\n" +
                "                    <td width=\"10%\" class=\"rh40\">服务名称：</td>\n" +
                "                    <td class=\"pl20\" id=\"server_name\">" + ser.serverName + "</td>\n" +
                "                    <td width=\"10%\" align=\"right\">所在区域：</td>\n" +
                "                    <td class=\"pl20\" >北京</td>\n" +
                "                </tr>\n" +
                "                <tr>\n" +
                "                    <td width=\"10%\" class=\"rh40\">创建时间：</td>\n" +
                "                    <td class=\"pl20\" id=\"server_createtime\">" + creatTime + "</td>\n" +
                "                    <td width=\"10%\" align=\"right\">修改时间：</td>\n" +
                "                    <td class=\"pl20\" id=\"server_updatetime\">" + updateTime + "</td>\n" +
                "                </tr>\n" +
                "                <tr>\n" +
                "                    <td width=\"10%\" class=\"rh40\">信息描述：</td>\n" +
                "                    <td width=\"40%\" class=\"pl20\" id=\"server_description\">" + ser.serverDescription + "</td>\n" +
                "                    <td></td>\n" +
                "                    <td></td>\n" +
                "                </tr>\n" +
                "            </table>\n" +
                "        </div>\n" +
                "    <input type=\"hidden\" id=\"server_id\" value='" + ser.id + "'>");
            layui.element.render('breadcrumb');
            layer.close(index);
        }
    });
}


/*新建服务*/
function addServer() {
    layer.open({
        type: 2,
        title: "新建服务",
        maxmin: true,
        shadeClose: true,
        content: [ctx+'/serverForm', "no"],
        area: ['600px', '400px'],
        offset: '100px'
    });
}

/*更新服务信息*/
// function upServer() {
//     layer.open({
//         type: 1,
//         title: "修改服务",
//         offset: 'rt',
//         anim: 1,
//         shadeClose: true,
//         content: " <table width=\"100%\" class=\"baseMsg_tab\">\n" +
//         "                <tr>\n" +
//         "                    <td width=\"30%\" class=\"rh40\">服务名称：</td>\n" +
//         "                    <td class=\"pl20\">"+parent.$("#server_name").html()+"</td>\n" +
//         "                </tr>\n" +
//         "                <tr>\n" +
//         "                    <td class=\"rh40\">所在区域：</td>\n" +
//         "                    <td class=\"pl20\">北京</td>\n" +
//         "                </tr>\n" +
//         "                <tr>\n" +
//         "                    <td class=\"rh40\">创建时间：</td>\n" +
//         "                    <td class=\"pl20\">"+parent.$("#server_createtime").html()+"</td>\n" +
//         "                </tr>\n" +
//         "                <tr>\n" +
//         "                    <td class=\"rh40\">修改时间：</td>\n" +
//         "                    <td class=\"pl20\">"+parent.$("#server_updatetime").html()+"</td>\n" +
//         "                </tr>\n" +
//         "                <tr>\n" +
//         "                    <td valign=\"top\" class=\"rh40\">功能描述：</td>\n" +
//         "                    <td class=\"pl20\"><textarea rows=\"9\" cols=\"40\" style=\"resize: none\">"+parent.$("#server_description").html()+"</textarea></td>\n" +
//         "                </tr>\n" +
//         "            </table>",
//         area:["30%","100%"]
//     });
// }



