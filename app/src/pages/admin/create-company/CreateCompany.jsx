import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../../../components';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { createCompany } from '../../../services/companies';
import { useState } from 'react';

export default function CreateCompany() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).every((item) => item !== '')) {
      const response = await createCompany(formData);
      if (!response) {
        alert('Failed to create company.');
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
          Create a new company
        </h1>
        <form className='w-1/2 flex flex-col gap-y-12' noValidate>
          <div className='flex flex-col gap-y-1 w-full'>
            <label>Name</label>
            <input
              name='name'
              autoComplete='off'
              placeholder='Company name'
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <button type='submit' className='w-fit' onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}
