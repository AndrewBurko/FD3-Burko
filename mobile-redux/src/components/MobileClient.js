import React, { useMemo } from "react";
import PropTypes from "prop-types";

import "./MobileClient.css";

function MobileClient({ client, cbDeleteClient, cbEditClient }) {

  const status = client.balance >= 0 ? "active" : "blocked";

  const deleteClient = () => {
    cbDeleteClient(client.id);
  };

  const editClient = () => {
    cbEditClient(client.id);
  }

  const memoizeedRenderResult = useMemo( () => {
    console.log("MobileClient " + client.lastName + " was rendering");

    return (
      <tr>
        <td>{client.lastName}</td>
        <td>{client.firstName}</td>
        <td>{client.fatherName}</td>
        <td>{client.balance}</td>
        <td className={"client-status_" + status}>{status}</td>
        <td>
          <input type="button" value="Редактировать" onClick={editClient} />
        </td>
        <td>
          <input type="button" value="Удалить" onClick={deleteClient} />
        </td>
      </tr>
    );
  },
  [client, cbDeleteClient]
  );

  return memoizeedRenderResult;
};

MobileClient.propTypes = {
  client: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    fatherName: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired
  }),
  cbDeleteClient: PropTypes.func.isRequired,
  cbEditClient: PropTypes.func.isRequired,
};

export default MobileClient;