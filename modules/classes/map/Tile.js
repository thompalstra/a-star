export class Tile{

  constructor( options, TileSet ){
    this.TileSet = TileSet;
    this.pos = {
      x: 0,
      y: 0
    };
    this.type = 0;

    for( let i in options ){
      this[ i ] = options[ i ];
    }

    var type = TileCollection.findByType( this.type );

    for( let i in type ){
      this[ i ] = type[ i ];
    }
  }

  draw(){
    // console.log( this["fill"] );
    if( typeof this["stroke"] !== "undefined" ){
      this.TileSet.Map.ctx.beginPath();
      this.TileSet.Map.ctx.rect( this.pos.x * TileHeight, this.pos.y * TileHeight, TileWidth, TileHeight );
      this.TileSet.Map.ctx.strokeColor = this["stroke"];
      this.TileSet.Map.ctx.stroke();
      this.TileSet.Map.ctx.closePath();
    }

    if( typeof this["fill"] !== "undefined" ){
      this.TileSet.Map.ctx.beginPath();
      this.TileSet.Map.ctx.rect( this.pos.x * TileHeight, this.pos.y * TileHeight, TileWidth, TileHeight );
      this.TileSet.Map.ctx.fillStyle = this["fill"];
      this.TileSet.Map.ctx.fill();
      this.TileSet.Map.ctx.closePath();
    }
  }
}


window.Tile = Tile;
