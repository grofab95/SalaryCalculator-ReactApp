import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'reactstrap';

class InfoModal extends Component {
    state = {
        showModal: false
    };

    modalClosed = () => {
        this.setState({showModal: false})
    };

    render() {
        return (
            <>
                <Modal show={this.props.showModal} onHide={this.props.modalClosed}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.children}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.props.modalClosed}>
                            {this.props.buttonName}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default InfoModal;