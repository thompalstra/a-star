var Engine = function( map ){
  this.Map = map;
}
Engine.prototype.tick = function(){
  map.renderer.run();
  console.log("tick");
  requestAnimationFrame( map.tick );
}


export var Engine = window.Engine = Engine;
