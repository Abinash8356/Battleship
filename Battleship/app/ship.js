export default function Ship(length, name) {
  this.length = length;
  this.name = name;
  this.hit = [];
  this.hitF = (x, y) => {
    const hitPosition = [x, y];
    this.hit.push(hitPosition);
    return this.hit;
  };
  this.isSunk = () => {
    if (length === this.hit.length) {
      return true;
    }
    return false;
  };
}
