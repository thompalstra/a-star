var Map = function( tileset, canvas ){
  this.tileset = tileset;
  this.canvas = canvas;
  this.ctx = canvas.getContext( "2d" );
  this.MapCollection = new MapCollection( this );
  this.MapRenderer = new MapRenderer( this );
}
Map.prototype.getTile = function( x, y ){
  if( typeof this.tileset.tiles[x] !== "undefined" && typeof this.tileset.tiles[x][y] !== "undefined" ){
    return this.tileset.tiles[x][y];
  }
  return [];
}
Map.prototype.getPath = function( x, y ){
  if( typeof this.tileset.path[x] !== "undefined" && typeof this.tileset.path[x][y] !== "undefined" ){
    return this.tileset.path[x][y];
  }
  return [];
}
Map.prototype.getContext = function(){
  return this.ctx;
}
Map.prototype.walk = function( callable ){
  this.tileset.tiles.forEach( ( row, rowIndex ) => {
    row.forEach( ( tile, tileIndex ) => {
      callable.apply( this, [ tile, rowIndex, tileIndex ] );
    } )
  } );
}

Map.prototype.add = function( obj ){

  if( obj instanceof GameObject ){

    let pos = obj.getPosition();

    let x = pos.x;
    let y = pos.y;

    obj.Map = this;

    this.MapCollection.objects.push( obj );

    // if( typeof this.MapCollection.objects[ x ] === "undefined" ){
    //   this.MapCollection.objects[ x ] = [];
    // }
    // if( typeof this.MapCollection.objects[ x ][ y ] === "undefined" ){
    //   this.MapCollection.objects[ x ][ y ] = [];
    // }
    // obj.MapCollection = this;
    // this.MapCollection.objects[ x ][ y ].push( obj );
  } else {
    throw Error("Object is not of type `GameObject`");
  }


}
Map.prototype.get = function( x, y ){
  if( typeof this.MapCollection.objects[ x ] !== "undefined" && typeof this.MapCollection.objects[ x ][ y ] !== "undefined" ){
    return this.MapCollection.objects[ x ][ y ]
  }
  return [];
}

export var Map = window.Map = Map;
