import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../../../components';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { getCompany, editCompany } from '../../../services/companies';

export default function EditCompany() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState();

  useEffect(() => {
    const fetchCompany = async () => {
      const company = await getCompany(id);
      if (!company) {
        return;
      }

      setFormData(company);
    };

    fetchCompany();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).every((item) => item !== '')) {
      const response = await editCompany(id, formData);
      if (!response) {
        alert('Failed to edit company.');
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
          <h1 className='font-poppins text-2xl font-normal'>Edit company</h1>
          <form className='w-1/2 flex flex-col gap-y-12' noValidate>
            <div className='flex flex-col gap-y-1 w-full'>
              <label>Name</label>
              <input
                name='name'
                autoComplete='off'
                placeholder='Company name'
                value={formData.name}
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
      ) : null}
    </Layout>
  );
}
