import React from "react";
import { PopupboxManager } from "react-popupbox";
import { Container, Row } from "react-bootstrap";

export default function Popup({
  title,
  style = {},
  close = true,
  onClose = () => {},
  children,
}) {
  function handleClose() {
    PopupboxManager.close();
    onClose();
  }

  return (
    <Container style={style}>
      {close && <button className="btn-corner-cross" onClick={handleClose} />}
      <Row className="justify-content-center mb-4 align-items-center">
        <h2 className="popup-title mb-0">{title}</h2>
      </Row>
      {children}
    </Container>
  );
}

export function openPopup(title, close, onCloseAction) {
  const content = (
    <Popup title={title} close={close} onCloseAction={onCloseAction} />
  );
  PopupboxManager.open({
    content,
    config: {
      fadeIn: true,
      fadeInSpeed: 400,
    },
  });
}
