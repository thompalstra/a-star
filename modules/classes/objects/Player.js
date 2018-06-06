export class Player extends GameObject{

  constructor(){
    super();
    this.path = [];
    this.pos.x = 0;
    this.pos.y = 0;
    this.false = true;

  }

  draw(){
    this.Map.ctx.fillStyle = "orange";
    if( this.path.length > 0 ){

      this.pos = {
        x: this.path[0][0],
        y: this.path[0][1]
      };

      this.path.shift();
    }
    this.Map.ctx.fillRect( ( this.pos.x * tileWidth ), ( this.pos.y * tileHeight ), tileHeight, tileWidth );
  }
  move( event ){
    var tileX = parseInt( event.offsetX / tileWidth ).toFixed(0);
    var tileY = parseInt( event.offsetY / tileHeight ).toFixed(0);

    if( this.Map.getPath( tileX, tileY ) !== 1 ){
      tileX = parseInt( tileX );
      tileY = parseInt( tileY );
      this.pos.x = parseInt( this.pos.x );
      this.pos.y = parseInt( this.pos.y );
      this.path = PathTracking( this.Map.tileset.path, [ this.pos.x, this.pos.y ], [ tileX, tileY ] );
    }
  }
}
window.Player = Player;
