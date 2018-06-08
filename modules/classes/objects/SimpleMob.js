export class SimpleMob extends GameObject{

  constructor( options ){
    super();
    this.path = [];
    this.automated = true;
    this.fillStyle = "red";
    this.targetInRange = false;

    for( var i in options ){
      this[i] = options[i];
    }
    this.target = false;
    this.forcedTarget = false;
    this.targetRange = 2;
    this.visibilityRange = 5;
    this.speed = .10;
  }

  draw(){
    this.Map.ctx.fillStyle = this.fillStyle;
    this.Map.ctx.fillRect( ( this.pos.x * TileWidth ), ( this.pos.y * TileHeight ), TileHeight, TileWidth );
  }

  setTarget( target ){
    this.target = target;
  }
  getTarget(){
    if( this.forcedTarget !== false ){
      return this.forcedTarget;
    } else if( this.target !== false ){
      return this.target;
    }
    return false;
  }
  updateTargetCoords(){
    this.path = PathTracking(
      this.Map.TileSet.path,
      [ parseInt( this.pos.x ), parseInt( this.pos.y ) ],
      [ parseInt( this.target.pos.x ), parseInt( this.target.pos.y ) ] );

    this.path.pop();
    this.path.shift();

  }
  assessTargets( targets ){
    targets.forEach( ( target ) => {
      if( target !== this ){
        if( this.Team.getStanding( target.Team.id ) == -1 ){
          if( this.getTarget() === false ){
            this.target = target;
          } else if( this.assessThreats( this.getTarget(), target ) < 0 ){
            this.target = target;
          }
        }
      }
    } );
  }
  assessThreats( a, b ){
    // when > 0, a is a great threat
    // when < 0, b is a great threat
    // when equal, a and b are of equal threat
    var score = 0;

    score += ( a.getArmorScore() >= b.getArmorScore() ) ? 0 : -1;
    score += ( a.getHealthScore() >= b.getHealthScore() ) ? 0 : -1;
    score += ( a.getDangerLevel() >= b.getDangerLevel() ) ? 0 : -1;

    return ( score >= 0 ? 1 : -1 );
  }
  checkVisibility(){
    var r = this.visibilityRange;

    var start = { x: this.pos.x - r, y: this.pos.y - r };
    var end = { x: this.pos.x + r, y: this.pos.y + r };
    var current = { x: start.x, y: start.y };
    var check = true;
    var results = [];

    while( check ){
      this.Map.getObject( current.x, current.y ).forEach( ( obj ) => {
        if( obj !== this ){ results.push( obj ) }
      } )

      if( current.x < end.x ){
        current.x++;
      } else {
        if( current.y < end.y ){
          current.y++;
          current.x = start.x;
        } else {
          break;
        }
      }
    }

    if( results.length > 0 ){
      this.assessTargets( results );
    }
  }
  checkTargetRange(){
    var r = this.targetRange;

    var start = {
      x: parseInt( this.pos.x - r ),
      y: parseInt( this.pos.y - r )
    };
    var end = {
      x: parseInt( this.pos.x + r ),
      y: parseInt( this.pos.y + r )
    };

    var target = {
      x: parseInt( this.getTarget().pos.x ),
      y: parseInt( this.getTarget().pos.y )
    }


    // check if target out of range
    if(
      ( target.x >= start.x && target.x <= end.x ) &&
      ( target.y >= start.y && target.y <= end.y )
    ){
      this.path = [];
      this.targetInRange = true;
    } else {
      this.targetInRange = false;
    }
  }
  updateTarget(){
    this.checkVisibility();
    if( this.getTarget() ){
      this.checkTargetRange();
      if( !this.targetInRange ){
        this.updateTargetCoords();
      }
    }
  }
  updatePosition(){
    if( this.path.length > 0 ){
      this.updatePositionCoords();
    }
  }
  update(){
    this.updateTarget();
    this.updatePosition();
  }
}
window.SimpleMob = SimpleMob;
