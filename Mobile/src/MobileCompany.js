import React from "react";
import PropTypes from "prop-types";

import MobileClient from "./MobileClient";
import MobileClientEditOrAddNew from "./MobileClientEditOrAddNew";
import { mobileEvents } from "./events";
import "./MobileCompany.css";

class MobileCompany extends React.PureComponent{

  static propTypes = {
    clients: PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        fatherName: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired
      })
    ),
  };

  state = {
    clients: this.props.clients,
    filteredClients: null,
    filter: null,
    workMode: 0, //0 - only clients list, 1 - edit client card, 2 - add new client card
    lastClientId: this.props.clients[this.props.clients.length-1].id,
    currentClient: null
  };

  componentDidMount = () => {
    mobileEvents.addListener("addNewClient", this.addClientToClientsArr);
    mobileEvents.addListener("closeEditBlock", this.cancelEditOrAddNewClient);
    mobileEvents.addListener("editClient", this.editClient);
    mobileEvents.addListener("editClientData", this.editClientData);
    mobileEvents.addListener("deleteClient", this.deleteClient);
  };

  componentWillUnmount = () => {
    mobileEvents.removeListener("addNewClient", this.addClientToClientsArr);
    mobileEvents.removeListener("closeEditBlock", this.cancelEditOrAddNewClient);
    mobileEvents.removeListener("editClient", this.editClient);
    mobileEvents.removeListener("editClientData", this.editClientData);
    mobileEvents.addListener("deleteClient", this.deleteClient);
  };

  addNewClient = () => this.setState({workMode: 2});

  cancelEditOrAddNewClient = () => this.setState({workMode: 0});

  editClient = (id) => {
    this.state.clients.forEach( v => {
      if (v.id === id) {
        this.setState({currentClient: v, workMode: 1});
      }
    })
  };

  addClientToClientsArr = (obj) => {
    const newClientsList = [...this.state.clients, obj];
    this.setState({clients: newClientsList, workMode: 0, lastClientId: obj.id});

    if (this.state.filter) {
      const newFilteredClientsList = [...this.state.filteredClients, obj];
      this.setState({filteredClients: newFilteredClientsList});
    }
  };

  editClientData = (obj, id) => {
    let index;

    this.state.clients.forEach( (v, i) => {
      if (v.id === id) {
        index = i;
      }
    })
    const editedClientsArr = [
      ...this.state.clients.slice(0, index),
      {...this.state.clients[index], ...obj},
      ...this.state.clients.slice(index+1)
    ];
    this.setState({clients: editedClientsArr, workMode: 0});

    if (this.state.filter) {
      this.state.filteredClients.forEach( (v, i) => {
        if (v.id === id) {
          index = i;
        }
      })
      const editedFilteredClientsList = [
        ...this.state.filteredClients.slice(0, index),
        {...this.state.filteredClients[index], ...obj},
        ...this.state.filteredClients.slice(index+1)
      ];
      this.setState({filteredClients: editedFilteredClientsList});
    }
  };

  deleteClient = (id) => {
    let index;

    this.state.clients.forEach( (v, i) => {
      if (v.id === id) {
        index = i;
      }
    });
    const newClientsArr = this.state.clients.slice();
    newClientsArr.splice(index, 1);
    this.setState({clients: newClientsArr});

    if (this.state.filter) {
      this.state.filteredClients.forEach( (v, i) => {
        if (v.id === id) {
          index = i;
        }
      });
      const newFilteredClientsArr = this.state.filteredClients.slice();
      newFilteredClientsArr.splice(index, 1);
      this.setState({filteredClients: newFilteredClientsArr});
    }
  };

  showActiveClients = () => {
    if (this.state.filter !== "active") {
      const activeClients = this.state.clients.filter( v => (v.balance >= 0));
      this.setState({filteredClients: activeClients, filter: "active"});
    }
  };

  showBlockedClients = () => {
    if (this.state.filter !== "blocked") {
      const blockedClients = this.state.clients.filter( v => (v.balance < 0));
      this.setState({filteredClients: blockedClients, filter: "blocked"});
    }
  };

  showAllClients = () => {
    if (this.state.filter) {
      this.setState({filter: null});
    }
  };

  render() {
    console.log("MobileCompany was rendering");

    let clientsCode;
    if (this.state.filter) {
      clientsCode = this.state.filteredClients.map( v =>
        <MobileClient
          key={v.id}
          client={v}
        />);
      }
    else {
      clientsCode = this.state.clients.map( v =>
      <MobileClient
        key={v.id}
        client={v}
      />);
    }

    return (
      <div className="mobile-company-block">
        <input type="button" value="Все" onClick={this.showAllClients} />
        <input type="button" value="Активные" onClick={this.showActiveClients} />
        <input type="button" value="Заблокированные" onClick={this.showBlockedClients} />
        <hr />
        <table>
          <thead>
            <tr>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Отчество</th>
              <th>Баланс</th>
              <th>Статус</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {clientsCode}
          </tbody>
        </table>
        <input className="mobilecompany-addclient-btn" type="button" value="Добавить клиента" onClick={this.addNewClient} />

        {
          this.state.workMode === 1 &&
          <MobileClientEditOrAddNew
            client={this.state.currentClient}
            workMode={this.state.workMode}
            lastClientId={this.state.lastClientId}
            key={this.state.currentClient.id}
          />
        }

        {
          this.state.workMode === 2 &&
          <MobileClientEditOrAddNew
            workMode={this.state.workMode}
            lastClientId={this.state.lastClientId}
          />
        }
      </div>
    )
  };
}

export default MobileCompany;