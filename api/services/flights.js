const db = require('../db');

async function getAllFlights() {
  const rows = await db.query(`SELECT * FROM flight`);

  if (!rows) {
    return [];
  }

  return rows;
}

async function getFlight(id) {
  const rows = await db.query(`SELECT * FROM flight WHERE id = '${id}'`);

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
      (id, fromAirport, fromTime, fromStops, toAirport, toTime, toStops, boarding, departure, arrival, company, seats, price)
      VALUES
      (
        '${id}', '${flight.fromAirport}', '${flight.fromTime}', ${flight.fromStops},
        '${flight.toAirport}', '${flight.toTime}', ${flight.toStops},
        '${flight.boarding}', '${flight.departure}', '${flight.arrival}',
        '${flight.company}', ${flight.seats}, ${flight.price}
      )
    `
  );

  if (!result.affectedRows) {
    return false;
  }

  return true;
}

async function editFlight(id, flight) {
  const result = await db.query(
    `
      UPDATE flight
      SET
        fromAirport = '${flight.fromAirport}', fromTime = '${flight.fromTime}', fromStops = ${flight.fromStops},
        toAirport = '${flight.toAirport}', toTime = '${flight.toTime}', toStops = ${flight.toStops},
        boarding = '${flight.boarding}', departure='${flight.departure}', arrival = '${flight.arrival}',
        company = '${flight.company}', seats = ${flight.seats}, price = ${flight.price}
      WHERE id = '${id}'
    `
  );

  if (!result.affectedRows) {
    return null;
  }

  return flight;
}

async function deleteFlight(id) {
  const result = await db.query(`DELETE FROM flight WHERE id = '${id}'`);

  if (!result.affectedRows) {
    return false;
  }

  return true;
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
