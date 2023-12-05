import { GET } from '../utils/http';

const endpoint = '/tickets';

async function getAll() {
  const response = await GET(endpoint);
  if (response.status !== 200) {
    return [];
  }

  return response.data;
}

export { getAll };
