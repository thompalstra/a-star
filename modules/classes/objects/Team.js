export class Team extends GameObject{
  construct( options ){
    this.id = 0;
    this.name = 'unknown';

    for( var i in options ){
      this[i] = options[i];
    }
  }
}
window.Team = Team;
