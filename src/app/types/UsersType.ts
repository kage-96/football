export interface UsersType {
  users:Array<{
    id:string,
    email:string,
    createdAt:string
    favorites:{
      team:{
        shortName:string,
        crest:string
      }
    }
  }>
}