export class GameObject{
  constructor( data ){

    this.pos = {
      x: undefined,
      y: undefined
    };

    this.data = {
      // health: 100,
      armor: [
        10, // head
        10, // torso
        10, // legs
        10 // feet
      ],
      dangerLevel: 0,
    };
    this.dead = false;
    this._protected = {
      health: 100,
      damages: []
    };

    Object.defineProperty( this, "health", {
      get: function(){
        return this._protected.health;
      },
      set: function( value ){
        if( value <= 0 ){
          this.Map.kill( this, this.lastDamagedBy );
        } else {
          this._protected.health = value;
        }
      }
    } );

    for( var i in data ){
      this[i] = data[i];
    }
  }
  getPosition(){
    return this.pos;
  }
  setTeam( id ){
    this.Team = this.Map.getTeam( id );
  }
  getTeam(){
    return this.Team;
  }
  getArmorScore(){
    return this.data.armor.reduce( ( accumulator, currentValue ) => {
      return accumulator + currentValue;
    } )
  }
  getHealthScore(){
    return this.data.health;
  }
  getDangerLevel(){
    return this.data.dangerLevel;
  }
  updatePositionCoords(){
    var pathX = parseFloat( this.path[0][0] );
    var pathY = parseFloat( this.path[0][1] );

    var currentX = parseFloat( this.pos.x );
    var currentY = parseFloat( this.pos.y );

    var newX = currentX;
    var newY = currentY;

    var speed = this.speed;

    var diffX = Math.abs( parseFloat( currentX - pathX ).toPrecision( 12 ) );
    var diffY = Math.abs( parseFloat(currentY - pathX ).toPrecision( 12 ) );

    if( currentX < pathX ){
      newX = ( parseFloat( newX + speed ).toPrecision( 12 ) );
    } else if( currentX > pathX ){
      newX = ( parseFloat( newX - speed ).toPrecision( 12 ) );
    }

    if( currentY < pathY ){
      newY = ( parseFloat( newY + speed ).toPrecision( 12 ) );
    } else if( currentY > pathY ){
      newY = ( parseFloat( newY - speed ).toPrecision( 12 ) );
    }

    this.pos = {
      x: parseFloat( newX ).toPrecision( 12 ),
      y: parseFloat( newY ).toPrecision( 12 )
    };
  }
  checkTargetRange(){
    // var r = this.targetRange;
    var r = this.weapon.range;

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
  attackTarget(){
    if( this == player ){
      console.log( this.getTarget(), this, this.weapon.name, this.weapon.damage );
      
    }
    this.Map.damage( this.getTarget(), this, this.weapon.name, this.weapon.damage );
  }
}
window.GameObject = GameObject;
