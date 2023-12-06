import { Link } from 'react-router-dom';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { deleteFlight } from '../../services/flights';

export default function Flight({
  data,
  isAdmin = false,
  onChange = undefined,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    const response = await deleteFlight(data.id);
    if (!response) {
      alert('Failed to delete flight.');
    }

    setIsLoading(false);
    onChange(data.id);
  };

  return (
    <div>
      <div className='p-6 bg-blue-500 flex justify-between items-center'>
        <div className='text-left'>
          <h5 className='font-poppins font-normal text-xl tracking-wider text-white'>
            {data.fromAirport}
          </h5>
          <h6 className='font-poppins font-normal text-lg text-white'>
            {data.fromTime}
          </h6>
          <p className='font-poppins font-light text-xs text-white'>{`${
            data.fromStops
          } ${
            data.fromStops > 0
              ? data.fromStops > 1
                ? 'stops'
                : 'stop'
              : 'stops'
          }`}</p>
        </div>
        <div className='flex gap-x-2'>
          <div className='text-white tracking-widest'>-----</div>
          <PaperAirplaneIcon className='w-6 h-6 text-white' />
          <div className='text-white tracking-widest'>-----</div>
        </div>
        <div className='text-right'>
          <h5 className='font-poppins font-normal text-xl tracking-wider text-white'>
            {data.toAirport}
          </h5>
          <h6 className='font-poppins font-normal text-lg text-white'>
            {data.toTime}
          </h6>
          <p className='font-poppins font-light text-xs text-white'>{`${
            data.toStops
          } ${
            data.toStops > 0 ? (data.toStops > 1 ? 'stops' : 'stop') : 'stops'
          }`}</p>
        </div>
      </div>
      <div className='p-6 bg-white'>
        <div className='grid grid-rows-3 grid-cols-3 gap-4'>
          <div className='text-left flex flex-col gap-y-1'>
            <p className='font-poppins font-light text-zinc-400 text-sm'>
              Flight
            </p>
            <h5 className='font-poppins text-base font-normal'>{data.id}</h5>
          </div>
          <div className='text-center flex flex-col gap-y-1'>
            <p className='font-poppins font-light text-zinc-400 text-sm'>
              Boarding
            </p>
            <h5 className='font-poppins text-base font-normal'>
              {data.boarding}
            </h5>
          </div>
          <div className='text-right flex flex-col gap-y-1'>
            <p className='font-poppins font-light text-zinc-400 text-sm'>
              Departure
            </p>
            <h5 className='font-poppins text-base font-normal'>
              {data.departure}
            </h5>
          </div>
          <div className='text-left flex flex-col gap-y-1'>
            <p className='font-poppins font-light text-zinc-400 text-sm'>
              Seats
            </p>
            <h5 className='font-poppins text-base font-normal'>{data.seats}</h5>
          </div>
          <div className='text-center flex flex-col gap-y-1'>
            <p className='font-poppins font-light text-zinc-400 text-sm'>
              Company
            </p>
            <h5 className='font-poppins text-base font-normal'>
              {data.company}
            </h5>
          </div>
          <div className='text-right flex flex-col gap-y-1'>
            <p className='font-poppins font-light text-zinc-400 text-sm'>
              Arrival
            </p>
            <h5 className='font-poppins text-base font-normal'>
              {data.arrival}
            </h5>
          </div>
          <div></div>
          <div></div>
          <div className='flex justify-end items-end'>
            <h4 className='font-poppins text-xl font-light'>${data.price}</h4>
          </div>
        </div>
      </div>
      <div className='px-6 pb-6 bg-white'>
        {isAdmin ? (
          <div className='flex justify-between gap-x-4'>
            <Link to={`/admin/edit-flight/${data.id}`}>
              <button onClick={null}>Edit flight</button>
            </Link>
            <button
              className='bg-red-500'
              onClick={handleDelete}
              disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Delete flight'}
            </button>
          </div>
        ) : (
          <button className='w-full' onClick={null}>
            Buy ticket
          </button>
        )}
      </div>
    </div>
  );
}
