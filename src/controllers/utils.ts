import Animal from '../models/Animal'
import jwt from 'jsonwebtoken'

export const createToken = (userInput: { email: string; role_id: number }) => {
  const JWT_SECRET = process.env.JWT_SECRET
  const token = jwt.sign({ email: userInput.email, role_id: userInput.role_id }, JWT_SECRET as string, {
    expiresIn: 172800 //2d
  })
  return token
}

export const getAnimalsStatsByProperty = (animals: Animal[], by: 'habitat_id' | 'species_id') => {
  return animals.reduce(
    (
      stats: {
        [x: string]: {
          count: number
          highest_attack: { name: Animal['name']; attack: Animal['attack'] }
          highest_life: { name: Animal['name']; life: Animal['life'] }
          lowest_attack: { name: Animal['name']; attack: Animal['life'] }
          lowest_life: { name: Animal['name']; life: Animal['life'] }
        }
      },
      currentAnimal: Animal
    ) => {
      const statKey = by === 'habitat_id' ? currentAnimal.habitat_name : currentAnimal.species_name
      const currentStat = stats[statKey]
      const replaceHighestAttack =
        !currentStat || !currentStat.highest_attack || currentStat.highest_attack.attack < currentAnimal.attack
      const replaceHighestLife =
        !currentStat || !currentStat.highest_life || currentStat.highest_life.life < currentAnimal.life
      const replaceLowestAttack =
        !currentStat || !currentStat.lowest_attack || currentStat.lowest_attack.attack > currentAnimal.attack
      const replaceLowestLife =
        !currentStat || !currentStat.lowest_life || currentStat.lowest_life.life > currentAnimal.life
      return {
        ...stats,
        [statKey]: {
          ...currentStat,
          count: (currentStat ? currentStat.count : 0) + 1,
          ...(replaceHighestAttack
            ? {
                highest_attack: {
                  name: currentAnimal.name,
                  attack: currentAnimal.attack
                }
              }
            : {}),
          ...(replaceHighestLife
            ? {
                highest_life: { name: currentAnimal.name, life: currentAnimal.life }
              }
            : {}),
          ...(replaceLowestAttack
            ? {
                lowest_attack: { name: currentAnimal.name, attack: currentAnimal.attack }
              }
            : {}),
          ...(replaceLowestLife
            ? {
                lowest_life: { name: currentAnimal.name, life: currentAnimal.life }
              }
            : {})
        }
      }
    },
    {}
  )
}
