import './Page1.css'

const Page1 = () => {
  return (
    <div className='page1'>
      <h1>Skill-Sheet</h1>
      <div className="d-flex gap-4 p-4">
        {/* 左エリア */}
        <div id="input-area" className="p-4 rounded border border-primary">
          <h2>基本情報</h2>
          <p>
            基本的にはログインユーザーの情報が表示されます。<br />
            ログインユーザーの情報とは異なる情報を表示したいときはこちらに入力してください。
          </p>
          <form>
            {/* 表示名（漢字） */}
            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-3 col-form-label">表示名（漢字）</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="name" />
              </div>
            </div>

            {/* 表示名（カナ） */}
            <div className="row mb-3">
              <label htmlFor="name-kana" className="col-sm-3 col-form-label">表示名（カナ）</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="name-kana" />
              </div>
            </div>

            {/* 年齢 */}
            <div className="row mb-3">
              <label htmlFor="age" className="col-sm-3 col-form-label">年齢</label>
              <div className="col-sm-9">
                <input type="text" inputMode="numeric" pattern="\d*" maxLength={3} className="form-control" id="age" />
              </div>
            </div>
            
            {/* Eメール */}
            <div className="row mb-3">
              <label htmlFor="email" className="col-sm-3 col-form-label">Eメール</label>
              <div className="col-sm-9">
                <input type="email" className="form-control" id="email" />
              </div>
            </div>
            
            {/* 案件名 */}
            <div className="row mb-3">
              <label htmlFor="email" className="col-sm-3 col-form-label">案件名</label>
              <div className="col-sm-9">
                <input type="email" className="form-control" id="email" />
              </div>
            </div>
            
            {/* 開始日 */}
            <div className="row mb-3">
              <label htmlFor="email" className="col-sm-3 col-form-label">開始日</label>
              <div className="col-sm-9">
                <input type="email" className="form-control" id="email" />
              </div>
            </div>
            
            {/* 終了日 */}
            <div className="row mb-3">
              <label htmlFor="email" className="col-sm-3 col-form-label">終了日</label>
              <div className="col-sm-9">
                <input type="email" className="form-control" id="email" />
              </div>
            </div>
            
            {/* 案件内容 */}
            <div className="row mb-3">
              <label htmlFor="email" className="col-sm-3 col-form-label">案件内容</label>
              <div className="col-sm-9">
                <input type="email" className="form-control" id="email" />
              </div>
            </div>
            
            {/* 言語 */}
            <div className="row mb-3">
              <label htmlFor="email" className="col-sm-3 col-form-label">言語</label>
              <div className="col-sm-9">
                <input type="email" className="form-control" id="email" />
              </div>
            </div>
            
            {/* DB・FW・ツール等 */}
            <div className="row mb-3">
              <label htmlFor="email" className="col-sm-3 col-form-label">DB・FW・ツール等</label>
              <div className="col-sm-9">
                <input type="email" className="form-control" id="email" />
              </div>
            </div>

            {/* 担当工程 */}
            <fieldset className="row mb-3">
              <legend className="col-form-label col-sm-3 pt-0">担当工程</legend>
              <div className="col-sm-9">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="gridCheck1" />
                  <label className="form-check-label" htmlFor="gridCheck1">
                    要件定義
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="gridCheck1" />
                  <label className="form-check-label" htmlFor="gridCheck1">
                    基本設計
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="gridCheck1" />
                  <label className="form-check-label" htmlFor="gridCheck1">
                    詳細設計
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="gridCheck1" />
                  <label className="form-check-label" htmlFor="gridCheck1">
                    実装・単体
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="gridCheck1" />
                  <label className="form-check-label" htmlFor="gridCheck1">
                    結合テスト
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="gridCheck1" />
                  <label className="form-check-label" htmlFor="gridCheck1">
                    総合テスト
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="gridCheck1" />
                  <label className="form-check-label" htmlFor="gridCheck1">
                    保守・運用
                  </label>
                </div>
              </div>
            </fieldset>
            <button type="submit" className="btn btn-primary">保存する</button>
          </form>
        </div>

        {/* 右エリア */}
        <div id="preview-area" className="bg-success text-white p-4 rounded">
          <h2>右エリア</h2>
          <p>ここは右側の領域です。</p>
        </div>
      </div>
    </div>
  )

}
export default Page1