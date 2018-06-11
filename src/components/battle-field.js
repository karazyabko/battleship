import React, { Component } from 'react';
import { connect } from 'react-redux';
import { performShipDamagedFire, performEmptyFire, finishGame, toggleWarningModal } from "../actions";

class BattleField extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.shipsCoords.length === 0 && nextProps.gameStarted) {
      this.props.finishGame('Lose');
    }

    if (nextProps.opponentShipsCoords.length === 0 && nextProps.gameStarted) {
      this.props.finishGame('Win');
    }
  }

  handleClick(x, y, owner) {
    if (this.props.gameStarted) {
      if (owner === 'opponent') {
        if (this.ifCellUsed([x, y])) {
          this.props.toggleWarningModal();
        } else {
          if (this.props.isItemInArray(this.props.opponentShipsCoords, [x, y])) {
            this.props.performShipDamagedFire(owner, [x, y]);
          } else {
            this.props.performEmptyFire(owner, [x, y]);
            this.simulateOpponentTurn();
          }
        }
      } else {
        if (this.props.isItemInArray(this.props.shipsCoords, [x, y])) {
          this.props.performShipDamagedFire(owner, [x, y]);
          this.simulateOpponentTurn();
        } else {
          this.props.performEmptyFire(owner, [x, y]);
        }
      }
    }
  }

  simulateOpponentTurn() {
    let coords = [];
    do {
      coords = [this.props.getRandomCoord(), this.props.getRandomCoord()];
    } while (this.props.isItemInArray(this.props.usedEmptyCoords, coords)
            || this.props.isItemInArray(this.props.damagedShipsCoords, coords));

    this.handleClick(coords[0], coords[1], 'player');
  }

  ifCellUsed(cellCoords) {
    return this.props.isItemInArray(this.props.opponentUsedEmptyCoords, cellCoords)
    || this.props.isItemInArray(this.props.opponentDamagedShipsCoords, cellCoords)
  }

  render() {
    let cells = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let classes = "cell";
        if (this.props.owner === 'player') {
          if (this.props.shipsCoords && this.props.isItemInArray(this.props.shipsCoords, [i, j])) {
            classes = classes + ' green';
          }

          if (this.props.damagedShipsCoords && this.props.isItemInArray(this.props.damagedShipsCoords, [i, j])) {
            classes = classes + ' red';
          }

          if (this.props.usedEmptyCoords && this.props.isItemInArray(this.props.usedEmptyCoords, [i, j])) {
            classes = classes + ' gray';
          }

          cells.push(
            <div className={classes} key={i * 10 + j}></div>
          )
        } else {
          if (this.props.opponentDamagedShipsCoords && this.props.isItemInArray(this.props.opponentDamagedShipsCoords, [i, j])) {
            classes = classes + ' red';
          }

          if (this.props.opponentUsedEmptyCoords && this.props.isItemInArray(this.props.opponentUsedEmptyCoords, [i, j])) {
            classes = classes + ' gray';
          }

          cells.push(
            <div className={classes} onClick={() => this.handleClick(i, j, this.props.owner)} key={i * 10 + j}></div>
          )
        }
      }
    }

    return (
      <div className="battlefield">
        {cells}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    gameStarted: state.shared.gameStarted,
    shipsCoords: state.shared.shipsCoords,
    usedEmptyCoords: state.shared.usedEmptyCoords,
    damagedShipsCoords: state.shared.damagedShipsCoords,
    opponentShipsCoords: state.shared.opponentShipsCoords,
    opponentUsedEmptyCoords: state.shared.opponentUsedEmptyCoords,
    opponentDamagedShipsCoords: state.shared.opponentDamagedShipsCoords,
    showCongratulationModal: state.shared.showCongratulationModal,
    showLoseModal: state.shared.showLoseModal
  }
}

export default connect(
  mapStateToProps,
  { performShipDamagedFire, performEmptyFire, finishGame, toggleWarningModal}
)(BattleField);