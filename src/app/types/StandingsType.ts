export interface StandingsType {
  competition:{
    name:string
    emblem:string
  },
  standings:Array<{
    table:Array<{
      points:number
      won:number
      draw:number
      lost:number
      position:number
      team: {
        crest:string
        id:number
        shortName:string
      }
    }>
  }>
}