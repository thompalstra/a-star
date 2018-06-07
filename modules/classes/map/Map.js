var Map = function( tileSet, canvas ){
  this.TileSet = tileSet;
  this.canvas = canvas;

  TileHeight = this.canvas.height / this.TileSet.tiles.length;
  TileWidth = this.canvas.height / this.TileSet.tiles[0].length;

  this.ctx = canvas.getContext( "2d" );
  this.MapCollection = new MapCollection( this );
  this.MapRenderer = new MapRenderer( this );



}
Map.prototype.getTile = function( x, y ){
  if( typeof this.TileSet.tiles[x] !== "undefined" && typeof this.TileSet.tiles[x][y] !== "undefined" ){
    return this.TileSet.tiles[x][y];
  }
  return [];
}
Map.prototype.getPath = function( x, y ){
  if( typeof this.TileSet.path[x] !== "undefined" && typeof this.TileSet.path[x][y] !== "undefined" ){
    return this.TileSet.path[x][y];
  }
  return [];
}
Map.prototype.getContext = function(){
  return this.ctx;
}
Map.prototype.addTeam = function( team ){
  this.MapCollection.teams.push( team );
}
Map.prototype.getTeam = function( i ){
  return this.MapCollection.teams[ i ];
}
Map.prototype.addObject = function( obj ){

  if( obj instanceof GameObject ){

    let pos = obj.getPosition();

    let x = pos.x;
    let y = pos.y;

    obj.Map = this;

    this.MapCollection.objects.push( obj );

  } else {
    throw Error("Object is not of type `GameObject`");
  }
}
Map.prototype.get = function( x, y ){
  console.log( x, y );
  if( typeof this.MapCollection.objects[ x ] !== "undefined" && typeof this.MapCollection.objects[ x ][ y ] !== "undefined" ){
    return this.MapCollection.objects[ x ][ y ]
  }
  return [];
}

export var Map = window.Map = Map;
