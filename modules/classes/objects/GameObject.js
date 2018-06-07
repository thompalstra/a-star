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
  setTeam( id ){
    this.team = this.Map.getTeam( id );
  }
  getTeam(){
    return this.team;
  }
}
window.GameObject = GameObject;
