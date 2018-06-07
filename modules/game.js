import {Engine} from "./classes/core/Engine.js";
import {Map} from "./classes/map/Map.js";
import {MapCollection} from "./classes/map/MapCollection.js";
import {TileSet} from "./classes/map/TileSet.js";
import {TileCollection} from "./classes/map/TileCollection.js";
import {Tile} from "./classes/map/Tile.js";
import {MapRenderer} from "./classes/map/MapRenderer.js";

import {GameObject} from "./classes/objects/GameObject.js";
import {Team} from "./classes/objects/Team.js";
import {Player} from "./classes/objects/Player.js";
import {SimpleMob} from "./classes/objects/SimpleMob.js";


import "./classes/core/PathTracking.js";

window.TileHeight = 0;
window.TileWidth = 0;

window.Game = function( options ){
  this.Engine = new Engine( new Map( options.TileSet, options.canvas ) );
};
window.Game.prototype.Draw = function(){
  this.Engine.Map.MapRenderer.run();
}
window.Game.prototype.tick = function(  ){
  // execute all logics
  // console.log( game.Engine.Map.MapCollection.objects );
  game.Engine.Map.MapCollection.objects.forEach( ( o ) => {
    // console.log( o );
  } )

  // execute all drawing
  game.Draw();

  setTimeout(function() {
    window.requestAnimationFrame( game.tick );
  }, 1000 / 30);
}
