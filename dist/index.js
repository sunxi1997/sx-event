const err = (errCode, errMsg) => ({errCode, errMsg});

export default class Event {
   constructor() {
      this.hash = {}
   }

   /**
    * @method  $on - 绑定一个事件回调
    *
    * @param {String} eventName - 要监听的事件名称
    * @param {Function} func   -  要绑定的回调函数
    *
    * @return Object
    */
   $on(eventName, func) {
      // 参数验证
      if (typeof eventName !== 'string')
         return err(1, '第一个参数（事件名称）必须为 string')
      else if (typeof func !== 'function')
         return err(1, '第二个参数（回调函数）必须为 function')
      this.hash[eventName] ?
         this.hash[eventName].push(func) :
         this.hash[eventName] = [func];
      return err(0, `为${eventName}绑定了一个回调,${eventName} 事件当前回调总数：${this.hash[eventName].length}`)
   }

   /**
    * @method $off - 取消一个事件的指定回调
    *
    * @param {String} eventName - 已监听的事件名称
    * @param {Function} func   -  要取消的回调函数
    *
    * @return Object
    */
   $off(eventName, func) {
      // 参数验证
      if (typeof eventName !== 'string')
         return err(1, '第一个参数（事件名称）必须为 string')
      else if (typeof func !== 'function')
         return err(1, '第二个参数（回调函数）必须为 function')
      // 移除监听
      if (this.hash[eventName]) {
         let i = this.hash[eventName].indexOf(func);
         i !== -1 && this.hash[eventName].splice(i, 1);
         return i !== -1 ?
            err(0, `为${eventName}事件移除一个监听`) :
            err(3, `${eventName}事件回调中没有此函数`);
      } else
      // 事件不存在
         return err(2, `没有找到${eventName}事件`)
   }

   /**
    * @method $emit
    *
    * @param {String} eventName - 要触发的事件名称
    * @param params   -  触发时传递给回调函数的参数
    *
    * @return Object
    */
   $emit(eventName, ...params) {
      // 参数验证
      if (typeof eventName !== 'string')
         return err(1, '第一个参数（事件名称）必须为 string')
      if (this.hash[eventName]) {
         let i = 0;
         for (; i < this.hash[eventName].length; i++) {
            let func = this.hash[eventName][i];
            if (func) {
               func(...params);
               this.hash[eventName][i] !== func && i--
            }
         }
         return err(0, `${eventName}事件完成，共触发${i}个回调`);
      } else
      // 事件不存在
         return err(2, `没有找到${eventName}事件`)
   }

   /**
    * @method  $once - 绑定一个一次性的事件回调
    *
    * @param {String} eventName - 要监听的事件名称
    * @param {Function} func   -  要绑定的回调函数
    *
    * @return Object
    */
   $once(eventName, func) {
      // 参数验证
      if (typeof eventName !== 'string')
         return err(1, '第一个参数（事件名称）必须为 string')
      else if (typeof func !== 'function')
         return err(1, '第二个参数（回调函数）必须为 function')


      let callback = ()=>{
         func.call(this);
         this.$off(eventName,callback);
         eventName=null;
         callback=null;
         func=null;
      };
      
      this.$on(eventName,callback)

      return err(0, `为${eventName}绑定了一个一次性回调,${eventName} 事件当前回调总数：${this.hash[eventName].length}`)
   }

};