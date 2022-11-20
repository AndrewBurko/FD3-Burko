import React from "react";
import PropTypes from "prop-types";

import { mobileEvents } from "./events";
import "./MobileClientEditOrAddNew.css";

class MobileClientEditOrAddNew extends React.PureComponent{

  static propTypes = {
    client: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      fatherName: PropTypes.string,
      balance: PropTypes.number,
      id: PropTypes.number
    }),
    workMode: PropTypes.number.isRequired,
    lastClientId: PropTypes.number.isRequired
  };

  state = {
    firstName: this.props.workMode === 1 ? this.props.client.firstName : "",
    lastName: this.props.workMode === 1 ? this.props.client.lastName : "",
    fatherName: this.props.workMode === 1 ? this.props.client.fatherName : "",
    balance: this.props.workMode === 1 ? this.props.client.balance : "",
    id: this.props.workMode === 1 ? this.props.client.id : this.props.lastClientId+1
  };

  lastNameRef = React.createRef();
  firstNameRef = React.createRef();
  fatherNameRef = React.createRef();
  balanceRef = React.createRef();

  saveClient = () => {
    if (this.props.workMode === 2) {
      const newClient = {
        firstName: this.firstNameRef.current.value,
        lastName: this.lastNameRef.current.value,
        fatherName: this.fatherNameRef.current.value,
        balance: Number(this.balanceRef.current.value),
        id: this.state.id
      };
      mobileEvents.emit("addNewClient", newClient);

    } else {
      const changedData = {};
      if (this.state.firstName !== this.firstNameRef.current.value) {
        changedData.firstName = this.firstNameRef.current.value;
      }
      if (this.state.lastName !== this.lastNameRef.current.value) {
        changedData.lastName = this.lastNameRef.current.value;
      }
      if (this.state.fatherName !== this.fatherNameRef.current.value) {
        changedData.fatherName = this.fatherNameRef.current.value;
      }
      if (this.state.balance !== Number(this.balanceRef.current.value)) {
        changedData.balance = Number(this.balanceRef.current.value);
      }
      if (Object.keys(changedData).length > 0) {
        mobileEvents.emit("editClientData", changedData, this.state.id);
      }
    }
  };

  closeEditBlock = () => mobileEvents.emit("closeEditBlock");

  render() {
    console.log(this.props.workMode === 1 ? "Edit client card was rendering" : "Add new client card was rendering");

    return (
      <div className="client-card">
        <h2>
          {this.props.workMode === 1 ? "Редактировать клиента" : "Добавить нового клиента"}
        </h2>
        <label htmlFor="lastName">Фамилия
          <input type="text" id="lastName" defaultValue={this.state.lastName} ref={this.lastNameRef} />
        </label>
        <label htmlFor="firstName">Имя
          <input type="text" id="firstName" defaultValue={this.state.firstName} ref={this.firstNameRef} />
        </label>
        <label htmlFor="fatherName">Отчество
          <input type="text" id="fatherName" defaultValue={this.state.fatherName} ref={this.fatherNameRef} />
        </label>
        <label htmlFor="balance">Баланс
          <input type="text" id="balance" defaultValue={this.state.balance} ref={this.balanceRef} />
        </label>

        <input className="client-card-savebtn" type="button" value={this.props.workMode === 1 ? "Изменить" : "Добавить"}
          onClick={this.saveClient} />
        <input className="client-card-cancelbtn" type="button" value="Отмена" onClick={this.closeEditBlock} />
      </div>
    )
  };
}

export default MobileClientEditOrAddNew;