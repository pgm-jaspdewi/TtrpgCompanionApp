// interface for profiles
export interface profile {
  username: string
  email: string
}

export interface character {
  image: string
  name: string
  race: string
  level: number
  class: string
}

export interface spell {
  index: string
  name: string
  level: number
  url: string
}

export interface equipment {
  amount: number
  name: string
}
