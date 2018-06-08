export class Team{
  constructor( options ){
    this.id = -1;
    this.name = 'unknown';
    this.standings = {};

    for( var i in options ){
      this[i] = options[i];
    }


  }
  getStanding( teamId ){
    if( typeof this.standings[ teamId ] !== "undefined" ){
      return this.standings[ teamId ];
    }
    return 0;
  }
}
window.Team = Team;
