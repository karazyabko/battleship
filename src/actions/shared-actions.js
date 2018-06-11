import {
  FIRE_EMPTY_CELL,
  FIRE_SHIP_CELL,
  GENERATE_SHIP_FINISH,
  GENERATE_SHIP_START,
  START_GAME,
  FINISH_GAME,
  TOGGLE_WARNING_MODAL,
  TOGGLE_CONGRATULATION_MODAL,
  TOGGLE_LOSE_MODAL
} from "./types";

export function startGame() {
  return {
    type: START_GAME
  }
}

export function finishGame(result) {
  return {
    type: FINISH_GAME,
    payload: { result: result}
  }
}

export function startGenerateShips() {
  return {
    type: GENERATE_SHIP_START
  }
}

export function finishGenerateShips(owner, coords) {
  return {
    type: GENERATE_SHIP_FINISH,
    payload: { owner: owner, items: coords}
  }
}

export function performShipDamagedFire(owner, coords) {
  return {
    type: FIRE_SHIP_CELL,
    payload: { owner: owner, items: coords}
  }
}

export function performEmptyFire(owner, coords) {
  return {
    type: FIRE_EMPTY_CELL,
    payload: { owner: owner, items: coords}
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

export function toggleLoseModal() {
  return {
    type: TOGGLE_LOSE_MODAL
  }
}