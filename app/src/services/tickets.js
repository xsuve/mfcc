import { GET, POST } from '../utils/http';

const endpoint = '/tickets';

async function getClientTickets(clientId) {
  const response = await GET(endpoint + '/' + clientId);
  if (response.status !== 200) {
    return [];
  }

  return response.data;
}

async function buyTicket(flightId, clientId) {
  const response = await POST(endpoint + '/buy/' + flightId, { clientId });
  if (response.status !== 200) {
    return false;
  }

  return response;
}

async function cancelFlight(ticketId, flightId, clientId) {
  const response = await POST(endpoint + '/cancel/' + ticketId, {
    flightId,
    clientId,
  });
  if (response.status !== 200) {
    return false;
  }

  return response;
}

export { getClientTickets, buyTicket, cancelFlight };
