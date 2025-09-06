import { useEffect, useState } from 'react'
import './ProjectForm.css';
import TabSelect from '../TabSelect/TabSelect';
import { useToast } from '../Toast/Toast';

const ProjectForm = ({
  project, setProject, onDeleteProject, languageOptions, databaseOptions, osOptions, fwMwToolOptions
}) => {
  // トーストコンポーネントを使用する準備
  const {showToast} = useToast();
  // 入力フォームの表示/非表示
  const [displayInputArea, setDisplayInputArea] = useState(false);
  // 終了日の表示非表示
  const [isEndDateDisabled, setIsEndDateDisabled] = useState(true);

  /** フォームの表示非表示を切り替えるリンクのテキスト */
  const toggleText = displayInputArea ? '閉じる' : '編集';
  /** 表示用案件名 案件名が未入力の場合はデフォルトの"案件名"を返す */
  const displayProjectName = project.project_name ? project.project_name : '案件名';
  /** 案件内容の雛形 */
  const PROJECT_DETAIL_TEMPLATE = `≪担当業務≫

≪習得スキル≫

≪コメント≫
`
  /** 担当工程のチェックボックスに使う情報リスト */
  const PHASE_FIELDS = [
    { key: 'requirements', label: '要件定義' },
    { key: 'basic_design', label: '基本設計' },
    { key: 'detail_design', label: '詳細設計' },
    { key: 'implementation', label: '実装・単体' },
    { key: 'integration_test', label: '結合テスト' },
    { key: 'system_test', label: '総合テスト' },
    { key: 'maintenance', label: '保守・運用' },
  ];

  /**
   * 初期表示時の情報を取得する処理を呼び出す
   */
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * 初期表示情報を取得する
   */
  const fetchData = () => {

  };

  /** フォームの表示非表示を切り替える */
  const toggleDisplay = () => {
    setDisplayInputArea(!displayInputArea);
  }

  /** 
   * 開始日変更処理
   * 開始日が削除された際は終了日の値も削除し、終了日を非活性にする
   */
  const handleStartDate = (e) => {
    const newStartDate = e.target.value;
    setProject({
      ...project,
      start_date: newStartDate,
      end_date: newStartDate === '' ? '' : project.end_date,
      period: calcElapsedPeriod(newStartDate, project.end_date)
    });
    setIsEndDateDisabled(newStartDate === '');
  }

  /**
   * 終了日変更処理
   */
  const handleEndDate = (e) => {
    const newEndDate = e.target.value;
    setProject({...project, end_date: newEndDate, period: calcElapsedPeriod(project.start_date, newEndDate)});
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
   * 使用言語入力処理
   */
  const handleLanguageInput = (newDatabase) => {
    setProject({...project, languages: newDatabase})
  }

  /**
   * DB入力処理
   */
  const handleDbInput = (newLanguages) => {
    setProject({...project, database: newLanguages})
  }

  /**
   * サーバOS入力処理
   */
  const handleOsInput = (newOs) => {
    setProject({...project, os: newOs})
  }

  /**
   * FW・MW・ツール入力処理
   */
  const handleToolsInput = (newTools) => {
    setProject({...project, tools: newTools})
  }

  /** 保存するボタン押下時の処理 */
  const handleSubmit = ((e) => {
    e.preventDefault();
    if (!checkFormInputs()) {
      console.log(project);
    };
  });

  /**
   * 入力フォームのチェック処理
   * エラーの場合、エラーメッセージを表示する
   * @returns エラーの有無
   */
  const checkFormInputs = () => {
    /** エラーの有無 */
    let isError = false;
    /** エラーメッセージ */
    let errorMsg = '';

    // 案件名のチェック処理
    if (!isError && !project.project_name) {
      errorMsg = '案件名を入力してください';
      isError = true;
    }

    // 開始日のチェック処理
    if (!isError && !project.start_date) {
      errorMsg = '開始日を入力してください';
      isError = true;
    }

    // 終了日のチェック処理
    if (!isError && !project.end_date) {
      errorMsg = '終了日を入力してください';
      isError = true;
    }

    // 開始日、終了日の整合性チェック処理
    const start = new Date(project.start_date);
    const end = new Date(project.end_date);
    if (!isError && end < start) {
      errorMsg = '終了日は開始日以降の日付を入力してください';
      isError = true;
    }

    // 案件内容のチェック処理
    if (!isError && !project.project_detail) {
      errorMsg = '案件内容を入力してください';
      isError = true;
    }

    // 役割のチェック処理
    if (!isError && !project.role) {
      errorMsg = '役割を入力してください';
      isError = true;
    }

    // 担当工程のチェック処理
    const isAtLeastOnePhaseChecked = Object.values(project.phase).some(v => v);
    if(!isError && !isAtLeastOnePhaseChecked) {
      errorMsg = '担当工程を1つ以上選択してください';
      isError = true;
    }

    // エラーがある場合、エラーメッセージを表示する
    if(isError) {
      showToast({
        title: 'エラー',
        message: errorMsg,
        type: 'danger',
      });
    }

    // エラーが無ければisError==falseを返す
    return isError;
  }

  return (
    <div id="input-area" className="p-3 rounded border border-primary mb-4">
      <div className='d-flex'>
        <h2>{displayProjectName}</h2>
        <button className='btn btn-link' onClick={toggleDisplay}>{toggleText}</button>
        <button className='btn btn-link text-danger' onClick={() => onDeleteProject(project.id)}>削除</button>
      </div>
      {
        displayInputArea &&
        <form>
          {/* 案件名 */}
          <div className="row mb-3">
            <label htmlFor={`project-name-${project.id}`} className="col-sm-3 col-form-label">案件名</label>
            <div className="col-sm-9">
              <input
                id={`project-name-${project.id}`}
                type="text"
                className="form-control"
                value={project.project_name}
                onChange={(e) =>
                  setProject({ ...project, project_name: e.target.value })
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
                value={project.start_date}
                onChange={handleStartDate}
                required
                max={project.end_date}
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
                value={project.end_date}
                onChange={handleEndDate}
                required
                min={project.start_date}
                disabled={isEndDateDisabled}
              />
            </div>
          </div>

          {/* 案件内容 */}
          <div className="row mb-3">
            <label htmlFor={`project-detail-${project.id}`} className="col-sm-3 col-form-label">案件内容<br />
              <button type='button' className='btn btn-link add-project-template-btn' onClick={() => setProject({...project, project_detail: PROJECT_DETAIL_TEMPLATE})}>雛形を追加</button>
            </label>
            <div className="col-sm-9">
              <textarea
                id={`project-detail-${project.id}`}
                className="form-control project-detail"
                rows="3"
                value={project.project_detail}
                onChange={(e) =>
                  setProject({ ...project, project_detail: e.target.value })
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
                value={project.memberCounts.teams}
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
                value={project.memberCounts.developers}
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
                value={project.memberCounts.total}
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
            <TabSelect
              options={languageOptions}
              setValue={handleLanguageInput}
              value={project.languages}
              placeholder="例：Java, JavaScript, HTML, CSS"
              id={`langage-${project.id}`}
              classProp='col-sm-9'
              styles={{
                placeholder: (base) => ({
                  ...base,
                  color: '#dddddd',
                })
              }}
            />
          </div>

          {/* DB */}
          <div className='row mb-3'>
            <label htmlFor={`db-${project.id}`} className="col-sm-3 col-form-label">DB</label>
            <TabSelect
              options={databaseOptions}
              setValue={handleDbInput}
              value={project.database}
              placeholder="例：MySQL, PostgreSQL, Oracle"
              id={`db-${project.id}`}
              classProp='col-sm-9'
              styles={{
                placeholder: (base) => ({
                  ...base,
                  color: '#dddddd',
                })
              }}
            />
          </div>

          {/* サーバOS */}
          <div className='row mb-3'>
            <label htmlFor={`os-${project.id}`} className="col-sm-3 col-form-label">サーバOS</label>
            <TabSelect
              options={osOptions}
              setValue={handleOsInput}
              value={project.os}
              placeholder="例：Windows, Linux, Unix"
              id={`os-${project.id}`}
              classProp='col-sm-9'
              styles={{
                placeholder: (base) => ({
                  ...base,
                  color: '#dddddd',
                })
              }}
            />
          </div>

          {/* FW・MW・ツール等 */}
          <div className='row mb-3'>
            <label htmlFor={`tools-${project.id}`} className="col-sm-3 col-form-label">FW・MW・ﾂｰﾙ等</label>
            <TabSelect
              options={fwMwToolOptions}
              setValue={handleToolsInput}
              value={project.tools}
              placeholder="例：Vscode, Eclipse, Git, BootStrap"
              id={`tools-${project.id}`}
              classProp='col-sm-9'
              styles={{
                placeholder: (base) => ({
                  ...base,
                  color: '#dddddd',
                })
              }}
            />
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
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>保存する</button>
        </form>
      }
    </div>
  )
}

export default ProjectForm
