const NodeProfileLoader = require("../index");
// node中使用
NodeProfileLoader("project.profile").node.name
// 使用webpack注入项目
new webpack.DefinePlugin({
	"profile": JSON.stringify(NodeProfileLoader("project.profile").webpack)
})