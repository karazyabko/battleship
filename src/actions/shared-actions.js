import {
  FIRE_EMPTY_CELL,
  FIRE_SHIP_CELL,
  GENERATE_SHIP_FINISH,
  GENERATE_SHIP_START,
  START_GAME,
  FINISH_GAME,
  TOGGLE_WARNING_MODAL,
  TOGGLE_CONGRATULATION_MODAL
} from "./types";

export function startGame() {
  return {
    type: START_GAME
  }
}

export function finishGame() {
  return {
    type: FINISH_GAME
  }
}

export function startGenerateShips() {
  return {
    type: GENERATE_SHIP_START
  }
}

export function finishGenerateShips(coords) {
  return {
    type: GENERATE_SHIP_FINISH,
    payload: { items: coords}
  }
}

export function performShipDamagedFire(coords) {
  return {
    type: FIRE_SHIP_CELL,
    payload: { items: coords}
  }
}

export function performEmptyFire(coords) {
  return {
    type: FIRE_EMPTY_CELL,
    payload: { items: coords}
  }
}

export function toggleWarningModal() {
  return {
    type: TOGGLE_WARNING_MODAL
  }
}

export function toggleCongratulationModal() {
  return {
    type: TOGGLE_CONGRATULATION_MODAL
  }
}