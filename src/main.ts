import {system,world,CustomCommandRegistry, CommandPermissionLevel, StartupEvent, CustomCommandParamType, CustomCommandOrigin, CommandResult, CustomCommandStatus, CustomCommand, Vector3, BlockComponent, BlockComponentTypes, ItemStack, ItemComponentTypes} from '@minecraft/server'

import * as copyitems from './modules/copyitems'
import * as containerlock from './modules/containerlock'


system.beforeEvents.startup.subscribe((init: StartupEvent) => {
  //todo: make a module auto loader using esbuild or something
  copyitems.loadModule(init)
  containerlock.loadModule(init)
})