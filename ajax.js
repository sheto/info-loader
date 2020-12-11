function $Ajax(_name){
	return $Ajax.group[_name]
}

$Ajax.create = function(_group){
	this.group = {}
	for(var name in _group){
		this.group[name] = JSON.parse(JSON.stringify(_group[name]))
	};
	return this;
}

$Ajax.register = function(_name){
	let ajax = function(_name){
		let data = {}
		if(typeof _name === "string"){
			return ajax.storage[_name];
		}else if(Object.prototype.toString.call(_name) === "[object Object]"){
			for(var name in _name){
				if(ajax(name)){
					data[ajax.storage[name]] = JSON.parse(JSON.stringify(_name[name]))
				}
			};
		}else{
			for(var name in ajax.storage){
				data[ajax.storage[name]] = void(0)
			};
		}
		return data
	}
	// 添加储存
	ajax.storage= {}

	let cache = this.group[_name]
	for(var name in cache){
		ajax.storage[name] = cache[name]
	};
	return ajax;
}

module.exports = $Ajax