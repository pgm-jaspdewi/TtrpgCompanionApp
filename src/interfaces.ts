// interface for profiles
export interface profile {
  username: string
  email: string
}

export interface spell {
  index: string
  name: string
  level: number
  url: string
}

export interface equipment {
  amount: number
  item: string
}

export interface characterStats {
  str: string
  dex: string
  con: string
  int: string
  wis: string
  cha: string
}

export interface characterWealth {
  type: string
  amount: number
}

export interface characterDetails {
  avatar: string
  background: string
  cantrip: string[]
  class: string
  created_at: string
  equipment: equipment[]
  first_level_spells: string[]
  id: number
  languages: string[]
  level: number
  name: string
  race: string
  skills: string[]
  stats: characterStats
  userId: string
  currentHitPoints: number
  maxHitPoints: number
  wealth: characterWealth[]
}

export interface savingThrows {
  index: string
  name: string
  url: string
}

export interface classDetails {
  index: string
  name: string
  hit_die: number
  proficiencies: savingThrows[]
  saving_throws: savingThrows[]
}

export interface weaponDetails {
  index: string
  name: string
  damage_die: string
  damage_type: string
  range: string
  attack_bonus: number
}
