import {system,world,CustomCommandRegistry, CommandPermissionLevel, StartupEvent, CustomCommandParamType, CustomCommandOrigin, CommandResult, CustomCommandStatus, CustomCommand, Vector3, BlockComponent, BlockComponentTypes, ItemStack, ItemComponentTypes, GameMode, PlayerPermissionLevel} from '@minecraft/server'

export function loadModule(init: StartupEvent){
  world.afterEvents.entityDie.subscribe((ev)=>{
    if(ev.deadEntity.typeId=="minecraft:player"){
      ev.deadEntity.runCommand("scoreboard players add @s deaths 1")
    
      if(ev.damageSource.damagingEntity&&ev.damageSource.damagingEntity.typeId=="minecraft:player"){
        ev.damageSource.damagingEntity.runCommand("scoreboard players add @s kills 1")
      }
    }
    
  })
}