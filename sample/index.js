const NodeProfileLoader = require("../index");
const Profile = NodeProfileLoader("project.profile")
// 打印
console.log(`node:\r${Profile}`)
// 使用webpack注入项目
if(webpack){
	new webpack.DefinePlugin({
		"profile": JSON.stringify(NodeProfileLoader("project.profile").webpack)
	})
}