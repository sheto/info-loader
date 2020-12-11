const NodeProfileLoader = require("../index");
// const Profile = NodeProfileLoader("project.profile")
const Ajax = NodeProfileLoader("project.ajax","ajax")
// 读取配置模式打印
// console.log(`配置模式:\r${Profile}`)
// console.log(`请求模式:\r${Ajax}`)
let user = Ajax.register("user")
console.log(user())
// 使用webpack注入项目
/* if(!!webpack){
	new webpack.DefinePlugin({
		"profile": JSON.stringify(NodeProfileLoader("project.profile").webpack)
	})
} */