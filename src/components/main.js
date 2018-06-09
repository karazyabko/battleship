import React, { Component } from 'react';
import BattleField from "./battle-field";
import { Button } from 'reactstrap';
import { connect } from 'react-redux'
import { startGame, startGenerateShips, finishGenerateShips, toggleWarningModal, toggleCongratulationModal } from "../actions/index";
import ModalWindow from "./modal-window";

class Main extends Component {

  constructor(props) {
    super(props);
    this.initGame = this.initGame.bind(this);
  }



  initGame() {
    this.props.startGame();
    this.props.startGenerateShips();
    this.generateShips();
  }

  isItemInArray(array, item) {
    if ( typeof array === 'undefined') {
      return false;
    }

    if ( array.length === 0) {
      return false;
    }

    for (let i = 0; i < array.length; i++) {
      if (array[i][0] === item[0] && array[i][1] === item[1]) {
        return true;
      }
    }
    return false;
  }

  isCorrectCoords(source, array) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < source.length; j++) {
        let wrongX = array[i][0] >= (source[j][0] - 1) && array[i][0] <= (source[j][0] + 1);
        let wrongY = array[i][1] >= (source[j][1] - 1) && array[i][1] <= (source[j][1] + 1);
        if (wrongX || wrongY) {
          return false;
        }
      }
    }
    return true;
  }

  setUnavailableCells(unavailableArray, array) {
    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      for (let x = item[0] - 1; x <= item[0] + 1; x++) {
        for (let y = item[1] - 1; y <= item[1] + 1; y++) {
          if (x >= 0 && y >= 0 && !this.isItemInArray(unavailableArray, [x, y])) {
            unavailableArray.push([x, y]);
          }
        }
      }
    }
  }

  generateShips() {
    let unavailableCoords = [];
    // generate L ship
    let coordsArray = this.generateLShipCoords();
    this.setUnavailableCells(unavailableCoords, coordsArray);

    // generate I ship
    let iShipCoords = [];

    do {
      iShipCoords = this.generateIShipCoords();
    } while (!this.isCorrectCoords(coordsArray, iShipCoords));

    coordsArray.push(...iShipCoords);
    this.setUnavailableCells(unavailableCoords, iShipCoords);

    // generate dot ships
    let dotShip1Coords = [];

    do {
      dotShip1Coords = [this.getRandomCoord(), this.getRandomCoord()];
    } while (this.isItemInArray(unavailableCoords, dotShip1Coords));

    coordsArray.push(dotShip1Coords);
    this.setUnavailableCells(unavailableCoords, [dotShip1Coords]);

    let dotShip2Coords = [];

    do {
      dotShip2Coords = [this.getRandomCoord(), this.getRandomCoord()];
    } while (this.isItemInArray(unavailableCoords, dotShip2Coords));

    coordsArray.push(dotShip2Coords);

    this.props.finishGenerateShips(coordsArray);

    return coordsArray;
  }

  generateIShipCoords() {
    let items = [];
    let shipLength = 4;
    let fieldLength = 10;
    let x = this.getRandomCoord();
    let y = this.getRandomCoord();
    let orientation = this.getRandomShipOrientation();
    items.push([x, y]);

    if (orientation === 'vertical') {
      if (y + shipLength > fieldLength - 1) {
        items.push([x, y - 1]);
        items.push([x, y - 2]);
        items.push([x, y - 3]);
      } else {
        items.push([x, y + 1]);
        items.push([x, y + 2]);
        items.push([x, y + 3]);
      }
    } else {
      if (x + shipLength > fieldLength - 1) {
        items.push([x - 1, y]);
        items.push([x - 2, y]);
        items.push([x - 3, y]);
      } else {
        items.push([x + 1, y]);
        items.push([x + 2, y]);
        items.push([x + 3, y]);
      }
    }

    return items;
  }

  generateLShipCoords() {
    let items = [];
    let shipLength = 3;
    let fieldLength = 10;
    let x = this.getRandomCoord();
    let y = this.getRandomCoord();
    let orientation = this.getRandomShipOrientation();
    items.push([x, y]);

    if (orientation === 'vertical') {
      if (y + shipLength > fieldLength - 1) {
        if (x - 1 < 0) {
          items.push([x + 1, y]);
          items.push([x + 1, y - 1]);
          items.push([x + 1, y - 2]);
        } else {
          items.push([x - 1, y]);
          items.push([x - 1, y - 1]);
          items.push([x - 1, y - 2]);
        }
      } else {
        if (x - 1 < 0) {
          items.push([x + 1, y]);
          items.push([x + 1, y + 1]);
          items.push([x + 1, y + 2]);
        } else {
          items.push([x - 1, y]);
          items.push([x - 1, y + 1]);
          items.push([x - 1, y + 2]);
        }
      }
    } else {
      if (x + shipLength > fieldLength - 1) {
        if (y - 1 < 0) {
          items.push([x, y + 1]);
          items.push([x - 1, y + 1]);
          items.push([x - 2, y + 1]);
        } else {
          items.push([x, y - 1]);
          items.push([x - 1, y - 1]);
          items.push([x - 2, y - 1]);
        }
      } else {
        if (y - 1 < 0) {
          items.push([x, y + 1]);
          items.push([x + 1, y + 1]);
          items.push([x + 2, y + 1]);
        } else {
          items.push([x, y - 1]);
          items.push([x + 1, y - 1]);
          items.push([x + 2, y - 1]);
        }
      }
    }

    return items;
  }

  getRandomCoord() {
    return Math.floor(Math.random() * 10);
  }

  getRandomShipOrientation() {
    let options = ['vertical', 'horizontal'];
    return options[Math.floor(Math.random() * options.length)];
  }



  renderStartButton() {
    if (!this.props.gameStarted) {
      return (
        <div className="row centered">
          <div className=".col-md-6 .offset-md-3 ">
            <Button color="success" onClick={this.initGame}>Start Game</Button>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

  render() {

    return (
      <div className="container ">
        <div className="row centered">
          <div className=".col-md-6 .offset-md-3">
            <BattleField isItemInArray={this.isItemInArray.bind(this)}/>
          </div>
        </div>
        {this.renderStartButton()}
        <ModalWindow headerText="Warning"
                     bodyText="This cell is already used"
                     show={this.props.showWarningModal}
                     toggleModal={() => this.props.toggleWarningModal()}/>
        <ModalWindow headerText="Congratulations"
                     bodyText="You win the game. But your princess is on another ship!"
                     show={this.props.showCongratulationModal}
                     toggleModal={() => this.props.toggleCongratulationModal()}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    gameStarted: state.shared.gameStarted,
    showWarningModal: state.shared.showWarningModal,
    showCongratulationModal: state.shared.showCongratulationModal
  }
}

export default connect(
      mapStateToProps,
      { startGame, startGenerateShips, finishGenerateShips, toggleWarningModal, toggleCongratulationModal }
    )(Main);