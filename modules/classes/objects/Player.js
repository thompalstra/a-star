export class Player extends GameObject{

  constructor( options ){
    super();
    this.path = [];
    this.automated = false;

    for( var i in options ){
      this[ i ] = options[ i ];
    }

    this.speed = .10;

    this.data = {
      health: 100,
      armor: [
        10, // head
        10, // torso
        10, // legs
        10 // feet
      ],
      dangerLevel: 100,
    };
  }

  draw(){
    this.Map.ctx.beginPath();
    this.Map.ctx.rect( this.pos.x * TileWidth, this.pos.y * TileHeight, TileWidth, TileHeight );
    this.Map.ctx.fillStyle = "orange";
    this.Map.ctx.fill();
    this.Map.ctx.closePath();
  }

  setTarget( target ){
    this.target = target;
  }
  getTarget(){
    if( this.target ){
      return this.target;
    }
    return false;
  }
  updateTargetCoords(){
    this.path = PathTracking(
      this.Map.TileSet.path,
      [ parseInt( this.pos.x ), parseInt( this.pos.y ) ],
      [ parseInt( this.target.pos.x ), parseInt( this.target.pos.y ) ] );
    this.path.shift();
  }
  updateTarget(){
    if( this.target ){
      this.updateTargetCoords();
    }
  }
  updatePosition(){
    if( this.path.length > 0 ){
      this.updatePositionCoords();
    }
  }
  update(){
    this.updateTarget();
    this.updatePosition();
  }
}
window.Player = Player;
