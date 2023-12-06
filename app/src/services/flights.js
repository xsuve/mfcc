import { DELETE, GET, POST, PUT } from '../utils/http';

const endpoint = '/flights';

async function getAllFlights() {
  const response = await GET(endpoint);
  if (response.status !== 200) {
    return [];
  }

  return response.data;
}

async function getFlight(id) {
  const response = await GET(endpoint + '/' + id);
  if (response.status !== 200) {
    return null;
  }

  return response.data;
}

async function createFlight(flight) {
  const response = await POST(endpoint, flight);
  if (response.status !== 200) {
    return false;
  }

  return response;
}

async function editFlight(id, flight) {
  const response = await PUT(endpoint + '/' + id, flight);
  if (response.status !== 200) {
    return false;
  }

  return response;
}

async function deleteFlight(id) {
  const response = await DELETE(endpoint + '/' + id);
  if (response.status !== 200) {
    return false;
  }

  return true;
}

export { getAllFlights, createFlight, getFlight, editFlight, deleteFlight };
