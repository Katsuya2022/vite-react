// import React from 'react'
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const Page3 = () => {
  const [response, setResponse] = useState(null);
  const [todo, setTodo] = useState('');
  const [errorText, setErrorText] = useState('');

  /**
   * 初期表示時のTodo情報を取得する処理を呼び出す
   */
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Todoを取得する
   */
  const fetchData = async () => {
    const { data, error } = await supabase.from('todos').select();
    if (error) {
      console.error(error);
    } else {
      setResponse(data);
    }
  };

  /**
   * Todoを登録する
   */
  const registTodo = async () => {
    if (todo === '') {
      setErrorText('Todoを入力してください。');
      return;
    }
    const { error } = await supabase.from('todos').insert({title: todo});
    if (error) {
      setErrorText(error.message);
    } else {
      setErrorText('');
      fetchData();
    }
  }

  /**
   * Todoを削除する
   * @param {object} todo 削除対象のtodo
   */
  const deleteTodo = async (todo) => {
    if (window.confirm(`${todo.title}を削除してよろしいですか？`)) {
      await supabase.from('todos').delete().eq('id', todo.id);
    }
    fetchData();
  }

  return (
    <div className='page3'>
      <h1>Page3</h1>
      <input type="text" name="todo" id="todo" value={todo} onChange={(e) => {setTodo(e.target.value)}}/>
      <p className='text-danger'>{errorText}</p>
      <button className='btn btn-primary' onClick={() => registTodo()}>登録</button>
      {
        !response
        ? 
          <p>isLoading...</p>
        :
          <table className="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">title</th>
                <th scope="col">isCompleted</th>
                <th scope="col">delete</th>
              </tr>
            </thead>
            <tbody>
              {
              response.map((data, index) => (
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.title}</td>
                  <td>{`${data.isCompleted}`}</td>
                  <td><div><button className='btn btn-danger' onClick={() => deleteTodo(data)}>delete</button></div></td>
                </tr>
              ))
            }
            </tbody>
          </table>
        }
      <pre>{response ? JSON.stringify(response, null, 2) : 'Loading...'}</pre>
    </div>
  )
}

export default Page3