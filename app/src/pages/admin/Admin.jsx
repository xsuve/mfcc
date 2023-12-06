import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Flight } from '../../components';
import { getAllFlights } from '../../services/flights';

export default function Admin() {
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

  const handleOnChange = (id) => {
    const newFlights = flights.filter((flight) => flight.id !== id);
    setFlights(newFlights);
  };

  return (
    <Layout>
      <div className='flex flex-col gap-y-6'>
        <div className='flex justify-between items-center'>
          <h1 className='font-poppins text-2xl font-normal'>Flights</h1>
          <Link to='/'>
            <button className='bg-zinc-400'>Home</button>
          </Link>
        </div>
        <div className='grid grid-cols-3 gap-12'>
          {flights.map((flight) => (
            <Flight
              key={flight.id}
              data={flight}
              isAdmin
              onChange={(id) => handleOnChange(id)}
            />
          ))}
          <div className='flex flex-col justify-center items-center gap-y-6'>
            <h2 className='font-poppins text-xl font-normal'>
              Create a new flight
            </h2>
            <Link to='/admin/create-flight'>
              <button>Create flight</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
