<center>配置文件加载器</center>
<center>v1.0.0</center>

## 使用说明
配置文件加载器，将配置解析成对象格式，方便调用.
文件的根目录是当前项目的根目录

### 步骤1：安装
```shell
npm install @sheto/node-profile-loader -S
```
### 步骤2：创建配置文件
不限制配置文件名字跟文件类型，因为会统统解析成字符串
<pre>
[配置1]
配置名=配置值
配置名=配置值

[配置2]
配置名=配置值
配置名=配置值
</pre>

### 步骤3：调用
```javascript
profile.配置1.配置名
```