public class ${fcName}{
<#if attrs??>
    <#list attrs as map>
    private ${map.attrType}  ${map.attrName};
    </#list>

    <#list attrs as map>
    public void set${map.attrName?cap_first}(${map.attrType} ${map.attrName}){
        this.${map.attrName} = ${map.attrName};
    }
    public ${map.attrType} get${map.attrName?cap_first}(){
        return this.${map.attrName};
    }

    </#list>
    public ${fcName}(){}

    public ${fcName}(<#list attrs as map><#if map_has_next>${map.attrType} ${map.attrName},<#else>${map.attrType} ${map.attrName}</#if></#list>){
    <#list attrs as map>
    this.${map.attrName}=${map.attrName};
    </#list>
    }
</#if>
    ${fcCode}

    public static void main(String[] args){
<#if attrs??>
    <#list attrs as map>
        <#switch  map.attrType>
            <#case "String">
                    String a${map_index} =  args[${map_index}];
                <#break>
            <#case "short">
                    short a${map_index} =  Short.parseShort(args[${map_index}]);
                <#break>
            <#case "byte">
                    byte a${map_index} =   Byte.parseByte(args[${map_index}]);
                <#break>
            <#case "int">
                    int a${map_index} =  Integer.parseInt(args[${map_index}]);
                <#break>
            <#case "float">
                    float a${map_index} =  Float.parseFloat(args[${map_index}]);
                <#break>
            <#case "double">
                    double a${map_index} =  Double.parseDouble(args[${map_index}]);
                <#break>
            <#case "long">
                    long a${map_index} =  Long.parseLong(args[${map_index}]);
                <#break>
            <#case "boolean">
                    boolean a${map_index} =  Boolean.parseBoolean(args[${map_index}]);
                <#break>
        </#switch>
    </#list>
</#if>
                    ${fcName}  e = new ${fcName}(<#if attrs??><#list attrs as map><#if map_has_next>a${map_index},<#else>a${map_index}</#if></#list></#if>);
                    e.${fcName}(e);
}
}