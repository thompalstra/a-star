export class GameObject{
  constructor( data ){

    this.pos = {
      x: undefined,
      y: undefined
    };

    this.data = {
      health: 100,
      armor: [
        10, // head
        10, // torso
        10, // legs
        10 // feet
      ],
      dangerLevel: 0,
    };

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

    // 
    // console.log( ( diffX, diffY ), diffX <= speed, diffY <= speed );
    //
    // if( currentY == pathY || diffY <= speed ){
    //   currentY = ( parseFloat( pathY ).toPrecision( 12 ) );
    // }
    // if( currentX == pathX || diffX <= speed ){
    //   currentX = ( parseFloat( pathX ).toPrecision( 12 ) );
    // }

    if( currentX < pathX ){
      // newX = newX + speed;
      newX = ( parseFloat( newX + speed ).toPrecision( 12 ) );
    } else if( currentX > pathX ){
      // newX = newX - speed;
      newX = ( parseFloat( newX - speed ).toPrecision( 12 ) );
    }

    if( currentY < pathY ){
      // newY = newY + speed;
      newY = ( parseFloat( newY + speed ).toPrecision( 12 ) );
    } else if( currentY > pathY ){
      // newY = newY - speed;
      newY = ( parseFloat( newY - speed ).toPrecision( 12 ) );
    }

    this.pos = {
      x: parseFloat( newX ).toPrecision( 12 ),
      y: parseFloat( newY ).toPrecision( 12 )
    };
  }
}
window.GameObject = GameObject;
