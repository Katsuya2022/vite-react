import { useState } from 'react'
import './ProjectForm.css';
import LanguageSelect from '../CreatableSelect/CreatableSelect';
import { popularLanguages } from '../../utils/constants';

const ProjectForm = ({project, setProject, onDeleteProject}) => {
  const [displayInputArea, setDisplayInputArea] = useState(false);
  /** フォームの表示非表示を切り替える */
  const toggleDisplay = () => {
    setDisplayInputArea(!displayInputArea);
  }
  /** フォームの表示非表示を切り替えるリンクのテキスト */
  const toggleText = displayInputArea ? '閉じる' : '編集';
  /** 表示用案件名 案件名が未入力の場合はデフォルトの"案件名"を返す */
  const displayProjectTitle = project.title ? project.title : '案件名';
  /** 終了日の表示非表示 */
  const [isEndDateDisabled, setIsEndDateDisabled] = useState(true);
  const PROJECT_DETAIL_TEMPLATE = `≪担当業務≫

≪習得スキル≫

≪コメント≫
`
  /** 担当工程のチェックボックスに使う情報リスト */
  const PHASE_FIELDS = [
    { key: 'requirements', label: '要件定義' },
    { key: 'basicDesign', label: '基本設計' },
    { key: 'detailDesign', label: '詳細設計' },
    { key: 'implementation', label: '実装・単体' },
    { key: 'integrationTest', label: '結合テスト' },
    { key: 'systemTest', label: '総合テスト' },
    { key: 'maintenance', label: '保守・運用' },
  ];

  const handleSubmit = ((e) => {
    e.preventDefault();
    checkDate();
    if(!isAtLeastOnePhaseChecked) {
      alert('担当工程を1つ以上選択してください')
    }
  });
  const checkDate = () => {
    if (!project.startDate) {
      alert('開始日を入力してください');
      return;
    }
    if (!project.endDate) {
      alert('終了日を入力してください');
      return;
    }

    const start = new Date(project.startDate);
    const end = new Date(project.endDate);
    if (end < start) {
      alert('終了日は開始日以降の日付を入力してください');
      return;
    }

    // 経過月数の計算
    const years = end.getFullYear() - start.getFullYear();
    // 月の計算は開始日は月初、終了日は月末と考え、差分の計算後＋１する
    const months = end.getMonth() - start.getMonth() + 1;
    const totalText = `${years}年${months}ヶ月`;

    alert(totalText);
  }

  /** 
   * 開始日変更処理
   * 開始日が削除された際は終了日の値も削除し、終了日を非活性にする
   */
  const handleStartDate = (e) => {
    const newStartDate = e.target.value;
    setProject({
      ...project,
      startDate: newStartDate,
      endDate: newStartDate === '' ? '' : project.endDate,
      period: calcElapsedPeriod(newStartDate, project.endDate)
    });
    setIsEndDateDisabled(newStartDate === '');
  }

  /**
   * 終了日変更処理
   */
  const handleEndDate = (e) => {
    const newEndDate = e.target.value;
    setProject({...project, endDate: newEndDate, period: calcElapsedPeriod(project.startDate, newEndDate)});
  }

  /**
   * 開始日と終了日から経過期間を計算する
   * 開始日と終了日が同一の場合を0年1か月として、以降1か月ずつ加算する
   * @param {String} startDate 開始日(yyyy-mm)
   * @param {String} endDate 終了日(yyyy-mm)
   * @returns 経過期間(〇ヶ月)
   */
  const calcElapsedPeriod = (startDate, endDate) => {
    if (!startDate || !endDate) {
      return 0;
    }
    const [startYear, startMonth] = startDate.split('-').map(Number);
    const [endYear, endMonth] = endDate.split('-').map(Number);

    let yearDiff = endYear - startYear;
    let monthDiff = endMonth - startMonth;

    // 同年月の場合を1ヶ月として、以降+1ヶ月として計算する
    return yearDiff * 12 + monthDiff + 1;
  }

  /**
   * 言語変更処理
   */
  const handleLanguageInput = (newLanguages) => {
    setProject({...project, languages: newLanguages})
  }

  /** 担当工程に1つ以上チェックが入っているか */
  const isAtLeastOnePhaseChecked = Object.values(project.phase).some(v => v);

  return (
    <div id="input-area" className="p-3 rounded border border-primary mb-4">
      <div className='d-flex'>
        <h2>{displayProjectTitle}</h2>
        <button className='btn btn-link' onClick={toggleDisplay}>{toggleText}</button>
        <button className='btn btn-link text-danger' onClick={() => onDeleteProject(project.id)}>削除</button>
      </div>
      {
        displayInputArea &&
        <form onSubmit={handleSubmit}>
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
                required
              />
            </div>
          </div>

          {/* 開始日 */}
          <div className="row mb-3">
            <label htmlFor={`start-date-${project.id}`} className="col-sm-3 col-form-label">開始日</label>
            <div className="col-sm-9">
              <input
                id={`start-date-${project.id}`}
                type="month"
                className="form-control"
                value={project.startDate}
                onChange={handleStartDate}
                required
                max={project.endDate}
              />
            </div>
          </div>

          {/* 終了日 */}
          <div className="row mb-3">
            <label htmlFor={`end-date-${project.id}`} className="col-sm-3 col-form-label">終了日</label>
            <div className="col-sm-9">
              <input
                id={`end-date-${project.id}`}
                type="month"
                className="form-control"
                value={project.endDate}
                onChange={handleEndDate}
                required
                min={project.startDate}
                disabled={isEndDateDisabled}
              />
            </div>
          </div>

          {/* 案件内容 */}
          <div className="row mb-3">
            <label htmlFor={`projectDetail-${project.id}`} className="col-sm-3 col-form-label">案件内容<br />
              <button type='button' className='btn btn-link add-project-template-btn' onClick={() => setProject({...project, projectDetail: PROJECT_DETAIL_TEMPLATE})}>雛形を追加</button>
            </label>
            <div className="col-sm-9">
              <textarea
                id={`projectDetail-${project.id}`}
                className="form-control projectDetail"
                rows="3"
                value={project.projectDetail}
                onChange={(e) =>
                  setProject({ ...project, projectDetail: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* 役割 */}
          <div className="row mb-3">
            <label htmlFor={`role-${project.id}`} className="col-sm-3 col-form-label">役割</label>
            <div className="col-sm-9">
              <input
                id={`role-${project.id}`}
                type="text"
                className="form-control"
                value={project.role}
                onChange={(e) =>
                  setProject({ ...project, role: e.target.value })
                }
                placeholder='例：プログラマ, SE, テスター, PM'
                required
              />
            </div>
          </div>

          {/* 規模（チーム） */}
          <div className="row mb-3">
            <label htmlFor={`teams-${project.id}`} className="col-sm-3 col-form-label">規模（チーム）</label>
            <div className="col-sm-9">
              <input
                id={`teams-${project.id}`}
                type="number"
                className="form-control"
                value={project.memberCounts.team}
                onChange={(e) =>
                  setProject({ ...project, memberCounts: {...project.memberCounts, teams: e.target.value} })
                }
                required
                min={0}
              />
            </div>
          </div>

          {/* 規模（開発） */}
          <div className="row mb-3">
            <label htmlFor={`developers-${project.id}`} className="col-sm-3 col-form-label">規模（開発）</label>
            <div className="col-sm-9">
              <input
                id={`developers-${project.id}`}
                type="number"
                className="form-control"
                value={project.memberCounts.team}
                onChange={(e) =>
                  setProject({ ...project, memberCounts: {...project.memberCounts, developers: e.target.value} })
                }
                required
                min={0}
              />
            </div>
          </div>

          {/* 規模（全体） */}
          <div className="row mb-3">
            <label htmlFor={`total-${project.id}`} className="col-sm-3 col-form-label">規模（全体）</label>
            <div className="col-sm-9">
              <input
                id={`total-${project.id}`}
                type="number"
                className="form-control"
                value={project.memberCounts.team}
                onChange={(e) =>
                  setProject({ ...project, memberCounts: {...project.memberCounts, total: e.target.value} })
                }
                required
                min={0}
              />
            </div>
          </div>

          {/* 使用言語 */}
          <div className='row mb-3'>
            <label htmlFor={`langage-${project.id}`} className="col-sm-3 col-form-label">使用言語</label>
            <LanguageSelect
              options={popularLanguages}
              setValue={handleLanguageInput}
              value={project.langages}
              placeholder="使用言語"
              id={`langage-${project.id}`}
              classProp='col-sm-9'
            />
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
              {
                PHASE_FIELDS.map(({key, label}) => (
                  <div className="form-check" key={key}>
                    <input
                      id={`is_${key}-${project.id}`}
                      className="form-check-input"
                      type="checkbox"
                      checked={project.phase[key]}
                      onChange={(e) =>
                        setProject({ ...project, phase: {...project.phase, [key]: e.target.checked }})
                      }
                    />
                    <label className="form-check-label" htmlFor={`is_${key}-${project.id}`}>
                      {label}
                    </label>
                  </div>
                ))
              }
            </div>
          </fieldset>
          <button type="submit" className="btn btn-primary">保存する</button>
        </form>
      }
    </div>
  )
}

export default ProjectForm
