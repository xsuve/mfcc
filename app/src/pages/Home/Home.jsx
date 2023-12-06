import { useEffect, useState } from 'react';
import { Layout, Flight } from '../../components';
import { getAllFlights } from '../../services/flights';

export default function Home() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      const flights = await getAllFlights();
      if (flights.length === 0) {
        return;
      }

      setFlights(flights);
    };

    fetchFlights();
  }, []);

  return (
    <Layout>
      <div className='grid grid-cols-3'>
        {flights.map((flight) => (
          <Flight data={flight} />
        ))}
      </div>
    </Layout>
  );
}
