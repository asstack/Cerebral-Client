import React, {Component} from 'react'
import { createModal } from 'react-modal-promise'
import { Modal } from 'react-bootstrap'

const MyModal = ({ open, close, title, message}) => (
    <Modal show={open} onHide={() => close()}>
      <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <button variant="secondary" onClick={() => close(false)}>
          No
        </button>
        <button variant="primary" onClick={() => close(true)}>
          Yes
        </button>
      </Modal.Footer>
    </Modal>
  )
  
  const promiseModal = createModal(MyModal)

  export default promiseModal