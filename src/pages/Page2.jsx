import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './Page2.css'

const Page2 = () => {
  const [tableNames, setTableNames] = useState([]);
  const [response, setResponse] = useState(null);
  const [tableName, setTableName] = useState('');

  /**
   * 初期表示時のTodo情報を取得する処理を呼び出す
   */
  useEffect(() => {
    fetchTableNames();
  }, []);

  /**
   * テーブル名一覧を取得する
   */
  const fetchTableNames = async () => {
    const { data, error } = await supabase.rpc('get_public_tables');
    if (error) {
      console.error(error);
      setTableNames([]);
    } else {
      setTableNames(data);
    }
  };

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

  /** 検索を実行する */
  const handleSubmit = (e) => {
    e.preventDefault(); // ← Enter キーでページ遷移しないようにする
    fetchData();
  }

  return (
    <div className='page2'>
      <h1>データ一覧</h1>
      <div className='controll-area'>
        <form onSubmit={handleSubmit}>
          <input
            id="table-name"
            className='table-name-input'
            type="text"
            placeholder='テーブル名を入力してください。'
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            />
          <button type='submit' className='btn btn-primary' onClick={fetchData}>検索</button>
        </form>
      </div>
      <div className='table-name-link-area'>
        {
          tableNames.map((tableName, index) => (
            <a
              key={index}
              className='table-name-link'
              onClick={() => setTableName(tableName.tablename)}
            >
              {tableName.tablename}
            </a>
          ))
        }
      </div>
      <div className='view-area'>
        <pre>
          {JSON.stringify(response, null, 2)}
        </pre>
      </div>
    </div>
  )

}
export default Page2