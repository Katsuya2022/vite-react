// import React from 'react'
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import './Page3.css'

const Page3 = () => {
  const [response, setResponse] = useState(null);
  const [displayTodos, setDisplayTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isHideCompletedTodo, setIsHideCompletedTodo] = useState(false);

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
    const { data, error } = await supabase.from('todos').select().order('id', {ascending: true});
    if (error) {
      console.error(error);
    } else {
      setResponse(data);
      setDisplayTodos(isHideCompletedTodo ? data.filter(todo => !todo.isCompleted) : data);
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
      setTodo('');
      fetchData();
    }
  }

  const updateTodo = async (todo, newCompletedStatue) => {
    await supabase.from('todos').update({ isCompleted: newCompletedStatue }).eq('id', todo.id);
    fetchData();
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

  /**
   * 完了したTodoを非表示にする
   */
  const hideCompletedTodo = () => {
    if (!response) return;
    if (isHideCompletedTodo) {
      setDisplayTodos(response);
    } else {
      const todos = response.filter((todo) => {
        return !todo.isCompleted
      });
      setDisplayTodos(todos);
    }
  };

  /**
   * 完了したTodoを非表示にするスイッチ切り替え処理
   * @param {*} e スイッチ変更イベント
   */
  const handleChange = (e) => {
    setIsHideCompletedTodo(e.target.checked);
    hideCompletedTodo();
  };

  return (
    <div className='page3'>
      <h1>Page3</h1>
      <div className='controll-area'>
        <input className='todo-input' type="text" id="todo" value={todo} onChange={(e) => {setTodo(e.target.value)}}/>
        <button className='btn btn-primary' onClick={() => registTodo()}>登録</button>
        <div className="form-check form-switch  switch-btn">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            checked={isHideCompletedTodo}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">完了したTodoを非表示にする</label>
        </div>
      </div>
      <p className='text-danger'>{errorText}</p>
      {
        !response
        ? 
          <p>isLoading...</p>
        :
          <div className='table-wrapper'>
            <table className="table table-hover">
              <thead className="table-light table-header">
                <tr>
                  <th scope="col" className='col-id'>id</th>
                  <th scope="col" className='col-title'>title</th>
                  <th scope="col" className='col-iscompleted'>isCompleted</th>
                  <th scope="col" className='col-delete'>delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  displayTodos.map((data, index) => (
                    <tr key={index}>
                      <td>{data.id}</td>
                      <td>{data.title}</td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckChecked"
                            checked={data.isCompleted}
                            onChange={() => updateTodo(data, !data.isCompleted)}
                          />
                        </div>
                      </td>
                      <td>
                        <div>
                          <button className='btn btn-sm btn-danger' onClick={() => deleteTodo(data)}>delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        }
    </div>
  )
}

export default Page3