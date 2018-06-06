export class GameObject{
  constructor( data ){

    this.pos = {
      x: undefined,
      y: undefined
    };

    for( var i in data ){
      this[i] = data[i];
    }
  }
  create( data ){

  }
  getPosition(){
    return this.pos;
  }
}
window.GameObject = GameObject;
