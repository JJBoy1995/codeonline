/*编辑器配置*/
//根据DOM元素的id构造出一个编辑器

/*添加方法*/
$(document).ready(function () {
$('#add').click(function () {
    var code = editor.getValue();
    var name = $('#name').val();
    if (checkName() && checkCode() && checkEvent()) {
        var attrs_Name = [];
        $("input[name='attrName']").each(function () {
            attrs_Name.push($(this).val());
        });
        var attrs_Type = [];
        $("select[name='attrType']").each(function () {
            attrs_Type.push($(this).val());
        });
        $.ajax({
            url: ctx + '/addFunction',
            type: 'POST',
            data: {
                function_code: code,
                function_name: name,
                attrs_name: attrs_Name,
                attrs_type: attrs_Type
            },
            traditional: true,
            async: false,
            success: function (data) {
                $("#back").val(data);
            }
        });
    }
});
/*重置输入*/
$("#reset").click(function () {
    editor.setValue("");
    $("#back").val("");
    $('#name').val("");
    delTr($("#attrTable"));
});
/*查询方法*/
$('#sel').click(function () {
    var name = $("#name").val();
    var table = $("#attrTable");
    if (checkName()) {
        $.ajax({
            url: ctx + '/selFunction',
            type: 'POST',
            data: {function_name: name},
            async: false,
            dataType: "json",
            success: function (data) {
                delTr(table);
                if (data != null) {
                    $("#back").val(data.fc_code);
                    table.find("tr").find("th").last().html("属性值");
                    table.show();
                    var dd = $.parseJSON(data.fc_attrs);
                    if (dd != null) {
                        for (var item in dd) {
                            var index = table.find("tr").length;
                            table.append("\n" +
                                "                    <tr id='tr" + index + "'>\n" +
                                "                        <td><input class=\"attrs\" name=\"attrName\" id=\"attrName" + index + "\" type=\"text\" value='" + item + "' readonly='readonly'></td>\n" +
                                "                        <td><input class=\"attrs\" name=\"attrType\" id=\"attrType" + index + "\" type=\"text\" value='" + dd[item] + "' readonly='readonly'></td>\n" +
                                "                        <td><input class='attrs' name='attrValue' id='attrValue" + index + "' type='text' placeholder='注意数据类型' ></td>\n" +
                                "                    </tr>");
                        }
                    } else {
                        table.append("<tr id='noExists'><td colspan='3' align='center'>该方法没有配置参数</td></tr>")
                    }
                } else {
                    $("#back").val("该方法不存在");
                }
            }
        });
    }
});
/*运行方法*/
$("#run").click(function () {
    var name = $('#name').val();
    var attrs_Value = [];
    $("input[name='attrValue']").each(function () {
        attrs_Value.push($(this).val());
    });
    $.ajax({
        url: ctx + '/runFunction',
        type: 'POST',
        data: {
            function_name: name,
            attrs_value: attrs_Value
        },
        traditional: true,
        async: false,
        success: function (data) {
            $("#back").val(data);
        }
    });
});
/*新增参数*/
$('#addEvent').click(function () {
    if (checkName()) {
        var table = $("#attrTable");
        table.find("tr").each(function () {
            if ($(this).attr("id") == "noExists") {
                $(this).remove();
            }
        });
        table.find("tr").find("th").last().html("");
        table.show();
        var trId = table.find("tr").last().attr("id");
        var index = table.find("tr").length;
        if (checkEvent()) {
            table.append("\n" +
                "                    <tr id='tr" + index + "'>\n" +
                "                        <td><input class=\"attrs\" name=\"attrName\" id=\"attrName" + index + "\" type=\"text\" placeholder=\"建议首字母小写\" width=\"50\"></td>\n" +
                "                        <td align=\"center\"><select name=\"attrType\" id=\"attrType" + index + "\">\n" +
                "                            <option value=\"byte\">byte</option>\n" +
                "                            <option value=\"short\">short</option>\n" +
                "                            <option value=\"int\">int</option>\n" +
                "                            <option value=\"float\">float</option>\n" +
                "                            <option value=\"double\">double</option>\n" +
                "                            <option value=\"long\">long</option>\n" +
                "                            <option value=\"boolean\">boolean</option>\n" +
                "                            <option value=\"String\" selected='selected'>String</option>\n" +
                "                        </select></td>\n" +
                "                        <td id='tdb" + index + "'><img src=\"/pic/delete.png\" height=\"30\" onclick='delEvent(" + index + ")'></td>\n" +
                "                    </tr>");
        }
    }
});


})
/*快速生成代码*/
function code() {
    if (checkName()) {
        var fcName = $("#name").val();
        editor.setValue("public void " + fcName + "(" + fcName + " e){" +
            "\n     System.out.println(\"Hello World!!!\");" +
            "\n}")
    }
}

/*删除一行参数*/
function delEvent(a) {
    $("#tr" + a).remove();
    if ($("#attrTable").find("tr").length == 1) {
        $("#attrTable").hide();
    }
}

/*检查参数是否为空*/
function checkEvent() {
    var input = $("#attrTable").find("tr").find("td").find("input");
    var flag = true;
    if (input != null) {
        for (var i = 0; i < input.length; i++) {
            if (input[i].value == "" || input[i].value == null) {
                flag = false;
                alert("请完善参数信息");
                break;
            }
        }
    }
    return flag;
}

/*校验方法名*/
function checkName() {
    var flag = true;
    var fcName = $("#name").val();
    if (fcName == null || fcName == "") {
        alert("请输入方法名");
        $("#name").focus();
        flag = false;
    }
    return flag;
}

/*校验代码*/
function checkCode() {
    var flag = true;
    var code = editor.getValue();
    if (code == null || code == "") {
        alert("请填写代码");
        $("#code").focus();
        flag = false;
    }
    return flag;
}

/*删除动态生成的行*/
function delTr(table) {
    table.find("tr").each(function () {
        if ($(this).attr('id') != "attrTableHead") {
            $(this).remove();
        }
    });
    table.hide();
}

/*方法名变更，更改代码中相应区域*/
function checkFC(a) {
    var name = a.value;
    // if (checkName()) {
    //     var code = $("#code").val();
    //     if (code!=null||code!="") {
    //     code.dele
    //     }
    // }
}