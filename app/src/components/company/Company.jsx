import { Link } from 'react-router-dom';
import { useState } from 'react';
import { deleteCompany } from '../../services/companies';

export default function Company({
  data,
  isAdmin = false,
  onChange = undefined,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    const response = await deleteCompany(data.id);
    if (!response) {
      alert('Failed to delete company.');
    }

    setIsLoading(false);

    if (onChange) {
      onChange(data.id);
    }
  };

  return (
    <div>
      <div className={`p-6 flex justify-between items-center bg-white`}>
        <h5 className='font-poppins font-normal text-xl tracking-wider'>
          {data.name}
        </h5>
      </div>
      <div className='px-6 pb-6 bg-white'>
        {isAdmin ? (
          <div className='flex justify-between gap-x-4'>
            <Link to={`/admin/edit-company/${data.id}`}>
              <button>Edit company</button>
            </Link>
            <button
              className='bg-red-500'
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Delete company'}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
