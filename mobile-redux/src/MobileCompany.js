import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import MobileClient from "./MobileClient";
//import MobileClientEditOrAddNew from "./MobileClientEditOrAddNew";
import { mobileEvents } from "./events";
//import "./MobileCompany.css";

function MobileCompany( {clientsArr} ) {

  const [clients, setClients] = useState(clientsArr);
  console.log(clients);
  const [filteredClients, setFilteredClients] = useState(null);
  const [filter, setFilter] = useState(null);
  const [workMode, setWorkMode] = useState(0); //0 - only clients list, 1 - edit client card, 2 - add new client card
  const [lastClientId, setLastClientId] = useState(clients[clients.length-1].id);
  const [currentClient, setCurrentClient] = useState(null);

  useEffect( () => {
    mobileEvents.addListener("addNewClient", addClientToClientsArr);
    mobileEvents.addListener("closeEditBlock", cancelEditOrAddNewClient);
    mobileEvents.addListener("editClient", editClient);
    mobileEvents.addListener("editClientData", editClientData);
    mobileEvents.addListener("deleteClient", deleteClient);
    return () => {
      mobileEvents.removeListener("addNewClient", addClientToClientsArr);
      mobileEvents.removeListener("closeEditBlock", cancelEditOrAddNewClient);
      mobileEvents.removeListener("editClient", editClient);
      mobileEvents.removeListener("editClientData", editClientData);
      mobileEvents.addListener("deleteClient", deleteClient);
    };
  }, []
  );

  const addNewClient = () => setWorkMode(2);

  const cancelEditOrAddNewClient = () => setWorkMode(0);

  const editClient = (id) => {
    clients.forEach( v => {
      if (v.id === id) {
        setCurrentClient(v);
        setWorkMode(1);
      }
    })
  };

  const addClientToClientsArr = (obj) => {
    const newClientsList = [...clients, obj];
    setClients(newClientsList);
    setWorkMode(0);
    setLastClientId(obj.id);

    if (filter) {
      const newFilteredClientsList = [...filteredClients, obj];
      setFilteredClients(newFilteredClientsList);
    }
  };

  const editClientData = (obj, id) => {
    let index;

    clients.forEach( (v, i) => {
      if (v.id === id) {
        index = i;
      }
    })
    const editedClientsArr = [
      ...clients.slice(0, index),
      {...clients[index], ...obj},
      ...clients.slice(index+1)
    ];
    setClients(editedClientsArr);
    setWorkMode(0);

    if (filter) {
      filteredClients.forEach( (v, i) => {
        if (v.id === id) {
          index = i;
        }
      })
      const editedFilteredClientsList = [
        ...filteredClients.slice(0, index),
        {...filteredClients[index], ...obj},
        ...filteredClients.slice(index+1)
      ];
      setFilteredClients(editedFilteredClientsList);
    }
  };

  const deleteClient = (id) => {
    let index;

    clients.forEach( (v, i) => {
      if (v.id === id) {
        index = i;
      }
    });
    const newClientsArr = clients.slice();
    console.log(newClientsArr);
    newClientsArr.splice(index, 1);
    setClients(newClientsArr);

    if (filter) {
      filteredClients.forEach( (v, i) => {
        if (v.id === id) {
          index = i;
        }
      });
      const newFilteredClientsArr = filteredClients.slice();
      newFilteredClientsArr.splice(index, 1);
      setFilteredClients(newFilteredClientsArr);
    }
  };

  const showActiveClients = () => {
    if (filter !== "active") {
      const activeClients = clients.filter( v => (v.balance >= 0));
      setFilteredClients(activeClients);
      setFilter("active");
    }
  };

  const showBlockedClients = () => {
    if (filter !== "blocked") {
      const blockedClients = clients.filter( v => (v.balance < 0));
      setFilteredClients(blockedClients);
      setFilter("blocked");
    }
  };

  const showAllClients = () => {
    if (filter) {
      setFilter(null);
    }
  };

  let clientsCode;
    if (filter) {
      clientsCode = filteredClients.map( v =>
        <MobileClient
          key={v.id}
          client={v}
        />);
      }
    else {
      clientsCode = clients.map( v =>
      <MobileClient
        key={v.id}
        client={v}
      />);
    }

  console.log("MobileCompany was rendering");
  return (
    <div className="mobile-company-block">
      <input type="button" value="Все" onClick={showAllClients} />
      <input type="button" value="Активные" onClick={showActiveClients} />
      <input type="button" value="Заблокированные" onClick={showBlockedClients} />
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
      <input className="mobilecompany-addclient-btn" type="button" value="Добавить клиента" onClick={addNewClient} />

      {
        workMode === 1 &&
        <MobileClientEditOrAddNew
          client={currentClient}
          workMode={workMode}
          lastClientId={lastClientId}
          key={currentClient.id}
        />
      }

      {
        workMode === 2 &&
        <MobileClientEditOrAddNew
          workMode={workMode}
          lastClientId={lastClientId}
        />
      }
    </div>
  );
}

MobileCompany.propTypes = {
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      fatherName: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired
    })
  )
};

export default MobileCompany;