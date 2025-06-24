import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './TableViewer.css'

const TableViewer = () => {
  const [tableNames, setTableNames] = useState([]);
  const [response, setResponse] = useState(null);
  const [tableName, setTableName] = useState('');
  const [errorText, setErrorText] = useState('');

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
    if (tableName === '') {
      setErrorText('テーブル名を入力してください。');
      return;
    }
    const { data, error } = await supabase.from(tableName).select().order('id', {ascending: true});
    if (error) {
      console.error(error);
      setResponse(null);
      setErrorText('対象テーブルが取得できませんでした。')
    } else {
      setErrorText('')
      setResponse(data);
    }
  };

  /** 検索を実行する */
  const handleSubmit = (e) => {
    e.preventDefault(); // ← Enter キーでページ遷移しないようにする
    fetchData();
  }

  return (
    <div className='tableViewer'>
      <h1>データ確認</h1>
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
      <p className='error-text text-danger'>{errorText}</p>
      <div className='table-name-link-area'>
        {
          tableNames.length === 0
          ?
            <p>テーブル名を取得中...</p>
          :
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
        {
          response &&
            <pre>
              {JSON.stringify(response, null, 2)}
            </pre>
        }
      </div>
    </div>
  )

}
export default TableViewer