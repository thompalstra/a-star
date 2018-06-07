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
  this.MapRenderer.Map.TileSet.tiles.forEach( ( row, ri ) => {
    row.forEach( ( tile, ti ) => {
      Tile.draw( this.MapRenderer.Map.ctx, tile, ri, ti );
    } );
  } );
}

MapRenderer.prototype.render.objects = function(){
  this.MapRenderer.Map.MapCollection.objects.forEach( ( obj ) => {
    if( obj.automated ){
      obj.checkState();
      obj.draw();
    } else {
      obj.draw();
    }
  } )
}

export var MapRenderer = window.MapRenderer = MapRenderer;
