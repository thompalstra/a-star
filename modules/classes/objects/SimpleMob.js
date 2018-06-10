export class SimpleMob extends GameObject{

  constructor( options ){
    super();
    this.path = [];
    this.name = "Simple Mob";
    this.health = 100;
    this.automated = true;
    this.fillStyle = "red";
    this.targetInRange = false;

    this.target = false;
    this.forcedTarget = false;
    this.visibilityRange = 5;
    this.speed = .10;

    this.weapon = {
      name: "Glock",
      speed: 1,
      damage: 1,
      range: 2,
    };

    for( var i in options ){
      this[i] = options[i];
    }
  }

  draw(){
    this.Map.ctx.fillStyle = this.dead ? "#333" : this.fillStyle;
    this.Map.ctx.fillRect( ( this.pos.x * TileWidth ), ( this.pos.y * TileHeight ), TileHeight, TileWidth );
  }

  setTarget( target ){
    this.target = target;
  }
  getTarget(){
    if( this.forcedTarget !== false && !this.forcedTarget.dead ){
      return this.forcedTarget;
    } else if( this.target !== false && !this.target.dead ){
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
        if( obj !== this && !obj.dead ){ results.push( obj ) }
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

  updateTarget(){
    this.checkVisibility();
    if( this.getTarget() ){
      this.checkTargetRange();
      if( !this.targetInRange ){
        this.updateTargetCoords();
      } else {
        this.attackTarget();
      }
    }
  }
  updatePosition(){
    if( this.path.length > 0 ){
      this.updatePositionCoords();
    }
  }
  update(){
    if( !this.dead ){
      this.updateTarget();
      this.updatePosition();
    }
  }
}
window.SimpleMob = SimpleMob;
