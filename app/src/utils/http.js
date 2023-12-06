import axios from 'axios';

const api = 'http://localhost:3001';

async function GET(url) {
  try {
    return await axios.get(api + url);
  } catch (error) {
    console.error(error.message);
  }
}

async function POST(url, payload) {
  try {
    return await axios.post(api + url, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function PUT(url, payload) {
  try {
    return await axios.put(api + url, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error.message);
  }
}

async function DELETE(url) {
  try {
    return await axios.delete(api + url);
  } catch (error) {
    console.error(error.message);
  }
}

export { GET, POST, PUT, DELETE };
