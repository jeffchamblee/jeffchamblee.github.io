function Animal(type) {
  this.getMessage = function() {
    return "animal";
  };
  if (type == 'wolf') {
    this.getMessage = function() {
      return "wolf";
    };
  }
}
obj = new Animal();
console.log(obj.getMessage());
