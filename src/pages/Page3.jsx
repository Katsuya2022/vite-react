// import React from 'react'
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const Page3 = () => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('todos').select();
      if (error) {
        console.error(error);
      } else {
        setResponse(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='page3'>
      <h1>Page3</h1>
      <pre>{response ? JSON.stringify(response, null, 2) : 'Loading...'}</pre>
    </div>
  )
}

export default Page3