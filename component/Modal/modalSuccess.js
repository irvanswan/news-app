import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalSuccess(props) {
  const [show, setShow] = useState(props.isShow);

/*   useEffect(() => {
    if(props.isShow){
        setEditorLoaded(true)
    }
  }, [props.isShow]); */

  const handleClose = ()=>{
      setShow(false);
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
