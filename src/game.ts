//import utils from '../node_modules/decentraland-ecs-utils/index'
import { placeTeleports } from './modules/teleports'
import { placePlatforms } from './modules/platforms'
import { addWearables } from './modules/wearables'
import {
  placeMuseumPieces,
  placeTradecenterPieces,
  placeGardenPieces,
  placeWearablePieces,
} from './modules/museumItems'
import { addScreen } from './modules/video'
import { addBuildings } from './modules/buildings'
import { addFaceUserSystem } from './modules/npcFaceUserSystem'
import { addRobots } from './modules/npcRobotBuilder'
import { addNFTs } from './modules/nftBuilder'
import { addMural } from './mural/muralBuilder'
import { addPiano } from './piano/pianoBuilder'
import { updateMarketData } from './modules/serverHandler'
import { AmbientSound } from './modules/ambientSound'
import { addZenquencer } from './zenquencer/zenquencerBuilder'
import { createEventsBoard } from './modules/eventBoard'
import { addOneTimeTrigger } from './modules/Utils'
import { getUserData } from '@decentraland/Identity'
import Meta from '../metas/sammich/sammich';

//////// LOG PLAYER POSITION

Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, (e) => {
  log(`pos: `, Camera.instance.position)
  log(`rot: `, Camera.instance.rotation)
})

//// ADD BUILDINGS

addBuildings()

/// MOVING PLATFORMS

placePlatforms()

///TELEPORTERS

placeTeleports()

/// VIDEO SCEREEN

addScreen()

/// EVENTS BOARD

createEventsBoard({
  position: new Vector3(175.8, 3.5, 168),
  rotation: Quaternion.Euler(0, 225, 0),
})

/// WEARABLES

addOneTimeTrigger(new Vector3(180, 2, 244), new Vector3(60, 60, 60), () => {
  placeMuseumPieces()
})

/// MUSEUM

addOneTimeTrigger(new Vector3(273, 2, 127), new Vector3(50, 50, 50), () => {
  addWearables()
  placeWearablePieces()
})

/// TRADE CENTER

addOneTimeTrigger(new Vector3(269, 5, 37), new Vector3(80, 80, 80), () => {
  updateMarketData()
  placeTradecenterPieces()
})

/// GARDEN

addOneTimeTrigger(new Vector3(118, 3, 39), new Vector3(60, 60, 60), () => {
  placeGardenPieces()
})

/// ROBOTS
const dummyTarget = new Entity()
dummyTarget.addComponent(new PlaneShape())
dummyTarget.addComponent(new Transform())

addFaceUserSystem(dummyTarget)
addRobots(dummyTarget)

/// NFTS
addNFTs()

/// Piano
// BUG: need to hot reload for the red out of bound indicators to disappear - works fine when deployed
addPiano()

/// Sequencer Fountain
addZenquencer()

/// AMBIENT SOUNDS

let forest1 = new AmbientSound(
  { position: new Vector3(215, 2, 183) },
  'sounds/Forest.mp3',
  0,
  true,
  0.6
)

let forest2 = new AmbientSound(
  { position: new Vector3(117, 2, 42) },
  'sounds/Forest2.mp3',
  0,
  true,
  0.6
)

// let thunder = new AmbientSound(
//   { position: new Vector3(43, 45, 113) },
//   'sounds/thunder.mp3',
//   0,
//   true,
//   0.2
// )

const landOwnerData = {
  host_data: `{
    "sammich":{
      "position":{"x":${9*16},"y":0.8,"z":${9*16}},
      "rotation":{"x":0,"y":0,"z":0},
      "scale":{"x":2, "y":2, "z":2},
      "hideFrame":false,
      "hideBoard":false,
      "hideAd":true,
      "gameID":"0,0"
    }
 }`
};

new Meta({getUserData}, landOwnerData)