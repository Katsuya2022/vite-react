import React, { useEffect, useState } from 'react'
import ProjectForm from '../components/SkillSheet/ProjectForm';
import AddIcon from '@mui/icons-material/Add';
import './SkillSheet.css'
import { supabase } from '../lib/supabase';
import { truncateText } from '../utils/utils';
import { useAuth } from '../contexts/AuthContext';

const SkillSheet = () => {
  // 基本情報入力フォームの表示/非表示
  const [displayKihon, setDisplayKihon] = useState(false);
  // 基本情報
  const [kihon, setKihon] = useState({
    name_kana: '',          // フリガナ
    name: '',               // 名前
    nearest_station: '',    // 最寄駅
    kadou: '',              // 稼働
    qualifications: '',     // 資格
    affiliation: '',        // 所属
    gender: '',             // 性別
    age: 0,                 // 年齢
    has_spouse: '',         // 配偶者
    education: '',          // 学歴
  });
  // 案件情報
  const [project, setProject] = useState({
    id: 'project1',         // ID
    project_name: '案件1',  // 案件名
    start_date: '',         // 開始日
    end_date: '',           // 終了日
    period: 0,              // 期間
    project_detail: '',     // 案件内容
    role: '',               // 役割
    memberCounts: {         // 規模
      teams: 0,             // チーム
      developers: 0,        // 開発
      total: 0,             // 全体
    },
    languages: [],          // 言語
    database: [],           // データベース
    os: [],                 // サーバOS
    tools: [],              // FW・MW・ツール等
    phase: {                // 担当工程
      requirements: false,      // 要件定義
      basic_design: false,      // 基本設計
      detail_design: false,     // 詳細設計
      implementation: false,    // 実装・単体
      integration_test: false,  // 結合テスト
      system_test: false,       // 総合テスト
      maintenance: false        // 保守・運用
    },
    visible: true           // 表示/非表示
  });

  // 案件リスト
  const [projects, setProjects] = useState([project]);
  // 案件数
  const [projectsCnt, setProjectsCnt] = useState(0);
  // 使用言語の選択肢
  const [languageOptions, setLanguageOptions] = useState([]);
  // DBの選択肢
  const [databaseOptions, setDatabaseOptions] = useState([]);
  // サーバOSの選択肢
  const [osOptions, setOsOptions] = useState([]);
  // FW・MW・ツール等の選択肢
  const [fwMwToolOptions, setFwMwToolOptions] = useState([]);

  // ログインユーザー情報
  const { user } = useAuth();

  /**
   * 初期表示処理
   */
  useEffect(() => {
    fetchData();
    setProjectsCnt(projects.length);
  }, []);

  /**
   * 初期表示情報を取得する
   */
  const fetchData = async () => {
    // 基本情報を取得する
    const { data, error } = await supabase.from('profiles').select().eq('id', user.id).single();
    if (error) {
      console.error(error);
    } else {
      console.log(data);
      setKihon({
          name_kana: data.name_kana,          // フリガナ
          name: data.name,               // 名前
          nearest_station: data.nearest_station,    // 最寄駅
          kadou: '',              // 稼働
          qualifications: data.qualifications,     // 資格
          affiliation: data.affiliation,        // 所属
          gender: data.gender,             // 性別
          age: data.age,                 // 年齢
          has_spouse: data.has_spouse,         // 配偶者
          education: data.education,          // 学歴
      });
    }

    // フォームのオプション一覧を取得
    ['languages', 'databases', 'operating_systems', 'fw_mw_tool_items'].forEach((tableName) => {
      fetchOptions(tableName);
    });
  };

  /**
   * 選択肢一覧を取得する
   */
  const fetchOptions = async (tableName) => {
    const { data, error } = await supabase.from(tableName).select().order('name', {ascending: true});
    if (error) {
      console.error(error);
    } else {
      // react-selectのコンポーネントに合わせて成型する
      const optionList = data.map((d) => {
        return { value: d.name, label: d.name }
      });
      if (tableName === 'languages') {
        setLanguageOptions(optionList);
      } else if (tableName === 'databases') {
        setDatabaseOptions(optionList);
      } else if (tableName === 'operating_systems') {
        setOsOptions(optionList);
      } else if (tableName === 'fw_mw_tool_items') {
        setFwMwToolOptions(optionList);
      }
    }
  };

  /**
   * 案件を更新
   * @param {*} id 案件のID
   * @param {*} updatedProject 更新後の案件 
   */
  const updateProject = (id, updatedProject) => {
    const updated = projects.map(p => p.id === id ? updatedProject : p);
    setProjects(updated);
  };
  
  /**
   * 基本情報表示/非表示切り替え処理
   */
  const toggleDisplay = () => {
    setDisplayKihon(!displayKihon);
  }

  /**
   * 基本情報入力処理
   * @param {*} e 入力イベント
   */
  const handleChange = (e) => {
    setKihon({ ...kihon, [e.target.name]: e.target.value });
  };

  /**
   * 案件を追加する
   */
  const addProject = () => {
    const newCnt = projectsCnt + 1;
    const newProject = {
      ...project,
      id: `project${newCnt}`,
      project_name: `案件${newCnt}`,
      visible: true
    }
    setProjectsCnt(newCnt);
    setProjects([...projects, newProject]);
  }

  /**
   * 案件を削除する
   * @param {*} id 削除する案件のID
   */
  const deleteProject = (id) => {
    const newProjects = projects.filter((project) => { 
      return project.id !== id;
    })
    setProjects(newProjects);
  }

  /**
   * 指定された年月の差を「◯年◯ヶ月」形式で返す関数
   * 同年月の場合は「0年1ヶ月」として扱う
   * @param {string} startDate - 例: "2025-04"
   * @param {string} endDate - 例: "2026-03"
   * @returns {string} 例: "1年0ヶ月"
   */
  function calcElapsedPeriod(startDate, endDate) {
    if (!startDate || !endDate) {
      return "0年0ヶ月"
    }

    const [startYear, startMonth] = startDate.split('-').map(Number);
    const [endYear, endMonth] = endDate.split('-').map(Number);

    let yearDiff = endYear - startYear;
    let monthDiff = endMonth - startMonth;

    // 同年月の場合を1ヶ月として、以降+1ヶ月として計算する
    let totalMonths = yearDiff * 12 + monthDiff + 1;

    const resultYears = Math.floor(totalMonths / 12);
    const resultMonths = totalMonths % 12;

    return `${resultYears}年${resultMonths}ヶ月`;
  }

  /** 基本情報フォームの表示非表示を切り替えるリンクのテキスト */
  const kihonToggleText = displayKihon ? '閉じる' : '編集';

  /** 担当工程の表示アイコン */
  const dispPhaseIcon = (phase) => {
    return phase ? '●' : '';
  }

  return (
    <div className='skill-sheet'>
      <h1>Skill Sheet</h1>
      <div className="d-flex gap-4 py-2 wrapper">
        {/* 左エリア */}
        <div className='d-flex flex-column left-area'>
          {/* 基本情報 */}
          <div id="input-area" className="p-3 rounded border border-primary  mb-4 kihon-area">
            <div className='d-flex'>
              <h2>基本情報</h2>
              <button className='btn btn-link' onClick={toggleDisplay}>{kihonToggleText}</button>
            </div>
            <p>
              基本的にはログインユーザーの情報が表示されます。<br />
              ログインユーザーの情報とは異なる情報を表示したいときはこちらに入力してください。
            </p>
            {
              displayKihon && 
              <div>
                <form>
                  {/* 表示名（カナ） */}
                  <div className="row mb-3">
                    <label htmlFor="name_kana" className="col-sm-3 col-form-label">表示名（カナ）</label>
                    <div className="col-sm-9">
                      <input
                        id='name_kana'
                        type="text"
                        className="form-control"
                        name="name_kana"
                        value={kihon.name_kana}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* 表示名（漢字） */}
                  <div className="row mb-3">
                    <label htmlFor="name" className="col-sm-3 col-form-label">表示名（漢字）</label>
                    <div className="col-sm-9">
                      <input
                        id='name'
                        type="text"
                        className="form-control"
                        name="name"
                        value={kihon.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* 最寄駅 */}
                  <div className="row mb-3">
                    <label htmlFor="nearest_station" className="col-sm-3 col-form-label">最寄駅</label>
                    <div className="col-sm-9">
                      <input
                        id='nearest_station'
                        type="text"
                        className="form-control"
                        name="nearest_station"
                        value={kihon.nearest_station}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* 稼働 */}
                  <div className="row mb-3">
                    <label htmlFor="kadou" className="col-sm-3 col-form-label">稼働</label>
                    <div className="col-sm-9">
                      <input
                        id='kadou'
                        type="text"
                        className="form-control"
                        name="kadou"
                        value={kihon.kadou}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* 資格 */}
                  <div className="row mb-3">
                    <label htmlFor="qualifications" className="col-sm-3 col-form-label">資格</label>
                    <div className="col-sm-9">
                      <input
                        id='qualifications'
                        type="text"
                        className="form-control"
                        name="qualifications"
                        value={kihon.qualifications}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* 所属 */}
                  <div className="row mb-3">
                    <label htmlFor="affiliation" className="col-sm-3 col-form-label">所属</label>
                    <div className="col-sm-9">
                      <input
                        id='affiliation'
                        type="text"
                        className="form-control"
                        name="affiliation"
                        value={kihon.affiliation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* 性別 */}
                  <div className="row mb-3">
                    <label htmlFor="gender" className="col-sm-3 col-form-label">性別</label>
                    <div className="col-sm-9">
                      <input
                        id='gender'
                        type="text"
                        className="form-control"
                        name="gender"
                        value={kihon.gender}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* 年齢 */}
                  <div className="row mb-3">
                    <label htmlFor="age" className="col-sm-3 col-form-label">年齢</label>
                    <div className="col-sm-9">
                      <input
                        id='age'
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={3}
                        className="form-control"
                        name="age"
                        value={kihon.age}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* 配偶者 */}
                  <div className="row mb-3">
                    <label htmlFor="has_spouse" className="col-sm-3 col-form-label">配偶者</label>
                    <div className="col-sm-9">
                      <input
                        id='has_spouse'
                        type="text"
                        className="form-control"
                        name="has_spouse"
                        value={kihon.has_spouse}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* 学歴 */}
                  <div className="row mb-3">
                    <label htmlFor="education" className="col-sm-3 col-form-label">学歴</label>
                    <div className="col-sm-9">
                      <input
                        id='education'
                        type="text"
                        className="form-control"
                        name="education"
                        value={kihon.education}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">保存する</button>
                </form>
              </div>
            }
          </div>

          {/* 案件 */}
          {
            projects.map((project, index) => (
              <ProjectForm
                key={index}
                project={project}
                setProject={(updated) => updateProject(project.id, updated)}
                onDeleteProject={deleteProject}
                languageOptions={languageOptions}
                databaseOptions={databaseOptions}
                osOptions={osOptions}
                fwMwToolOptions={fwMwToolOptions}
              />
            ))
          }

          <div className='d-flex justify-content-center align-items-center'>
            <button className='btn btn-primary rounded-circle circle-button' onClick={addProject}><AddIcon /></button>
          </div>
        </div>

        {/* 右エリア */}
        <div id="preview-area" className="bg-success text-white p-4 rounded right-area">
          <h2 className='text-center'>スキルシート</h2>
          <div className='d-flex'>
            {/* 基本情報テーブル（左） */}
            <table className="table table-bordered table-sm mb-1 kihon-left-table project-table">
              <tbody>
                <tr>
                  <th scope="row" className="bg-th">フリガナ</th>
                  <td>{kihon.name_kana}</td>
                </tr>
                <tr>
                  <th scope="row" className="bg-th">氏名</th>
                  <td>{kihon.name}</td>
                </tr>
                <tr>
                  <th scope="row" className="bg-th">最寄駅</th>
                  <td>{kihon.nearest_station}</td>
                </tr>
                <tr>
                  <th scope="row" className="bg-th">稼働</th>
                  <td>{kihon.kadou}</td>
                </tr>
                <tr>
                  <th scope="row" className="bg-th">資格</th>
                  <td>{kihon.qualifications}</td>
                </tr>
              </tbody>
            </table>
            {/* 基本情報テーブル（右） */}
            <table className="table table-bordered table-sm mb-1 project-table">
              <tbody>
                <tr>
                  <th scope="row" className="bg-th">所属</th>
                  <td>{kihon.affiliation}</td>
                </tr>
                <tr>
                  <th scope="row" className="bg-th">性別</th>
                  <td>{kihon.gender}</td>
                </tr>
                <tr>
                  <th scope="row" className="bg-th">年齢</th>
                  <td>{kihon.age}</td>
                </tr>
                <tr>
                  <th scope="row" className="bg-th">配偶者</th>
                  <td>{kihon.has_spouse}</td>
                </tr>
                <tr>
                  <th scope="row" className="bg-th">学歴</th>
                  <td>{kihon.education}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 得意分野テーブル */}
          <table className="table table-bordered table-sm mb-1 project-table">
            <tbody>
              <tr>
                <th scope="row" className="bg-th">得意分野</th>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="bg-th">得意技術</th>
                <td></td>
              </tr>
              <tr>
                <th scope="row" className="bg-th">得意業務</th>
                <td></td>
              </tr>
            </tbody>
          </table>

          {/* 自己PRテーブル */}
          <table className="table table-bordered table-sm mb-1 project-table">
            <tbody>
              <tr>
                <th scope="row" className="bg-th">自己PR</th>
                <td></td>
              </tr>
            </tbody>
          </table>

          {/* 案件テーブル */}
          <table className="table table-bordered table-sm mb-1 project-table">
            <thead>
              <tr>
                <th className="bg-th project-header" rowSpan={2} colSpan={4} style={{ width: '20%' }}>期間</th>
                <th className="bg-th project-header" rowSpan={2} style={{ width: '30%' }}>業務内容</th>
                <th className="bg-th project-header" rowSpan={2} style={{ width: '10%' }}>役割<br />規模</th>
                <th className="bg-th project-header" rowSpan={2} style={{ width: '8%' }}>使用言語</th>
                <th className="bg-th project-header" rowSpan={2} style={{ width: '8%' }}>DB</th>
                <th className="bg-th project-header" rowSpan={2} style={{ width: '8%' }}>サーバOS</th>
                <th className="bg-th project-header" rowSpan={2} style={{ width: '8%' }}>FW・MW<br />ツール等</th>
                <th className="bg-th" colSpan={7} style={{ width: '8%' }}>担当工程</th>
              </tr>
              <tr>
                <th className="bg-th vertical-header">要件定義</th>
                <th className="bg-th vertical-header">基本設計</th>
                <th className="bg-th vertical-header">詳細設計</th>
                <th className="bg-th vertical-header">実装・単体</th>
                <th className="bg-th vertical-header">結合テスト</th>
                <th className="bg-th vertical-header">総合テスト</th>
                <th className="bg-th vertical-header">保守・運用</th>
              </tr>
            </thead>
            <tbody>
              {
                projects.map((project, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <th scope="row" rowSpan={3} className="bg-th vertical-align-center" style={{ width: '2%' }}>{index + 1}</th>
                      <td rowSpan={2} style={{ width: '8%' }}>{project.start_date}</td>
                      <td rowSpan={2} style={{ width: '2%' }}>-</td>
                      <td rowSpan={2} style={{ width: '8%' }}>{project.end_date}</td>
                      <td>{`■${truncateText(project.project_name, 14)}`}</td>
                      <td>{project.role}</td>
                      <td rowSpan={3}>
                        {
                          project.languages.map((lang, index) => (
                            <span key={index}>{lang.label}<br /></span>
                          ))
                        }
                      </td>
                      <td rowSpan={3}>
                        {
                          project.database.map((db, index) => (
                            <span key={index}>{db.label}<br /></span>
                          ))
                        }
                      </td>
                      <td rowSpan={3}>
                        {
                          project.os.map((o, index) => (
                            <span key={index}>{o.label}<br /></span>
                          ))
                        }
                      </td>
                      <td rowSpan={3}>
                        {
                          project.tools.map((tool, index) => (
                            <span key={index}>{tool.label}<br /></span>
                          ))
                        }
                      </td>
                      <td rowSpan={3} className='vertical-align-center'>{dispPhaseIcon(project.phase.requirements)}</td>
                      <td rowSpan={3} className='vertical-align-center'>{dispPhaseIcon(project.phase.basic_design)}</td>
                      <td rowSpan={3} className='vertical-align-center'>{dispPhaseIcon(project.phase.detail_design)}</td>
                      <td rowSpan={3} className='vertical-align-center'>{dispPhaseIcon(project.phase.implementation)}</td>
                      <td rowSpan={3} className='vertical-align-center'>{dispPhaseIcon(project.phase.integration_test)}</td>
                      <td rowSpan={3} className='vertical-align-center'>{dispPhaseIcon(project.phase.system_test)}</td>
                      <td rowSpan={3} className='vertical-align-center'>{dispPhaseIcon(project.phase.maintenance)}</td>
                    </tr>

                    <tr>
                      <td rowSpan={2}>
                        <span className='project-detail'>{`${project.project_detail}`}</span>
                      </td>
                      <td rowSpan={2}>
                        <span>
                          チーム<br />
                          {`${project.memberCounts.teams}名`}<br />
                          開発<br />
                          {`${project.memberCounts.developers}名`}<br />
                          全体<br />
                          {`${project.memberCounts.total}名`}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td colSpan={3} className='text-center'>{calcElapsedPeriod(project.start_date, project.end_date)}</td>
                    </tr>
                  </React.Fragment>
                ))
              }
            </tbody>
          </table>
          {
            projects.map((project, index) => (
              <p key={index}>{JSON.stringify(project)}</p>
            ))
          }
        </div>
      </div>
    </div>
  )

}
export default SkillSheet