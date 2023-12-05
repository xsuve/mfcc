const db = require('../db');

async function getAll() {
  // const rows = await db.query(
  //   `
  //     SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank
  //     FROM programming_languages
  //   `
  // );

  return [
    {
      id: 1,
      from: { airport: 'OTP', time: '10:45', stops: 2 },
      to: { airport: 'CFU', time: '07:00', stops: 1 },
      flight: 'GE353',
      boarding: '10:20',
      departure: '11:00',
      seat: '19A',
      gate: 34,
      arrival: '17:30',
      company: 'WizzAir',
      price: 45.99,
    },
  ];
}

module.exports = {
  getAll,
};
