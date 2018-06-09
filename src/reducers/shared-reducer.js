import {
  FIRE_EMPTY_CELL,
  FIRE_SHIP_CELL,
  GENERATE_SHIP_FINISH,
  GENERATE_SHIP_START,
  START_GAME,
  FINISH_GAME,
  TOGGLE_WARNING_MODAL,
  TOGGLE_CONGRATULATION_MODAL
} from "../actions/types";

const initialState = { gameStarted: false,
                        shipsGenerating: false,
                        usedEmptyCoords: [],
                        shipsCoords: [],
                        damagedShipsCoords: [],
                        showWarningModal: false,
                        showCongratulationModal: false}

export default function(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      const newState = initialState;
      return {...newState, gameStarted: true};
    case FINISH_GAME:
      return {...state, gameStarted: false, showCongratulationModal: true};
    case GENERATE_SHIP_START:
      return {...state, shipsGenerating: true};
    case GENERATE_SHIP_FINISH:
      return {...state, shipsGenerating: false, shipsCoords: action.payload.items};
    case FIRE_SHIP_CELL:
      const shipCellCoordsIndex = action.payload.index;
      const damagedShipCoords = state.shipsCoords[shipCellCoordsIndex];
      state.shipsCoords.splice(shipCellCoordsIndex, 1);
      const newDamagedShipsCoords = [...state.damagedShipsCoords, ...damagedShipCoords];
      return {...state, shipsCoords: state.shipsCoords, damagedShipsCoords: newDamagedShipsCoords};
    case FIRE_EMPTY_CELL:
      const emptyCellCoords = action.payload.items;
      return {...state, usedEmptyCoords: [...state.usedEmptyCoords, emptyCellCoords]};
    case TOGGLE_WARNING_MODAL:
      return {...state, showWarningModal: !state.showWarningModal};
    case TOGGLE_CONGRATULATION_MODAL:
      return {...state, showCongratulationModal: !state.showCongratulationModal};
    default:
      return state;
  }
}