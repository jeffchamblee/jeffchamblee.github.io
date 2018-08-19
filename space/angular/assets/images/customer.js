function Customer(name, location) {
  this.name = name;
  this.location = location;
  this.showName = function() {
    alert('Hello I\'m ' + this.name);
  }
  this.showLocation = function() {
    alert('I live in ' + this.location);
  }
  alert("Object is created");
}

customer = new Customer("Diego", "Juarez");
customer.showName();
customer.showLocation();
customer.name = "Jose";
