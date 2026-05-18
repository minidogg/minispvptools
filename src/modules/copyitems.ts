import {system,world,CustomCommandRegistry, CommandPermissionLevel, StartupEvent, CustomCommandParamType, CustomCommandOrigin, CommandResult, CustomCommandStatus, CustomCommand, Vector3, BlockComponent, BlockComponentTypes, ItemStack, ItemComponentTypes} from '@minecraft/server'
import { areItemsEqual } from '../lib/itemstack';

export function loadModule(init: StartupEvent){
    const itemCopyCommand: CustomCommand = {
    name: "gpe:copyitems",
    description: "Copy items from one container block to another",
    permissionLevel: CommandPermissionLevel.GameDirectors,
    optionalParameters: [{ type: CustomCommandParamType.Location, name: "from" },{ type: CustomCommandParamType.Location, name: "to" }],
  };
  init.customCommandRegistry.registerCommand(itemCopyCommand, (origin, from: Vector3, to: Vector3)=>{
    let dimension = origin.sourceEntity?.dimension||origin.sourceBlock?.dimension||origin.initiator?.dimension||world.getDimension("overworld")

    if(!dimension.isChunkLoaded(from)||!dimension.isChunkLoaded(to)){
      return {
        "message":"Failed to copy items, one of chunks wasn't loaded",
        "status":CustomCommandStatus.Failure
      }
    }
    let fromInv = dimension.getBlock(from)?.getComponent(BlockComponentTypes.Inventory)
    if(!fromInv||!fromInv.container){
      return {
        "message":"From location isn't a container",
        "status":CustomCommandStatus.Failure
      }
    }


    let toInv = dimension.getBlock(to)?.getComponent(BlockComponentTypes.Inventory)
    if(!toInv||!toInv.container){
      return {
        "message":"To location isn't a container",
        "status":CustomCommandStatus.Failure
      }
    }

    system.run(()=>{
      if(toInv.container&&fromInv.container){
      let size = Math.min(toInv.container.size, fromInv.container.size)
      for(let i = 0;i<size;i++){
        let origitem = fromInv.container.getItem(i)
        if(!areItemsEqual(origitem, toInv.container.getItem(i)))toInv.container.setItem(i,origitem?.clone())
      }
      }
    })

    return {
      "message":"Successfully copied items",
      "status":CustomCommandStatus.Success
    }
  });
}