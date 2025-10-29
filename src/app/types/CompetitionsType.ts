export interface CompetitionType {
  id: number
  name: string
  country: string
  emblem: string
}

export interface CompetitionsResponseType {
  competitions: CompetitionType[]
}