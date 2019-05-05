# event 类

# 方法列表

### $on

````

 @param {String} eventName - 要监听的事件名称
 @param {Function} func   -  要绑定的回调函数
 
 @return {Object} errData
 
````
返回errCode说明

  errCode | 说明
 ---|---  
  0 | 正常 
  1 | 参数类型错误 

### $off

 ````
 @param {String} eventName - 要监听的事件名称
 @param {Function} func   -  要绑定的回调函数
 
 @return {Object} errData
 ````
 返回errCode说明
 
   errCode | 说明
  ---|---  
   0 | 正常 
   1 | 参数类型错误 
   2 | 事件不存在 
   3 | 事件回调列表中不包含该回调 


### $emit
````
@param {String} eventName - 要触发的事件名称
@param params   -  触发时传递给回调函数的参数

@return Object
````
 返回errCode说明
 
   errCode | 说明
  ---|---  
   0 | 正常 
   1 | 参数类型错误 
   2 | 事件不存在 
