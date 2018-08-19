function Test() {
  this.param = 3;
  this.setVal = function() {
    this.param = 5;
    var c = this.param;
    return function(newVal) {
      var returnVal = c + newVal;
      console.log(returnVal);
    }
  }
}
obj = new Test();
displayNewValue = obj.setVal();
displayNewValue(4);
