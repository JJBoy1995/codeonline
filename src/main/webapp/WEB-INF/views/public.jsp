<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%String path=request.getContextPath(); %>
<script type="text/javascript">
    var ctx = "<%=path%>";
</script>
<!-- 添加layui支持-->
<link rel="stylesheet" href="layui/css/layui.css">
<script src="layui/layui.js"></script>
<script src="js/jq.js"></script>

<!--CodeMirror核心文件-->
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

<!-- 自定义js文件-->
<script src="js/server.js"></script>
<script src="js/function.js"></script>