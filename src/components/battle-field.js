import React, { Component } from 'react';
import { connect } from 'react-redux';
import { performShipDamagedFire, performEmptyFire, finishGame, toggleWarningModal } from "../actions";

class BattleField extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.shipsCoords.length === 0 && nextProps.gameStarted) {
      this.props.finishGame();
    }
  }

  handleClick(x, y) {
    if (this.props.gameStarted) {
      if (this.ifCellUsed([x, y])) {
        this.props.toggleWarningModal();
      } else {
        if (this.props.isItemInArray(this.props.shipsCoords, [x, y])) {
          this.props.performShipDamagedFire([x, y]);
        } else {
          this.props.performEmptyFire([x, y]);
        }
      }
    }
  }

  ifCellUsed(cellCoords) {
    return this.props.isItemInArray(this.props.usedEmptyCoords, cellCoords)
    || this.props.isItemInArray(this.props.damagedShipsCoords, cellCoords)
  }

  render() {
    let cells = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let classes = "cell";

        if (this.props.damagedShipsCoords && this.props.isItemInArray(this.props.damagedShipsCoords, [i, j])) {
          classes = classes + ' red';
        }

        if (this.props.usedEmptyCoords && this.props.isItemInArray(this.props.usedEmptyCoords, [i, j])) {
          classes = classes + ' gray';
        }

        cells.push(
          <div className={classes} onClick={() => this.handleClick(i, j)} key={i * 10 + j}></div>
        )
      }
    }

    return (
      <div id="battlefield">
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
    showCongratulationModal: state.shared.showCongratulationModal
  }
}

export default connect(
  mapStateToProps,
  { performShipDamagedFire, performEmptyFire, finishGame, toggleWarningModal }
)(BattleField);