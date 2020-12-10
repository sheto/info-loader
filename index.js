function $rebuild(_configItem){
	console.log(arguments)
	var configItemName = _configItem.match(/\[(\w+)\]/)[1]
	var configItem = _configItem.match(/(?!\s)(\w+\=.+)/g);
	return {
		[configItemName]: configItem.map(_item=>{
			let item = _item.split("=");
			let raw = item[1]
			// 转换成数组
			if(/\,/.test(raw)){
				var value = raw.split(",")
			}
			// 转换成布尔
			else if(raw === "false"||raw === "true"){
				var value = raw === "false"?false:true
			}
			else{
				var value = raw
			}
			return {
				[item[0]]: value
			}
		})
	}
};

function $finish(_profile){
	if(_profile){
		let profile = {};
		let $array2object = function(_item){
			let name = Object.keys(_item)[0]
			let profileDetails = {}
			// 切除链接
			// 模式一：递归结构
			// profile[name] = Array.isArray(_item[name])?$finish(_item[name]):JSON.parse(JSON.stringify(_item[name]))
			// 模式二：扁平结构
			_item[name].forEach(function(_detail){
				let name = Object.keys(_detail)[0]
				profileDetails[name] = _detail[name]
			})
			profile[name] = profileDetails
		};
		_profile.forEach($array2object)
		return profile;
	}else{
		return {}
	}
}

module.exports = function $read(_dir){
	let {resolve} = require("path");
	let {readFileSync} = require("fs");
	let profile;
	try{
		profile = readFileSync(resolve(process.cwd(),_dir),"utf8")
	}catch{
		// 如果没有配置文件
		profile = ""
	};
	return $finish((profile.match(/\[\w+\](\s+\w+=.+){1,}/g)||[]).map($rebuild))
}