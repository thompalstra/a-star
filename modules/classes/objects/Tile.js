export class Tile extends GameObject{

  constructor(){
    super();
    this.path = [];
    this.pos.x = 0;
    this.pos.y = 0;
  }
  static find( tile ){
    return {
      0: {
        // stroke: "black",
        fill: "green"
      },
      1: {
        fill: "blue",
      },
      3: {
        fill: "gray",
      }
    }[ tile ];
  }
  static draw( ctx, tile, x, y ){
    var params = Tile.find( tile );
    if( typeof params["stroke"] !== "undefined" ){
      ctx.beginPath();
      ctx.rect( x, y, tileWidth, tileHeight );
      ctx.strokeColor = params["stroke"];
      ctx.stroke();
      ctx.closePath();
    }

    if( typeof params["fill"] !== "undefined" ){
      ctx.beginPath();
      ctx.rect( x, y, tileWidth, tileHeight );
      ctx.fillStyle = params["fill"];
      ctx.fill();
      ctx.closePath();
    }
  }
}


window.Tile = Tile;
