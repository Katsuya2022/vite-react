import { useState } from 'react'

const ProjectForm = ({project, setProject, onDeleteProject}) => {
  const [displayInputArea, setDisplayInputArea] = useState(false);
  const toggleDisplay = () => {
    setDisplayInputArea(!displayInputArea);
  }
  const toggleText = displayInputArea ? '閉じる' : '編集';
  const displayProjectTitle = project.title ? project.title : '案件名';
  
  return (
    <div id="input-area" className="p-3 rounded border border-primary mb-4">
      <div className='d-flex'>
        <h2>{displayProjectTitle}</h2>
        <button className='btn btn-link' onClick={toggleDisplay}>{toggleText}</button>
        <button className='btn btn-link text-danger' onClick={() => onDeleteProject(project.id)}>削除</button>
      </div>
      {
        displayInputArea &&
        <form>
          {/* 案件名 */}
          <div className="row mb-3">
            <label htmlFor={`title-${project.id}`} className="col-sm-3 col-form-label">案件名</label>
            <div className="col-sm-9">
              <input
                id={`title-${project.id}`}
                type="text"
                className="form-control"
                value={project.title}
                onChange={(e) =>
                  setProject({ ...project, title: e.target.value })
                }
              />
            </div>
          </div>
          
          {/* 開始日 */}
          <div className="row mb-3">
            <label htmlFor={`start-date-${project.id}`} className="col-sm-3 col-form-label">開始日</label>
            <div className="col-sm-9">
              <input
                id={`start-date-${project.id}`}
                type="text"
                className="form-control"
                value={project.startDate}
                onChange={(e) =>
                  setProject({ ...project, startDate: e.target.value })
                }
              />
            </div>
          </div>
          
          {/* 終了日 */}
          <div className="row mb-3">
            <label htmlFor={`end-date-${project.id}`} className="col-sm-3 col-form-label">終了日</label>
            <div className="col-sm-9">
              <input
                id={`end-date-${project.id}`}
                type="text"
                className="form-control"
                value={project.endDaye}
                onChange={(e) =>
                  setProject({ ...project, endDate: e.target.value })
                }
              />
            </div>
          </div>
          
          {/* 案件内容 */}
          <div className="row mb-3">
            <label htmlFor={`projectDetail-${project.id}`} className="col-sm-3 col-form-label">案件内容</label>
            <div className="col-sm-9">
              <textarea
                id={`projectDetail-${project.id}`}
                className="form-control"
                rows="3"
                value={project.projectDetail}
                onChange={(e) =>
                  setProject({ ...project, projectDetail: e.target.value })
                }
              />
            </div>
          </div>
          
          {/* 言語 */}
          <div className="row mb-3">
            <label htmlFor={`language-${project.id}`} className="col-sm-3 col-form-label">言語</label>
            <div className="col-sm-9">
              <input
                id="language"
                type="text"
                className="form-control"
                value={project.language}
                onChange={(e) =>
                  setProject({ ...project, language: e.target.value })
                }
              />
            </div>
          </div>
          
          {/* DB・FW・ツール等 */}
          <div className="row mb-3">
            <label htmlFor={`tools-${project.id}`} className="col-sm-3 col-form-label">DB・FW・ツール等</label>
            <div className="col-sm-9">
              <input
                id={`tools-${project.id}`}
                type="text"
                className="form-control"
                value={project.tools}
                onChange={(e) =>
                  setProject({ ...project, tools: e.target.value })
                }
              />
            </div>
          </div>

          {/* 担当工程 */}
          <fieldset className="row mb-3">
            <legend className="col-form-label col-sm-3 pt-0">担当工程</legend>
            <div className="col-sm-9">

              {/* 要件定義 */}
              <div className="form-check">
                <input
                  id={`is_requirements-${project.id}`}
                  className="form-check-input"
                  type="checkbox"
                  value={project.phase.requirements}
                  onChange={(e) =>
                    setProject({ ...project, phase: {...project.phase, requirements: e.target.checked }})
                  }
                />
                <label className="form-check-label" htmlFor={`is_requirements-${project.id}`}>
                  要件定義
                </label>
              </div>

              {/* 基本設計 */}
              <div className="form-check">
                <input
                  id={`is_basic_design-${project.id}`}
                  className="form-check-input"
                  type="checkbox"
                  value={project.phase.basicDesign}
                  onChange={(e) =>
                    setProject({ ...project, phase: {...project.phase, basicDesign: e.target.checked }})
                  }
                />
                <label className="form-check-label" htmlFor={`is_basic_design-${project.id}`}>
                  基本設計
                </label>
              </div>

              {/* 詳細設計 */}
              <div className="form-check">
                <input
                  id={`is_detail_design-${project.id}`}
                  className="form-check-input"
                  type="checkbox"
                  value={project.phase.detailDesign}
                  onChange={(e) =>
                    setProject({ ...project, phase: {...project.phase, detailDesign: e.target.checked }})
                  }
                />
                <label className="form-check-label" htmlFor={`is_detail_design-${project.id}`}>
                  詳細設計
                </label>
              </div>

              {/* 実装・単体 */}
              <div className="form-check">
                <input
                  id={`is_implementation-${project.id}`}
                  className="form-check-input"
                  type="checkbox"
                  value={project.phase.implementation}
                  onChange={(e) =>
                    setProject({ ...project, phase: {...project.phase, implementation: e.target.checked }})
                  }
                />
                <label className="form-check-label" htmlFor={`is_implementation-${project.id}`}>
                  実装・単体
                </label>
              </div>

              {/* 結合テスト */}
              <div className="form-check">
                <input
                  id={`is_integration_test-${project.id}`}
                  className="form-check-input"
                  type="checkbox"
                  value={project.phase.integrationTest}
                  onChange={(e) =>
                    setProject({ ...project, phase: {...project.phase, integrationTest: e.target.checked }})
                  }
                />
                <label className="form-check-label" htmlFor={`is_integration_test-${project.id}`}>
                  結合テスト
                </label>
              </div>

              {/* 総合テスト */}
              <div className="form-check">
                <input
                  id={`is_system_test-${project.id}`}
                  className="form-check-input"
                  type="checkbox"
                  value={project.phase.systemTest}
                  onChange={(e) =>
                    setProject({ ...project, phase: {...project.phase, systemTest: e.target.checked }})
                  }
                />
                <label className="form-check-label" htmlFor={`is_system_test-${project.id}`}>
                  総合テスト
                </label>
              </div>

              {/* 保守・運用 */}
              <div className="form-check">
                <input
                  id={`is_maintenance-${project.id}`}
                  className="form-check-input"
                  type="checkbox"
                  value={project.phase.maintenance}
                  onChange={(e) =>
                    setProject({ ...project, phase: {...project.phase, maintenance: e.target.checked }})
                  }
                />
                <label className="form-check-label" htmlFor={`is_maintenance-${project.id}`}>
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
