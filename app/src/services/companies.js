import { DELETE, GET, POST, PUT } from '../utils/http';

const endpoint = '/companies';

async function getAllCompanies() {
  const response = await GET(endpoint);
  if (response.status !== 200) {
    return [];
  }

  return response.data;
}

async function getCompany(id) {
  const response = await GET(endpoint + '/' + id);
  if (response.status !== 200) {
    return null;
  }

  return response.data;
}

async function createCompany(flight) {
  const response = await POST(endpoint, flight);
  if (response.status !== 200) {
    return false;
  }

  return response;
}

async function editCompany(id, flight) {
  const response = await PUT(endpoint + '/' + id, flight);
  if (response.status !== 200) {
    return false;
  }

  return response;
}

async function deleteCompany(id) {
  const response = await DELETE(endpoint + '/' + id);
  if (response.status !== 200) {
    return false;
  }

  return true;
}

export {
  getAllCompanies,
  createCompany,
  getCompany,
  editCompany,
  deleteCompany,
};
