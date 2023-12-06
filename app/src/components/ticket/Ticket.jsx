import { useEffect, useState } from 'react';
import { getFlight } from '../../services/flights';
import { cancelFlight } from '../../services/tickets';

export default function Ticket({ data, onChange = undefined }) {
  const [isLoading, setIsLoading] = useState(false);
  const [flight, setFlight] = useState();

  useEffect(() => {
    const fetchFlight = async () => {
      const flight = await getFlight(data.flightId);
      if (!flight) {
        return;
      }

      setFlight(flight);
    };

    fetchFlight();
  }, []);

  const handleCancel = async () => {
    setIsLoading(true);

    const response = await cancelFlight(data.id, flight.id, 1);
    if (!response) {
      alert('Failed to cancel flight.');
    }

    setIsLoading(false);

    if (onChange) {
      onChange(data.id);
    }
  };

  return (
    <>
      {flight ? (
        <div className='flex items-center bg-white'>
          <div className='h-[105px] aspect-square'>
            <img src='/img/qr-code.svg' alt='' />
          </div>
          <div className='p-6 grid grid-cols-3 gap-x-24'>
            <div className='flex justify-between items-center'>
              <div className='text-left'>
                <h5 className='font-poppins font-normal text-xl tracking-wide'>
                  {flight.fromAirport}
                </h5>
                <h6 className='font-poppins font-normal text-lg'>
                  {flight.fromTime}
                </h6>
              </div>
              <div className='flex items-center'>
                <div className='tracking-widest'>-----</div>
                <div className='pl-3 pr-4'>
                  <img
                    src='/img/plane-icon-black.svg'
                    className='w-6 h-6 rotate-[150deg]'
                    alt=''
                  />
                </div>
                <div className='tracking-widest'>-----</div>
              </div>
              <div className='text-right'>
                <h5 className='font-poppins font-normal text-xl tracking-wider'>
                  {flight.toAirport}
                </h5>
                <h6 className='font-poppins font-normal text-lg'>
                  {flight.toTime}
                </h6>
              </div>
            </div>
            <div className='flex items-center gap-x-12'>
              <div className='text-left flex flex-col gap-y-1'>
                <p className='font-poppins font-light text-zinc-400 text-sm'>
                  Flight
                </p>
                <h5 className='font-poppins text-base font-normal'>
                  {flight.id}
                </h5>
              </div>
              <div className='text-left flex flex-col gap-y-1'>
                <p className='font-poppins font-light text-zinc-400 text-sm'>
                  Company
                </p>
                <h5 className='font-poppins text-base font-normal'>
                  {flight.company}
                </h5>
              </div>
              <div className='text-left flex flex-col gap-y-1'>
                <p className='font-poppins font-light text-zinc-400 text-sm'>
                  Terminal
                </p>
                <h5 className='font-poppins text-base font-normal'>
                  {data.terminal}
                </h5>
              </div>
              <div className='text-left flex flex-col gap-y-1'>
                <p className='font-poppins font-light text-zinc-400 text-sm'>
                  Gate
                </p>
                <h5 className='font-poppins text-base font-normal'>
                  {data.gate}
                </h5>
              </div>
            </div>
            <div className='flex justify-end items-center'>
              <button
                className='bg-red-500'
                onClick={handleCancel}
                disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
