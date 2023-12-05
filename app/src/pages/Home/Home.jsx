import { useEffect, useState } from 'react';

import { Layout, TicketBox } from '../../components';

import * as ticketsService from '../../services/tickets';

export default function Home() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const tickets = await ticketsService.getAll();
      if (tickets.length === 0) {
        return;
      }

      setTickets(tickets);
    };

    fetchTickets();
  }, []);

  return (
    <Layout>
      <div className='grid grid-cols-3'>
        {tickets.map((ticket) => (
          <TicketBox data={ticket} />
        ))}
      </div>
    </Layout>
  );
}
