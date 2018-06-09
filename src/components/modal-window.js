import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

export default class ModalWindow extends Component {

  render() {
    return (
      <Modal isOpen={this.props.show} toggle={this.props.toggleModal}>
        <ModalHeader toggle={this.props.toggleModal}>{this.props.headerText}</ModalHeader>
        <ModalBody>
          {this.props.bodyText}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.toggleModal}>OK</Button>
        </ModalFooter>
      </Modal>
    )
  }
}