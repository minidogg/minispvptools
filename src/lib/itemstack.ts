import { ItemComponentTypes, ItemStack } from "@minecraft/server"

// this function was made with chatgpt i was lazy
export function areItemsEqual(a?: ItemStack, b?: ItemStack): boolean {
  // both empty
  if (!a && !b) return true

  // one empty, one not
  if (!a || !b) return false

  // basic properties
  if (a.typeId !== b.typeId) return false
  if (a.amount !== b.amount) return false
  if (a.nameTag !== b.nameTag) return false
  if (a.keepOnDeath !== b.keepOnDeath) return false
  if (a.lockMode !== b.lockMode) return false

  // lore
  const loreA = a.getLore()
  const loreB = b.getLore()

  if (loreA.length !== loreB.length) return false

  for (let i = 0; i < loreA.length; i++) {
    if (loreA[i] !== loreB[i]) return false
  }

  // durability
  const duraA = a.getComponent(ItemComponentTypes.Durability)
  const duraB = b.getComponent(ItemComponentTypes.Durability)

  if (!!duraA !== !!duraB) return false

  if (duraA && duraB) {
    if (duraA.damage !== duraB.damage) return false
  }

  // enchantments
  const enchA = a.getComponent(ItemComponentTypes.Enchantable)
  const enchB = b.getComponent(ItemComponentTypes.Enchantable)

  if (!!enchA !== !!enchB) return false

  if (enchA && enchB) {
    const listA = enchA.getEnchantments()
    const listB = enchB.getEnchantments()

    if (listA.length !== listB.length) return false

    for (let i = 0; i < listA.length; i++) {
      const ea = listA[i]
      const eb = listB[i]

      if (ea.type.id !== eb.type.id) return false
      if (ea.level !== eb.level) return false
    }
  }

  return true
}

