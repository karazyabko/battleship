import {
  FIRE_EMPTY_CELL,
  FIRE_SHIP_CELL,
  GENERATE_SHIP_FINISH,
  GENERATE_SHIP_START,
  START_GAME,
  FINISH_GAME,
  TOGGLE_WARNING_MODAL,
  TOGGLE_CONGRATULATION_MODAL, TOGGLE_LOSE_MODAL
} from "../actions/types";

const initialState = { gameStarted: false,
                        shipsGenerating: false,
                        usedEmptyCoords: [],
                        shipsCoords: [],
                        damagedShipsCoords: [],
                        opponentUsedEmptyCoords: [],
                        opponentShipsCoords: [],
                        opponentDamagedShipsCoords: [],
                        showWarningModal: false,
                        showCongratulationModal: false,
                        showLoseModal: false
                      };

export default function(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      const newState = initialState;
      return {...newState, gameStarted: true};
    case FINISH_GAME:
      if (action.payload.result === 'Win') {
        return {...state, gameStarted: false, showCongratulationModal: true};
      } else {
        return {...state, gameStarted: false, showLoseModal: true};
      }
    case GENERATE_SHIP_START:
      return {...state, shipsGenerating: true};
    case GENERATE_SHIP_FINISH:
      if (action.payload.owner === 'player') {
        return {...state, shipsGenerating: false, shipsCoords: action.payload.items};
      } else {
        return {...state, shipsGenerating: false, opponentShipsCoords: action.payload.items};
      }
    case FIRE_SHIP_CELL:
      const shipCellCoords = action.payload.items;
      if (action.payload.owner === 'player') {
        const filteredShipsCellCoords = state.shipsCoords.filter((item) => {
          return shipCellCoords[0] !== item[0] || shipCellCoords[1] !== item[1]
        });
        return {...state, shipsCoords: filteredShipsCellCoords,
                          damagedShipsCoords: [...state.damagedShipsCoords, shipCellCoords]};
      } else {
        const filteredShipsCellCoords = state.opponentShipsCoords.filter((item) => {
          return shipCellCoords[0] !== item[0] || shipCellCoords[1] !== item[1]
        });
        return {...state, opponentShipsCoords: filteredShipsCellCoords,
                          opponentDamagedShipsCoords: [...state.opponentDamagedShipsCoords, shipCellCoords]};
      }
    case FIRE_EMPTY_CELL:
      const emptyCellCoords = action.payload.items;
      if (action.payload.owner === 'player') {
        return {...state, usedEmptyCoords: [...state.usedEmptyCoords, emptyCellCoords]};
      } else {
        return {...state, opponentUsedEmptyCoords: [...state.opponentUsedEmptyCoords, emptyCellCoords]};
      }
    case TOGGLE_WARNING_MODAL:
      return {...state, showWarningModal: !state.showWarningModal};
    case TOGGLE_CONGRATULATION_MODAL:
      return {...state, showCongratulationModal: !state.showCongratulationModal};
    case TOGGLE_LOSE_MODAL:
      return {...state, showLoseModal: !state.showLoseModal};
    default:
      return state;
  }
}