import { useState } from 'react';
import { supabase } from '../lib/supabase';

const Page2 = () => {
    const [response, setResponse] = useState(null);
    const [tableName, setTableName] = useState('');

    /**
     * Todoを取得する
     */
    const fetchData = async () => {
      const { data, error } = await supabase.from(tableName).select().order('id', {ascending: true});
      if (error) {
        console.error(error);
        setResponse(null);
      } else {
        setResponse(data);
      }
    };

  return (
    <div className='page2'>
      <h1>データ一覧</h1>
            <div className='controll-area'>
        <input
          id="table-name"
          className='table-name-input'
          type="text"
          placeholder='テーブル名を入力してください。'
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
        />
        <button className='btn btn-primary' onClick={fetchData}>検索</button>
      </div>
      <pre>
        {JSON.stringify(response, null, 2)}
      </pre>
    </div>
  )

}
export default Page2