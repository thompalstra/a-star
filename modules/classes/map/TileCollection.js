export class TileCollection{

  constructor(){
  }

  static types(){
    return {
      0: { fill: "black", passable: false },
      1: { fill: "green", passable: true },
      2: { fill: "blue", passable: false },
      3: { fill: "gray", passable: false }
    }
  }

  static findByType( type ){

    var tileType = TileCollection.types()[ type ];
    if( tileType ){
      return tileType;
    } else {
      throw Error(`Undefined tile: ${type}`);
    }
  }
}


window.TileCollection = TileCollection;
