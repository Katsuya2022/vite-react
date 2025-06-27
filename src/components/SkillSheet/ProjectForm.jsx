import { useState } from 'react'

const ProjectForm = ({id, title, onDeleteProject}) => {
  const [projectInfo, setProjectInfo] = useState({
    id: 0,
    title: '',
    startDate: '',
    endDate: '',
    projectDetail: '',
    language: '',
    tools: '',
    phase: {
      requirements: false,      // 要件定義
      basicDesign: false,       // 基本設計
      detailDesign: false,      // 詳細設計
      implementation: false,    // 実装・単体
      integrationTest: false,   // 結合テスト
      systemTest: false,        // 総合テスト
      maintenance: false        // 保守・運用
    }
  });
  const [displayInputArea, setDisplayInputArea] = useState(false);
  const toggleDisplay = () => {
    setDisplayInputArea(!displayInputArea);
  }
  const toggleText = displayInputArea ? '閉じる' : '編集';
  const displayProjectTitle = projectInfo.title ? projectInfo.title : '案件名';
  
  return (
    <div id="input-area" className="p-3 rounded border border-primary mb-4">
      <div className='d-flex'>
        <h2>{displayProjectTitle}</h2>
        <button className='btn btn-link' onClick={toggleDisplay}>{toggleText}</button>
        <button className='btn btn-link text-danger' onClick={() => onDeleteProject(id)}>削除</button>
      </div>
      {
        displayInputArea &&
        <form>
          {/* 案件名 */}
          <div className="row mb-3">
            <label htmlFor="email" className="col-sm-3 col-form-label">案件名</label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id={`title-${id}`}
                value={projectInfo.title}
                onChange={(e) =>
                  setProjectInfo({ ...projectInfo, title: e.target.value })
                }
              />
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
            <label htmlFor="formControlTextarea1" className="col-sm-3 col-form-label">案件内容</label>
            <div className="col-sm-9">
              <textarea className="form-control" id="formControlTextarea1" rows="3"></textarea>
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
      }
    </div>
  )
}

export default ProjectForm
