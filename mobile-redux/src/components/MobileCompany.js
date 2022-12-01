import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import MobileClient from "./MobileClient";
import MobileClientEditOrAddNew from "./MobileClientEditOrAddNew";
import { delClient, addClient, changeClient } from "../redux/clientsSlice";

import "./MobileCompany.css";

function MobileCompany() {

  const clients = useSelector(state => state.clients);

  const [filteredClients, setFilteredClients] = useState(null);
  const [filter, setFilter] = useState(null);
  const [workMode, setWorkMode] = useState(0); //0 - only clients list, 1 - edit client card, 2 - add new client card
  const [lastClientId, setLastClientId] = useState(null);
  const [currentClient, setCurrentClient] = useState(null);

  useEffect( () => {
    setLastClientId(clients[clients.length-1].id);
  }, []);

  const addNewClient = () => setWorkMode(2);

  const dispatch = useDispatch();

  function deleteClient(id) {
    dispatch(delClient(id));
    setWorkMode(0);

    let index;
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
  const memoizedDeleteClient = useCallback(deleteClient, []);

  function addNewClientData(obj) {
    dispatch(addClient(obj));
    setWorkMode(0);
    setLastClientId(obj.id);

    if (filter) {
      const newFilteredClientsList = [...filteredClients, obj];
      setFilteredClients(newFilteredClientsList);
    }
  };

  function closeEditBlock() {
    setWorkMode(0);
  };

  function editClient(id) {
    setWorkMode(1);
    clients.forEach( v => {
      if (v.id === id) {
        setCurrentClient(v);
      }
    });
  };

  function editClientData(obj, id) {
    dispatch(changeClient({newClientData: obj, currentClientId: id}));
    setWorkMode(0);

    let index;
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

  function showAllClients() {
    if (filter) {
      setFilter(null);
      setWorkMode(0);
    }
  };

  function showActiveClients() {
    if (filter !== "active") {
      const activeClients = clients.filter( v => (v.balance >= 0));
      setFilteredClients(activeClients);
      setFilter("active");
      setWorkMode(0);
    }
  };

  function showBlockedClients() {
    if (filter !== "blocked") {
      const blockedClients = clients.filter( v => (v.balance < 0));
      setFilteredClients(blockedClients);
      setFilter("blocked");
      setWorkMode(0);
    }
  };

  let clientsCode;
  if (filter) {
    clientsCode = filteredClients.map( v =>
      <MobileClient
        key={v.id}
        client={v}
        cbDeleteClient={memoizedDeleteClient}
        cbEditClient={editClient}
      />);
    }
  else {
    clientsCode = clients.map( v =>
    <MobileClient
      key={v.id}
      client={v}
      cbDeleteClient={memoizedDeleteClient}
      cbEditClient={editClient}
    />);
  };

  const memoizeedRenderResult = useMemo( () => {
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
            cbEditClientData={editClientData}
            cbCloseEditBlock={closeEditBlock}
          />
        }

        {
          workMode === 2 &&
          <MobileClientEditOrAddNew
            workMode={workMode}
            lastClientId={lastClientId}
            cbAddNewClientData={addNewClientData}
            cbCloseEditBlock={closeEditBlock}
          />
        }
      </div>
    );
  },
  [clients, workMode, currentClient, filter]
  );
  return memoizeedRenderResult;
}

export default MobileCompany;