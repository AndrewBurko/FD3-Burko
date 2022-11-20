import React from "react";
import PropTypes from "prop-types";
import { mobileEvents } from "./events";
import "./MobileClient.css";

class MobileClient extends React.PureComponent{

  static propTypes = {
    client: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      fatherName: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired
    })
  };

  state = {
    client: this.props.client,
    status: this.props.client.balance >= 0 ? "Active" : "Blocked"
  };

  editClient = () => {
    mobileEvents.emit("editClient", this.state.client.id);
  };

  deleteClient = () => {
    mobileEvents.emit("deleteClient", this.state.client.id);
  };

  componentDidUpdate = (oldProps, oldState) => {
    if (this.props.client.firstName !== this.state.client.firstName ||
      this.props.client.lastName !== this.state.client.lastName ||
      this.props.client.fatherName !== this.state.client.fatherName ||
      this.props.client.balance !== this.state.client.balance) {
        this.setState({client: this.props.client});
      }

    const currentStatus = this.props.client.balance >= 0 ? "Active" : "Blocked";
    if (this.state.status !== currentStatus) {
      this.setState({status: currentStatus});
    }
  };

  render() {
    console.log("MobileClient " + this.state.client.lastName + " was rendering");

    return (
      <tr>
        <td>{this.state.client.lastName}</td>
        <td>{this.state.client.firstName}</td>
        <td>{this.state.client.fatherName}</td>
        <td>{this.state.client.balance}</td>
        <td className={this.state.status === "Active" ? "client-status_active" : "client-status_blocked"}>{this.state.status}</td>
        <td>
          <input type="button" value="Редактировать" onClick={this.editClient} />
        </td>
        <td>
          <input type="button" value="Удалить" onClick={this.deleteClient} />
        </td>
      </tr>
    )
  };
}

export default MobileClient;