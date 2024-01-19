const db = require('../db');

async function getAllFlights() {
  const [rows] = await db.query(`SELECT * FROM flight`);

  if (!rows) {
    return [];
  }

  return rows;
}

async function getFlight(id) {
  const [rows] = await db.query(`SELECT * FROM flight WHERE id = '${id}'`);

  if (!rows[0]) {
    return null;
  }

  return rows[0];
}

async function createFlight(flight) {
  const id = _generateFlightId();

  const result = await db.query(
    `
      INSERT INTO flight
      (id, fromAirport, fromTime, toAirport, toTime, boarding, departure, arrival, companyId, seats, price)
      VALUES
      (
        '${id}', '${flight.fromAirport}', '${flight.fromTime}',
        '${flight.toAirport}', '${flight.toTime}',
        '${flight.boarding}', '${flight.departure}', '${flight.arrival}',
        '${flight.companyId}', ${flight.seats}, ${flight.price}
      )
    `
  );

  if (result.affectedRows === 0) {
    return false;
  }

  return true;
}

async function editFlight(id, flight) {
  const result = await db.query(
    `
      UPDATE flight
      SET
        fromAirport = '${flight.fromAirport}', fromTime = '${flight.fromTime}',
        toAirport = '${flight.toAirport}', toTime = '${flight.toTime}',
        boarding = '${flight.boarding}', departure = '${flight.departure}', arrival = '${flight.arrival}',
        companyId = '${flight.companyId}', seats = ${flight.seats}, price = ${flight.price}
      WHERE id = '${id}'
    `
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return flight;
}

async function deleteFlight(id) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    await db.query(`DELETE FROM ticket WHERE flightId = '${id}'`);

    await db.query(`DELETE FROM flight WHERE id = '${id}'`);

    await connection.commit();

    return true;
  } catch (error) {
    console.error(error);
    await connection.rollback();

    return false;
  } finally {
    await connection.release();
  }
}

function _generateFlightId() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';

  const randomLetters =
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)];
  const randomNumbers =
    numbers[Math.floor(Math.random() * numbers.length)] +
    numbers[Math.floor(Math.random() * numbers.length)] +
    numbers[Math.floor(Math.random() * numbers.length)];

  return randomLetters + randomNumbers;
}

module.exports = {
  getAllFlights,
  createFlight,
  getFlight,
  editFlight,
  deleteFlight,
};
