export class Player extends GameObject{

  constructor(){
    super();
    this.path = [];
    this.pos.x = 0;
    this.pos.y = 0;
    this.false = true;

  }

  draw(){
    if( this.path.length > 0 ){
      this.pos = {
        x: this.path[0][0],
        y: this.path[0][1]
      };
      this.path.shift();
    }
    this.Map.ctx.beginPath();
    this.Map.ctx.rect( this.pos.x, this.pos.y, TileWidth, TileHeight );
    this.Map.ctx.fillStyle = "orange";
    this.Map.ctx.fill();
    this.Map.ctx.closePath();
  }
  move( event ){
    var tileX = parseInt( event.offsetX / TileWidth ).toFixed(0);
    var tileY = parseInt( event.offsetY / TileHeight ).toFixed(0);

    if( this.Map.getPath( tileX, tileY ) !== 1 ){
      tileX = parseInt( tileX );
      tileY = parseInt( tileY );
      this.pos.x = parseInt( this.pos.x );
      this.pos.y = parseInt( this.pos.y );

      this.path = PathTracking( this.Map.TileSet.path, [ this.pos.x, this.pos.y ], [ tileX, tileY ] );
      this.path.shift();
    }
  }
}
window.Player = Player;
