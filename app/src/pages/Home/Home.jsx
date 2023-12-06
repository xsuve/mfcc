import { useEffect, useState } from 'react';
import { Layout, Flight, Ticket } from '../../components';
import { getAllFlights } from '../../services/flights';
import { getClientTickets } from '../../services/tickets';
import { Link } from 'react-router-dom';

export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [flights, setFlights] = useState([]);

  const fetchData = async () => {
    const tickets = await getClientTickets(1);
    setTickets(tickets);

    const flights = await getAllFlights();
    if (flights.length === 0) {
      return;
    }

    const filtered = flights.filter(
      (flight) => !tickets.some((ticket) => ticket.flightId === flight.id)
    );
    setFlights(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnChange = (_) => {
    fetchData();
  };

  return (
    <Layout>
      <div className='flex flex-col gap-y-12'>
        <div className='flex flex-col gap-y-6'>
          <div className='flex justify-between items-center'>
            <h1 className='font-poppins text-2xl font-normal'>Flights</h1>
            <Link to='/admin'>
              <button className='bg-zinc-400'>Admin</button>
            </Link>
          </div>
          <div className='grid grid-cols-3 gap-12'>
            {flights.length ? (
              flights.map((flight) => (
                <Flight
                  key={flight.id}
                  data={flight}
                  onChange={(id) => handleOnChange(id)}
                />
              ))
            ) : (
              <h6 className='font-poppins text-zinc-500 font-normal text-base'>
                No flight available at the moment.
              </h6>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-y-6'>
          <h1 className='font-poppins text-2xl font-normal'>My tickets</h1>
          <div className='flex flex-col gap-y-6'>
            {tickets.length ? (
              tickets.map((ticket) => (
                <Ticket
                  key={ticket.id}
                  data={ticket}
                  onChange={(id) => handleOnChange(id)}
                />
              ))
            ) : (
              <h6 className='font-poppins text-zinc-500 font-normal text-base'>
                No tickets booked.
              </h6>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
