function newObjType() {
  this.val = 3;
  newObjType.myObjectCounter++;
}
newObjType.myObjectCounter = 4;
obj1 = new newObjType();
obj2 = new newObjType();
obj3 = new newObjType();
newObjType.myObjectCounter--;
console.log(newObjType.myObjectCounter);
