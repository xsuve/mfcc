import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function TicketBox({ data }) {
  return (
    <div className='p-12'>
      <div className='p-6 bg-blue-500 flex justify-between items-center'>
        <div className='text-left'>
          <h5 className='font-poppins font-normal text-xl tracking-wider text-white'>
            {data.from.airport}
          </h5>
          <h6 className='font-poppins font-normal text-lg text-white'>
            {data.from.time}
          </h6>
          <p className='font-poppins font-light text-xs text-white'>{`${
            data.from.stops
          } ${
            data.from.stops > 0
              ? data.from.stops > 1
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
            {data.to.airport}
          </h5>
          <h6 className='font-poppins font-normal text-lg text-white'>
            {data.to.time}
          </h6>
          <p className='font-poppins font-light text-xs text-white'>{`${
            data.to.stops
          } ${
            data.to.stops > 0 ? (data.to.stops > 1 ? 'stops' : 'stop') : 'stops'
          }`}</p>
        </div>
      </div>
      <div className='p-6 bg-white'>
        <div className='grid grid-rows-3 grid-cols-3 gap-4'>
          <div className='text-left flex flex-col gap-y-1'>
            <p className='font-poppins font-light text-zinc-400 text-sm'>
              Flight
            </p>
            <h5 className='font-poppins text-base font-normal'>
              {data.flight}
            </h5>
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
              Seat
            </p>
            <h5 className='font-poppins text-base font-normal'>{data.seat}</h5>
          </div>
          <div className='text-center flex flex-col gap-y-1'>
            <p className='font-poppins font-light text-zinc-400 text-sm'>
              Gate
            </p>
            <h5 className='font-poppins text-base font-normal'>{data.gate}</h5>
          </div>
          <div className='text-right flex flex-col gap-y-1'>
            <p className='font-poppins font-light text-zinc-400 text-sm'>
              Arrival
            </p>
            <h5 className='font-poppins text-base font-normal'>
              {data.arrival}
            </h5>
          </div>
          <div className='text-left flex flex-col gap-y-1'>
            <p className='font-poppins font-light text-zinc-400 text-sm'>
              Company
            </p>
            <h5 className='font-poppins text-base font-normal'>
              {data.company}
            </h5>
          </div>
          <div></div>
          <div className='flex justify-end items-end'>
            <h4 className='font-poppins text-xl font-light'>${data.price}</h4>
          </div>
        </div>
      </div>
      <div className='p-6 bg-white'>
        <button
          className='px-6 py-3 bg-blue-500 text-white font-poppins font-normal text-base w-full'
          onClick={null}
        >
          Buy ticket
        </button>
      </div>
    </div>
  );
}
