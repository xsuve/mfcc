const db = require('../db');

async function getAllCompanies() {
  const [rows] = await db.query(`SELECT * FROM company`);

  if (!rows) {
    return [];
  }

  return rows;
}

async function getCompany(id) {
  const [rows] = await db.query(`SELECT * FROM company WHERE id = '${id}'`);

  if (!rows[0]) {
    return null;
  }

  return rows[0];
}

async function createCompany(company) {
  const result = await db.query(
    `
      INSERT INTO company
      (name)
      VALUES
      (
        '${company.name}'
      )
    `
  );

  if (result.affectedRows === 0) {
    return false;
  }

  return true;
}

async function editCompany(id, company) {
  const result = await db.query(
    `
      UPDATE company
      SET
        name = '${company.name}'
      WHERE id = '${id}'
    `
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return company;
}

async function deleteCompany(id) {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    await db.query(`UPDATE flight SET companyId = 0 WHERE companyId = ${id}`);

    await db.query(`DELETE FROM company WHERE id = ${id}`);

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

module.exports = {
  getAllCompanies,
  createCompany,
  getCompany,
  editCompany,
  deleteCompany,
};
