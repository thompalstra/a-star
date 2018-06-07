export class Tile{

  constructor(){
    this.path = [];
    this.pos.x = 0;
    this.pos.y = 0;
  }

  static draw( ctx, tile, x, y ){

    var posX = ( x * TileWidth );
    var posY = ( y * TileHeight );

    if( typeof tile["stroke"] !== "undefined" ){
      ctx.beginPath();
      ctx.rect( posX, posY, TileWidth, TileHeight );
      ctx.strokeColor = tile["stroke"];
      ctx.stroke();
      ctx.closePath();
    }

    if( typeof tile["fill"] !== "undefined" ){
      ctx.beginPath();
      ctx.rect( posX, posY, TileWidth, TileHeight );
      ctx.fillStyle = tile["fill"];
      ctx.fill();
      ctx.closePath();
    }
  }
}


window.Tile = Tile;
