<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/1/23 0023
  Time: 16:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="layui/css/layui.css"/>
    <script src="layui/layui.js"></script>
    <script src="js/jq.js"></script>
    <script src="js/server.js"></script>
    <%String path=request.getContextPath(); %>
    <script type="text/javascript">
        var ctx = "<%=path%>";
    </script>
    <style>
        #main {
            position: relative;
            top: 30px;
            width: 450px;
            margin: auto;
        }
    </style>
</head>
<body>
<div id="main">
    <form class="layui-form" action="">
        <div class="layui-form-item">
            <label class="layui-form-label"><font color="red">*</font>服务名称</label>
            <div class="layui-input-block">
                <input type="text" name="serverName" lay-verify="required|serverName" placeholder="请输入服务名称" autocomplete="off"
                       class="layui-input" style="width: 347px;">
            </div>
        </div>
        <div class="layui-form-label"></div>
        <div class="layui-form-mid">
  	<pre style="color: #8D8D8D;">
1. 只能包含字母、数字、下划线和中划线
2. 不能以数字、中划线开头
3. 长度限制在1-128之间</pre>
        </div>
        <div class="layui-form-item layui-form-text">
            <label class="layui-form-label">功能描述</label>
            <div class="layui-input-block">
                <textarea name="serverDescription" placeholder="请输入服务描述" class="layui-textarea"
                          style="width: 347px;resize: none;"></textarea>
            </div>
        </div>
        <!--<div class="layui-form-item">
          <label class="layui-form-label">开关</label>
          <div class="layui-input-block">
            <input type="checkbox" name="switch" lay-skin="switch">
          </div>
        </div>-->
        <div class="layui-form-item">
            <div class="layui-input-block">
                <button class="layui-btn" lay-submit lay-filter="formDemo">确定</button>
                <button id="cancel" class="layui-btn layui-btn-primary">取消</button>
            </div>
        </div>
    </form>
</div>

<script>
    var index = parent.layer.getFrameIndex(window.name);
    
    layui.use('form', function () {
        var form = layui.form;
        //自定义验证
        form.verify({
            serverName: function (value, item) {
                if(!new RegExp("^[a-zA-Z_][a-zA-Z0-9_]{0,128}$").test(value)) return '只能包含字母、数字、下划线和中划线， 不能以数字、中划线开头，最大长度为128';
            }
        });
        //监听提交
        form.on('submit(formDemo)', function (data) {
            $.ajax({
                url: parent.ctx + '/server/save',
                type: 'POST',
                data: {serverName: data.field.serverName, serverDescription: data.field.serverDescription},
                async: false,
                dataType: 'json',
                success: function (data1) {
                    if (data1.code == 200) {
                        parent.layer.msg("添加成功", {
                            icon: 1,
                            time: 1000 //2秒关闭（如果不配置，默认是3秒）
                        });
                        if(parent.$("#code").length==0) parent.$("#list").html(loadServer());
                        else parent.$("#serverList").append("<option value=\""+data1.id+"\">"+data.field.serverName+"</option>\n");
                        parent.layui.form.render('select');
                        parent.layer.close(index);
                    } else if (data1.code == 100) {
                        layer.open({title: "错误", content: "该名称已存在"});
                    }
                }
            });
            return false;
        });
    });
    $("#cancel").click(function () {
        parent.layer.close(index);
    });
</script>
</body>
</html>
