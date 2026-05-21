import {system,world,CustomCommandRegistry, CommandPermissionLevel, StartupEvent, CustomCommandParamType, CustomCommandOrigin, CommandResult, CustomCommandStatus, CustomCommand, Vector3, BlockComponent, BlockComponentTypes, ItemStack, ItemComponentTypes, GameMode, PlayerPermissionLevel} from '@minecraft/server'
import { areItemsEqual } from '../lib/itemstack';

export function loadModule(init: StartupEvent){
  world.beforeEvents.playerInteractWithBlock.subscribe((e)=>{
    let container = e.block.getComponent(BlockComponentTypes.Inventory)?.container
    if(container&&(e.player.getGameMode()!=GameMode.Creative)&&e.block.below()?.typeId=="minecraft:bedrock"){
      e.cancel = true
      e.player.sendMessage("You must be in creative mode for this action because of the bedrock block below this container.")
    }
  })
}