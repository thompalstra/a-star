export class TileSet{

  constructor( tiles, options ){

    this.path = [];
    this.tiles = [];

    tiles.forEach( ( row, rowIndex ) => {
      row.forEach( ( tile, tileIndex ) => {
        if( typeof this.tiles[ tileIndex ] === "undefined" ){
          this.tiles[ tileIndex ] = [];
          this.path[ tileIndex ] = [];
        }
        if( typeof this.tiles[ tileIndex ][ rowIndex ] === "undefined" ){
          this.tiles[ tileIndex ][ rowIndex ]
          this.path[ tileIndex ][ rowIndex ] = [];
        }
        this.tiles[ tileIndex ][ rowIndex ] = TileCollection.findByType( tile );
        this.path[ tileIndex ][ rowIndex ] = this.tiles[ tileIndex ][ rowIndex ].passable ? 0 : 1;
      } );
    } );

    for( var i in options ){
      this[i] = options[i];
    }
  }
}
window.TileSet = TileSet;
