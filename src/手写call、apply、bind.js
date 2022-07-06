function myCall(context, ...args) {
  if (!context || context == null) {
    context = window;
  }
  let fn = Symbol();
  context[fn] = this;
  return context[fn](...args);
}
Function.prototype.myCall = myCall;

Function.prototype.myApply = function (context, args) {
  if (!context || context == null) {
    context = window;
  }
  let fn = Symbol();
  context[fn] = this;
  return context[fn](...args);
};

// bind手写

Function.prototype.myBind = function () {
  if (typeof this !== "function") {
    throw new Error("bind must be called on a function");
  }
  let _this = this;
  let context = arguments[0];
  let args = [].slice.call(arguments, 1);
  let fn = function () {
    args = args.concat([].slice.call(arguments, 1));
    // 判断是否是用new 调用的
    context = this instanceof _this ? this : context;
    return _this.apply(context, args);
  };
  fn.prototype = Object.create(_this.prototype)
  return fn;
};

// 测试
let obj = {
  name: "test",
};

function getName() {
  console.log(this.name);
}

getName.myCall(obj);
getName();
