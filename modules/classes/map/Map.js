var Map = function( tileSet, canvas ){
  this.TileSet = tileSet;
  this.TileSet.Map = this;
  this.canvas = canvas;

  TileHeight = this.canvas.height / this.TileSet.tiles.length;
  TileWidth = this.canvas.height / this.TileSet.tiles[0].length;

  this.ctx = canvas.getContext( "2d" );
  this.MapCollection = new MapCollection( this );
  this.MapRenderer = new MapRenderer( this );
}
Map.prototype.update = function(){
  this.MapCollection.objects.forEach( ( obj ) => {
    obj.update();
  } )
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
  this.MapCollection.teams[ team.id ] = team;
}
Map.prototype.getTeam = function( teamId ){
  return this.MapCollection.teams[ teamId ];
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
Map.prototype.getObject = function( tileX, tileY ){
  var objects = [];
  this.MapCollection.objects.forEach( ( obj ) => {

    if( obj.pos.x == tileX && obj.pos.y == tileY ){
      objects.push( obj );
    }
  } );

  return objects;
}
Map.prototype.kill = function( source, target ){
  this.MapCollection.objects.find( ( obj, index ) => {
    if( obj === target && !obj.dead ){
      obj.dead = true;
      console.log( `${source.name} killed ${target.name} with ${source.weapon.name}` );
    }
  } )
}

Map.prototype.damage = function( source, target, weapon, damage ){
  target._protected.damages.push( {
    damagedBy: source,
    weaponUsed: weapon,
    damageDealt: damage
  } );
  target.lastDamagedBy = source;
  target.health -= damage;
}

Map.prototype.getCoords = function( offsetX, offsetY ){
  return {
    x: parseInt( offsetX / TileWidth ).toFixed(0),
    y: parseInt( offsetY / TileHeight ).toFixed(0)
  };
}

export var Map = window.Map = Map;
