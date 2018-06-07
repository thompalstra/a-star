export class SimpleMob extends GameObject{

  constructor( options ){
    super();
    this.path = [];
    this.pos.x = 0;
    this.pos.y = 0;
    this.automated = true;

    this.followRadius = 2;
    this.wakeRadius = 10;
    this.awake = false;
    this.speed = 0.25;
    this.tick = 1;
    this.sleepTick = 1;
    this.outOfRangeTick = 0;
    this.outOfRangeTickMax = 5;

    for( var i in options ){
      this[i] = options[i];
    }
  }

  draw(){
    this.Map.ctx.fillStyle = "red";
    this.Map.ctx.fillRect( ( this.pos.x * TileWidth ), ( this.pos.y * TileHeight ), TileHeight, TileWidth );
  }
  updatePosition(){
    if( this.tick >= ( 1 /  this.speed ) ){
      if( this.path.length > 0 ){
        this.pos = {
          x: this.path[0][0],
          y: this.path[0][1]
        };
        this.path.shift();
      }
      this.tick = 1;
    }
    this.tick++;
  }
  move( event ){
    var tileX = parseInt( player.pos.x );
    var tileY = parseInt( player.pos.y );
    this.pos.x = parseInt( this.pos.x );
    this.pos.y = parseInt( this.pos.y );

    this.path = PathTracking( this.Map.TileSet.path, [ this.pos.x, this.pos.y ], [ tileX, tileY ] );
    this.path.shift();

    if( this.path.length > this.followRadius ){
      this.path = this.path.slice( 0, this.followRadius );
    }
  }
  checkEnvironment(){
    var tileX = parseInt( player.pos.x );
    var tileY = parseInt( player.pos.y );
    this.pos.x = parseInt( this.pos.x );
    this.pos.y = parseInt( this.pos.y );

    if( PathTracking( this.Map.TileSet.path, [ this.pos.x, this.pos.y ], [ tileX, tileY ] ).length <= this.wakeRadius ){
      this.awake = true;
    } else {
      if( this.awake ){
        this.outOfRange = true;
        this.outOfRangeTick++;
        if( this.outOfRangeTick == this.outOfRangeTickMax ){
          this.awake = false;
          this.outOfRangeTick = 0;
        }
      }
    }
  }
  checkState(){
    this.checkEnvironment();

    if( this.awake ){
      this.updatePosition();
      this.move();
    }
  }
}
window.SimpleMob = SimpleMob;
