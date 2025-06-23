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
            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-3 col-form-label">表示名（漢字）</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="name" />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="name-kana" className="col-sm-3 col-form-label">表示名（カナ）</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="name-kana" />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="age" className="col-sm-3 col-form-label">年齢</label>
              <div className="col-sm-9">
                <input type="text" inputMode="numeric" pattern="\d*" maxLength={3} className="form-control" id="age" />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="email" className="col-sm-3 col-form-label">Eメール</label>
              <div className="col-sm-9">
                <input type="email" className="form-control" id="email" />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">Password</label>
              <div className="col-sm-9">
                <input type="password" className="form-control" id="inputPassword3" />
              </div>
            </div>
            <fieldset className="row mb-3">
              <legend className="col-form-label col-sm-3 pt-0">Radios</legend>
              <div className="col-sm-9">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" />
                  <label className="form-check-label" htmlFor="gridRadios1">
                    First radio
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                  <label className="form-check-label" htmlFor="gridRadios2">
                    Second radio
                  </label>
                </div>
                <div className="form-check disabled">
                  <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled />
                  <label className="form-check-label" htmlFor="gridRadios3">
                    Third disabled radio
                  </label>
                </div>
              </div>
            </fieldset>
            <div className="row mb-3">
              <div className="col-sm-9 offset-sm-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="gridCheck1" />
                  <label className="form-check-label" htmlFor="gridCheck1">
                    Example checkbox
                  </label>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Sign in</button>
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