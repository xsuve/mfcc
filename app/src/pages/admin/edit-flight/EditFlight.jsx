import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../../../components';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { airports } from '../../../utils/selectOptions';
import { getFlight, editFlight } from '../../../services/flights';
import { getAllCompanies } from '../../../services/companies';

export default function EditFlight() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [companies, setCompanies] = useState([]);

  const [formData, setFormData] = useState();

  useEffect(() => {
    const fetchFlight = async () => {
      const flight = await getFlight(id);
      const companies = await getAllCompanies();
      if (!flight && companies.lentgh === 0) {
        return;
      }

      setFormData(flight);
      setCompanies(companies);
    };

    fetchFlight();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).every((item) => item !== '')) {
      const response = await editFlight(id, formData);
      if (!response) {
        alert('Failed to edit flight.');
      }

      navigate('/admin');
    } else {
      alert('Please fill all the fields.');
    }
  };

  return (
    <Layout>
      {formData ? (
        <div className='flex flex-col gap-y-12'>
          <Link to='/admin'>
            <h6 className='font-poppins text-zinc-500 font-normal text-base flex items-center gap-x-3'>
              <ArrowLeftIcon className='w-4 h-4 text-zinc-500' />
              Back
            </h6>
          </Link>
          <h1 className='font-poppins text-2xl font-normal'>Edit flight</h1>
          <form className='w-1/2 flex flex-col gap-y-12' noValidate>
            <div className='flex justify-between gap-x-6'>
              <div className='flex flex-col gap-y-3 w-full'>
                <h6 className='font-poppins text-lg font-normal'>From</h6>
                <div className='flex flex-col gap-y-1'>
                  <label>Airport</label>
                  <select
                    value={formData.fromAirport}
                    name='fromAirport'
                    onChange={(e) =>
                      setFormData({ ...formData, fromAirport: e.target.value })
                    }
                  >
                    <option value='' disabled>
                      Select flight from
                    </option>
                    {airports.map((airport) => (
                      <option key={airport.code} value={airport.code}>
                        {airport.code} - {airport.city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='flex flex-col gap-y-1 w-full'>
                  <label>Time</label>
                  <input
                    name='fromTime'
                    autoComplete='off'
                    placeholder='Flight from time'
                    value={formData.fromTime}
                    onChange={(e) =>
                      setFormData({ ...formData, fromTime: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className='flex flex-col gap-y-3 w-full'>
                <h6 className='font-poppins text-lg font-normal'>To</h6>
                <div className='flex flex-col gap-y-1'>
                  <label>Airport</label>
                  <select
                    value={formData.toAirport}
                    name='toAirport'
                    onChange={(e) =>
                      setFormData({ ...formData, toAirport: e.target.value })
                    }
                  >
                    <option value='' disabled>
                      Select flight to
                    </option>
                    {airports.map((airport) => (
                      <option key={airport.code} value={airport.code}>
                        {airport.code} - {airport.city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='flex flex-col gap-y-1 w-full'>
                  <label>Time</label>
                  <input
                    name='toTime'
                    autoComplete='off'
                    placeholder='Flight to time'
                    value={formData.toTime}
                    onChange={(e) =>
                      setFormData({ ...formData, toTime: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-between gap-x-6'>
              <div className='flex flex-col gap-y-1 w-full'>
                <label>Boarding</label>
                <input
                  name='boarding'
                  autoComplete='off'
                  placeholder='Boarding time'
                  value={formData.boarding}
                  onChange={(e) =>
                    setFormData({ ...formData, boarding: e.target.value })
                  }
                />
              </div>
              <div className='flex flex-col gap-y-1 w-full'>
                <label>Departure</label>
                <input
                  name='departure'
                  autoComplete='off'
                  placeholder='Departure time'
                  value={formData.departure}
                  onChange={(e) =>
                    setFormData({ ...formData, departure: e.target.value })
                  }
                />
              </div>
              <div className='flex flex-col gap-y-1 w-full'>
                <label>Arrival</label>
                <input
                  name='arrival'
                  autoComplete='off'
                  placeholder='Arrival time'
                  value={formData.arrival}
                  onChange={(e) =>
                    setFormData({ ...formData, arrival: e.target.value })
                  }
                />
              </div>
            </div>
            <div className='flex justify-between gap-x-6'>
              <div className='flex flex-col gap-y-1 w-full'>
                <label>Company</label>
                <select
                  value={formData.companyId || ''}
                  name='companyId'
                  onChange={(e) =>
                    setFormData({ ...formData, companyId: e.target.value })
                  }
                >
                  <option value='' disabled>
                    Select flight company
                  </option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex flex-col gap-y-1 w-full'>
                <label>Seats</label>
                <input
                  name='seats'
                  autoComplete='off'
                  placeholder='Seats'
                  value={formData.seats}
                  onChange={(e) =>
                    setFormData({ ...formData, seats: e.target.value })
                  }
                />
              </div>
              <div className='flex flex-col gap-y-1 w-full'>
                <label>Price</label>
                <input
                  name='price'
                  autoComplete='off'
                  placeholder='Price'
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
            </div>
            <button type='submit' className='w-fit' onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      ) : null}
    </Layout>
  );
}
