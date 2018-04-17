package com.bonc.javaonline.constant;

/**
 * @Author: songjiajun
 * @Description:
 * @Date:2018-01-23 14:14
 */
public final class BaseConstant {
    /**
     * 成功的返回码
     */
    public static final int STATE_SUCCESS = 200;

    /**
     * 重复的返回码
     */
    public static final int STATE_CHONGFU = 100;

    /**
     * 更新确认
     */
    public static final int STATE_CONFIRM = 150;

    /**
     * 空值
     */
    public static final int STATE_NULL = 180;

    /**
     * 失败的返回码
     */
    public static final int STATE_FAILED = 500;

    /**
     * 404找不到
     */
    public static final int STATE_NOFOUND = 404;

    /**
     * object
     */
    public static final String TYPE_OBJECT = "object";

    /**
     * array
     */
    public static final String TYPE_ARRAY = "array";

    /**
     * 构造方法
     */
    private BaseConstant() {

    }
}
