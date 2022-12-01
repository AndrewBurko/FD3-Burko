import React, { useState } from "react";
import PropTypes from "prop-types";

import "./MobileClientEditOrAddNew.css";

function MobileClientEditOrAddNew(props) {

  const [firstName, setFirstName] = useState(props.workMode === 1 ? props.client.firstName : "");
  const [lastName, setLastName] = useState(props.workMode === 1 ? props.client.lastName : "");
  const [fatherName, setFatherName] = useState(props.workMode === 1 ? props.client.fatherName : "");
  const [balance, setBalance] = useState(props.workMode === 1 ? props.client.balance : "");
  const [id, setId] = useState(props.workMode === 1 ? props.client.id : props.lastClientId+1);

  const lastNameRef = React.createRef();
  const firstNameRef = React.createRef();
  const fatherNameRef = React.createRef();
  const balanceRef = React.createRef();

   function saveClient() {
    if (props.workMode === 2) {
      const newClient = {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        fatherName: fatherNameRef.current.value,
        balance: Number(balanceRef.current.value),
        id: id,
      };
      props.cbAddNewClientData(newClient);

    } else {
      const changedData = {};
      if (firstName !== firstNameRef.current.value) {
        changedData.firstName = firstNameRef.current.value;
      }
      if (lastName !== lastNameRef.current.value) {
        changedData.lastName = lastNameRef.current.value;
      }
      if (fatherName !== fatherNameRef.current.value) {
        changedData.fatherName = fatherNameRef.current.value;
      }
      if (balance !== Number(balanceRef.current.value)) {
        changedData.balance = Number(balanceRef.current.value);
      }
      if (Object.keys(changedData).length > 0) {
        props.cbEditClientData(changedData, id);
      }
    }
  };

  function closeEditBlock() {
    props.cbCloseEditBlock();
  };

  console.log(props.workMode === 1 ? "Edit client card was rendering" : "Add new client card was rendering");

  return (
    <div className="client-card">
      <h2>
        {props.workMode === 1 ? "Редактировать клиента" : "Добавить нового клиента"}
      </h2>
      <label htmlFor="lastName">Фамилия
        <input type="text" id="lastName" defaultValue={lastName} ref={lastNameRef} />
      </label>
      <label htmlFor="firstName">Имя
        <input type="text" id="firstName" defaultValue={firstName} ref={firstNameRef} />
      </label>
      <label htmlFor="fatherName">Отчество
        <input type="text" id="fatherName" defaultValue={fatherName} ref={fatherNameRef} />
      </label>
      <label htmlFor="balance">Баланс
        <input type="text" id="balance" defaultValue={balance} ref={balanceRef} />
      </label>

      <input className="client-card-savebtn" type="button" value={props.workMode === 1 ? "Изменить" : "Добавить"}
        onClick={saveClient} />
      <input className="client-card-cancelbtn" type="button" value="Отмена" onClick={closeEditBlock} />
    </div>
  );
}

MobileClientEditOrAddNew.propTypes = {
  client: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    fatherName: PropTypes.string,
    balance: PropTypes.number,
    id: PropTypes.number
  }),
  workMode: PropTypes.number.isRequired,
  lastClientId: PropTypes.number.isRequired,
  cbAddNewClientData: PropTypes.func,
  cbCloseEditBlock: PropTypes.func.isRequired,
  cbEditClientData: PropTypes.func,
};

export default MobileClientEditOrAddNew;