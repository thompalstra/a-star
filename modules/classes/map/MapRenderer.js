var MapRenderer = function( map ){
  this.Map = map;
  this.render.MapRenderer = this;
}
MapRenderer.prototype.run = function(){
  // game.Engine.Map.ctx
  game.Engine.Map.ctx.restore();
  this.render.clear();
  this.render.map();
  this.render.objects();
}
MapRenderer.prototype.render = {};
MapRenderer.prototype.render.clear = function(){
  this.MapRenderer.Map.getContext().clearRect(0, 0, 200, 200);
}
MapRenderer.prototype.render.map = function(){
  this.MapRenderer.Map.walk( ( tile, x, y ) => {
    Tile.draw( this.MapRenderer.Map.ctx, tile, ( x * tileWidth ), ( y * tileHeight ) );
  } )
}

MapRenderer.prototype.render.objects = function(){
  // console.log( this.MapRenderer.Map.MapCollection.objects.forEach( obj ) );
  this.MapRenderer.Map.MapCollection.objects.forEach( ( obj ) => {

    if( obj.automated ){
      obj.checkState();
      obj.draw();
    } else {
      obj.draw();
    }

  } )



  // this.MapRenderer.Map.walk( function( tile, tileIndex, rowIndex ) {
  //   this.MapRenderer.Map.get( rowIndex, tileIndex ).forEach( function( object ) {
  //     object.draw();
  //   } )
  // } )
}

export var MapRenderer = window.MapRenderer = MapRenderer;
