/**
 * 语法模型
 * [name]
 * key=value
 * key=value
 * ====>
 * [[name]key=value key=value]
 */
exports.grammar1 = /\[\w+\](\s+\w+=.+){1,}/g
/**
 * 语法模型
 * key=value
 * ===》
 * [key=value]
 */
exports.grammar2 = /(?!\s)(\w+\=.+)/g
/**
 * [name]
 * ===>
 * name
 */
exports.grammar3 = /\[(\w+)\]/
/**
 * name>key key 
 */
exports.grammar4 = /\w+\>(\w+:?\w+\x20{0,}){1,}/g
