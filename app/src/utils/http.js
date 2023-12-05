import axios from 'axios';

const api = 'http://localhost:3001';

async function GET(url) {
  return await axios.get(api + url);
}

async function POST(url, payload) {
  return await axios.post(api + url, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function PUT(url, payload) {
  return await axios.put(api + url, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function DELETE(url) {
  return await axios.delete(api + url);
}

export { GET, POST, PUT, DELETE };
