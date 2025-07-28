// import React from 'react'
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import './Todo.css'
import { useToast } from '../components/Toast/Toast';
import { useAuth } from '../contexts/AuthContext';

const Todo = () => {
  const [response, setResponse] = useState(null);
  const [displayTodos, setDisplayTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [isHideCompletedTodo, setIsHideCompletedTodo] = useState(false);
  const TODO_MAX_LENGTH = 140;

  // トーストコンポーネントを使用する準備
  const {showToast} = useToast();

  const { user, isReady } = useAuth();

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
    const { data, error } = await supabase.from('todos').select().eq('user_id', user.id).order('id', {ascending: true});
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
      showToast({
        title: 'エラー',
        message: 'Todoを入力してください。',
        type: 'danger',
      });
      return;
    }
    const { error } = await supabase.from('todos').insert({
      title: todo,
      user_id: user.id
    });
    if (error) {
      console.error(error.message);
      showToast({
        title: 'エラー',
        message: '登録処理中にエラーが発生しました。',
        type: 'danger',
      });
    } else {
      setTodo('');
      showToast({
        title: '登録完了',
        message: 'Todoを登録しました。',
        type: 'primary',
      });
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
    <div className='todo'>
      <h1>Todo</h1>
      <div className='controll-area'>
        <form onSubmit={(e) => {
          e.preventDefault();
          registTodo();
        }}>
        <input
          id="todo"
          className='todo-input'
          type="text"
          placeholder='最大140文字まで登録できます'
          maxLength={TODO_MAX_LENGTH}
          value={todo}
          onChange={(e) => {setTodo(e.target.value)}}
        />
        <button type='button' className='btn btn-primary' onClick={registTodo}>登録</button>
        </form>
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
      {
        !response
        ? 
          <p>isLoading...</p>
        :
          <div className='table-wrapper'>
            <table className="table table-hover">
              <thead className="table-light table-header">
                <tr>
                  <th scope="col" className='col-id text-start'>＃</th>
                  <th scope="col" className='col-title text-start'>タイトル</th>
                  <th scope="col" className='col-iscompleted text-center'>完了</th>
                  <th scope="col" className='col-delete text-center'>削除</th>
                </tr>
              </thead>
              <tbody>
                {
                  displayTodos.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.title}</td>
                      <td className='text-center'>
                        <div className="form-check d-inline-block">
                          <input
                            className="form-check-input custom-checkbox-size"
                            type="checkbox"
                            id={`checkbox-${data.id}`}
                            checked={data.isCompleted}
                            onChange={() => updateTodo(data, !data.isCompleted)}
                          />
                        </div>
                      </td>
                      <td className='text-center'>
                        <div>
                          <button className='btn btn-sm btn-danger' onClick={() => deleteTodo(data)}>削除</button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            {
              displayTodos.length === 0
              &&
                <div className='text-primary text-center fw-bold'>NO DATA</div>
            }
          </div>
        }
    </div>
  )
}

export default Todo