import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Flight, Company } from '../../components';
import { getAllCompanies } from '../../services/companies';
import { getAllFlights } from '../../services/flights';

export default function Admin() {
  const [flights, setFlights] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const flights = await getAllFlights();
      const companies = await getAllCompanies();

      if (flights.length === 0 && companies.length) {
        return;
      }

      setFlights(flights);
      setCompanies(companies);
    };

    fetchData();
  }, []);

  const handleOnChange = (id) => {
    const newCompanies = companies.filter((company) => company.id !== id);
    setCompanies(newCompanies);
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

      <div className='flex flex-col gap-y-6 mt-24'>
        <h1 className='font-poppins text-2xl font-normal'>Companies</h1>
        <div className='grid grid-cols-3 gap-12'>
          {companies.map((company) => (
            <Company
              key={company.id}
              data={company}
              isAdmin
              onChange={(id) => handleOnChange(id)}
            />
          ))}
          <div className='flex flex-col justify-center items-center gap-y-6'>
            <h2 className='font-poppins text-xl font-normal'>
              Create a new company
            </h2>
            <Link to='/admin/create-company'>
              <button>Create company</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
