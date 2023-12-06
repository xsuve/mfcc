import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../../../components';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { airports, companies } from '../../../utils/selectOptions';
import { createFlight } from '../../../services/flights';
import { useState } from 'react';

export default function CreateFlight() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fromAirport: '',
    fromTime: '',
    toAirport: '',
    toTime: '',
    boarding: '',
    departure: '',
    arrival: '',
    company: '',
    seats: '',
    price: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).every((item) => item !== '')) {
      const response = await createFlight(formData);
      if (!response) {
        alert('Failed to create flight.');
      }

      navigate('/admin');
    } else {
      alert('Please fill all the fields.');
    }
  };

  return (
    <Layout>
      <div className='flex flex-col gap-y-12'>
        <Link to='/admin'>
          <h6 className='font-poppins text-zinc-500 font-normal text-base flex items-center gap-x-3'>
            <ArrowLeftIcon className='w-4 h-4 text-zinc-500' />
            Back
          </h6>
        </Link>
        <h1 className='font-poppins text-2xl font-normal'>
          Create a new flight
        </h1>
        <form className='w-1/2 flex flex-col gap-y-12' noValidate>
          <div className='flex justify-between gap-x-6'>
            <div className='flex flex-col gap-y-3 w-full'>
              <h6 className='font-poppins text-lg font-normal'>From</h6>
              <div className='flex flex-col gap-y-1'>
                <label>Airport</label>
                <select
                  defaultValue=''
                  name='fromAirport'
                  onChange={(e) =>
                    setFormData({ ...formData, fromAirport: e.target.value })
                  }>
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
                  defaultValue=''
                  name='toAirport'
                  onChange={(e) =>
                    setFormData({ ...formData, toAirport: e.target.value })
                  }>
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
                defaultValue=''
                name='company'
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }>
                <option value='' disabled>
                  Select flight company
                </option>
                {companies.map((company) => (
                  <option key={company} value={company}>
                    {company}
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
    </Layout>
  );
}
