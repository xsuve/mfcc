const db = require('../db');

async function getClientTickets(clientId) {
  const [rows] = await db.query(
    `SELECT * FROM ticket WHERE clientId = ${clientId}`
  );

  if (!rows) {
    return [];
  }

  return rows;
}

async function buyTicket(flightId, clientId) {
  try {
    const terminalGate = _generateTerminalGate();

    (await db.getConnection()).beginTransaction();

    await db.query(
      `
        INSERT INTO ticket
        (flightId, clientId, createdAt, terminal, gate)
        VALUES
        (
          '${flightId}', '${clientId}', '${new Date().toISOString()}',
          ${terminalGate.terminal}, ${terminalGate.gate}
        )
      `
    );
    await db.query(
      `
        UPDATE flight
        SET
          seats = seats - 1
        WHERE id = '${flightId}'
      `
    );

    (await db.getConnection()).commit();

    return true;
  } catch (error) {
    console.error(error);
    (await db.getConnection()).rollback();

    return false;
  }
}

async function cancelFlight(ticketId, flightId, clientId) {
  try {
    (await db.getConnection()).beginTransaction();

    await db.query(
      `DELETE FROM ticket WHERE id = ${ticketId} AND clientId = ${clientId}`
    );
    await db.query(
      `
        UPDATE flight
        SET
          seats = seats + 1
        WHERE id = '${flightId}'
      `
    );

    (await db.getConnection()).commit();

    return true;
  } catch (error) {
    console.error(error);
    (await db.getConnection()).rollback();

    return false;
  }
}

function _generateTerminalGate() {
  const terminal = Math.floor(Math.random() * 10) + 1;
  const gate = Math.floor(Math.random() * 50) + 1;

  return { terminal, gate };
}

module.exports = {
  buyTicket,
  getClientTickets,
  cancelFlight,
};
