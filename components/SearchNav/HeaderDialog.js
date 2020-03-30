import React, { useState } from "react";
import Select from "react-select";

import { Modal, Button } from "antd";
import httpHeaderFields from "./httpHeaderFields";

{
  /* <Select
  inputId="react-select-single"
  label="key"
  placeholder="Search a HTTP field"
  options={suggestions}
  value={single}
  onChange={handleChangeSingle}
  autoFocus
  fullWidth
/> */
}

export default function HeaderDialog() {
  const [open, setOpen] = useState(false);
  const [single, setSingle] = useState(null);

  function toggleModal() {
    setOpen(!open);
  }

  function handleChangeSingle(value) {
    setSingle(value);
  }

  const suggestions = httpHeaderFields.map(label => ({ label }));
  return (
    <Modal
      title="Vertically centered modal dialog"
      centered
      visible={open}
      onOk={toggleModal}
      onCancel={toggleModal}
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
  );
}
