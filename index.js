function $rebuild1(_configItem){
	var configItemName = _configItem.match(grammar3)[1]
	var configItem = _configItem.match(grammar2);
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

function $rebuild2(_configItem){
	var item = _configItem.split(">");
	var configItemName = item[0]
	var configItem = item[1].split(" ").filter(function(_value){
		return !!_value
	});
	return {
		[configItemName]: configItem.map(_key=>{
			if(/:/.test(_key)){
				var key = _key.split(":");
				return {
					[key[0]]: key[1]
				}
			}else{
				return {
					[_key]: _key
				}
			};
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

const grammar1 = require("./utils/grammar").grammar1
const grammar2 = require("./utils/grammar").grammar2
const grammar3 = require("./utils/grammar").grammar3
const grammar4 = require("./utils/grammar").grammar4

module.exports = function $read(_dir,_mode){
	var {resolve} = require("path");
	var {readFileSync} = require("fs");
	try{
		var profile = readFileSync(resolve(process.cwd(),_dir),"utf8")
	}catch{
		// 如果没有配置文件
		var profile = ""
	};
	if(_mode==="ajax"){
		let ajax = require("./ajax")
		// 转换
		return ajax.create($finish((profile.match(grammar4)||[]).map($rebuild2)))
	}else{
		// 转换
		return $finish((profile.match(grammar1)||[]).map($rebuild1))
	}
}