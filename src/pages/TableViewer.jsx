import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './TableViewer.css'
import { useToast } from '../components/Toast/Toast';

const TableViewer = () => {
  const [tableNames, setTableNames] = useState([]);
  const [response, setResponse] = useState(null);
  const [tableName, setTableName] = useState('');

  // トーストコンポーネントを使用する準備
  const {showToast} = useToast();

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
      showToast({
          title: 'エラー',
          message: 'テーブル名を入力してください。',
          type: 'danger',
      });
      return;
    }
    const { data, error } = await supabase.from(tableName).select().order('id', {ascending: true});
    if (error) {
      console.error(error);
      setResponse(null);
      showToast({
          title: 'エラー',
          message: '対象テーブルが取得できませんでした。',
          type: 'danger',
      });
    } else {
      setResponse(data);
    }
  };

  return (
    <div className='tableViewer'>
      <h1>データ確認</h1>
      <div className='controll-area'>
        <form onSubmit={(e) => {
          e.preventDefault();
          fetchData();
        }}>
          <input
            id="table-name"
            className='table-name-input'
            type="text"
            placeholder='テーブル名を入力してください。'
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            />
          <button type='button' className='btn btn-primary' onClick={fetchData}>検索</button>
        </form>
      </div>
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