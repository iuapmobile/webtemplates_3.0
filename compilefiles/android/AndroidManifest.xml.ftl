<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="${package_name}"
    android:versionCode="1"
    android:versionName="1" >

    <uses-sdk
        android:minSdkVersion="${min_sdk_version}"
        android:targetSdkVersion="17" />

    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS" />
    <uses-permission android:name="android.permission.CALL_PHONE" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.GET_TASKS" />
    <uses-permission android:name="android.permission.RESTART_PACKAGES" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />

    <permission
        android:name="com.yonyou.uap.um.widget.permission.MAPS_RECEIVE"
        android:protectionLevel="signature" />

    <uses-permission android:name="com.yonyou.uap.um.widget.permission.MAPS_RECEIVE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="com.google.android.providers.gsf.permission.READ_GSERVICES" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.WRITE_SETTINGS" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="com.asiainfo.cm10085.IDENTITY_AUTHENTICATION" />

    <!--
    <supports-screens
        android:anyDensity="false"
        android:xlargeScreens="true"
        android:largeScreens="true"
        android:normalScreens="true"
        android:resizeable="true"
        android:smallScreens="true" />
    -->

    <application
        android:name="com.yonyou.uap.um.core.UAPMobileApplication"
        android:allowBackup="true"
        android:icon="@drawable/${icon}"
        android:label="@string/${app_name}"
        android:theme="@style/AppTheme" >
        <activity
            android:name="com.yonyou.uap.um.activity.WelcomeActivity"
            android:screenOrientation="portrait"
            android:theme="@android:style/Theme.Black.NoTitleBar.Fullscreen" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
            <intent-filter>
                <action android:name="com.yonyou.uap.um.activity.WelcomeActivity" />

                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </activity>
        <activity android:name="${package_name}.MainActivity" >
            <intent-filter>
                <action android:name="${package_name}.MainActivity" />

                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </activity>
        <activity android:name="com.yonyou.uap.um.control.UMTwoDCodeActivity" >
            <intent-filter>
                <action android:name="com.yonyou.uap.um.control.UMTwoDCode" />

                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </activity>
        <activity android:name="com.yonyou.uap.um.control.UMCameraActivity" >
            <intent-filter>
                <action android:name="com.yonyou.uap.um.control.UMCamera" />

                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </activity>
        <activity android:name="com.yonyou.uap.um.control.UMMapActivity" >
            <intent-filter>
                <action android:name="com.yonyou.uap.um.control.UMMap" />

                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </activity>
        <activity android:name="com.yonyou.uap.um.runtime.ExtraMapActivity" >
        </activity>
        <!--
        push setting
		<receiver android:name="com.yonyou.uap.um.push.BootBroadcastReceiver" >
            <intent-filter>
                <action android:name="android.intent.action.BOOT_COMPLETED" />
                <category android:name="android.intent.category.HOME" />
            </intent-filter>
        </receiver>
        <service
            android:name="com.yonyou.uap.um.push.SpiritNotificationService"
            android:enabled="true"
            android:label="push" >
            <intent-filter>
                <action android:name="com.yonyou.uap.um.push.SpiritNotificationService" />
            </intent-filter>
        </service>
 		push setting end
        -->
        <meta-data
            android:name="uaplauncher"
            android:value="${package_name}.MainActivity" />
        <meta-data
            android:name="useuapwelcome"
            android:value="true" />
        <meta-data
            android:name="autocheckupdate"
            android:value="false" />

        <!-- application configure metadata -->
        <meta-data
            android:name="push_server_mang"
            android:value="http://xiaoxi.yonyou.com:80/manage/proxyservice" />
        <meta-data
            android:name="com.amap.api.v2.apikey"
            android:value="" />
        <meta-data
            android:name="push_companypwd"
            android:value="" />
        <meta-data
            android:name="key.alias"
            android:value="" />
        <meta-data
            android:name="key.store.password"
            android:value="" />
        <meta-data
            android:name="push_appid"
            android:value="" />
        <meta-data
            android:name="key.alias.password"
            android:value="" />
        <meta-data
            android:name="key.store"
            android:value="" />
        <meta-data
            android:name="push_companyid"
            android:value="" />
        <meta-data
            android:name="mapkey"
            android:value="" />
        <meta-data
            android:name="push_server_msg"
            android:value="http://xiaoxi.yonyou.com:8080/manage/proxyservice" />
        <meta-data
            android:name="mapsdk"
            android:value="gaode" />
    </application>

</manifest>