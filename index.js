
export default class Event {
    constructor() {
        this.hash = {}
    }
    $on(eventName, func) {
        this.hash[eventName] ?
            this.hash[eventName].push(func):
            this.hash[eventName] = [func];
    }

    $off(eventName, func) {
        if(this.hash[eventName]){
            let i = this.hash[eventName].indexOf(func);
            i!==-1 && this.hash[eventName].splice(i,1)
        }

    }

    $emit(eventName, ...params) {
        if(this.hash[eventName])
            for (let i = 0; i < this.hash[eventName].length; i++) {
                let func = this.hash[eventName][i];
                if (func) {
                    func(...params);
                    this.hash[eventName][i] !== func && i--
                }
            }
    }

};