import React, { useState } from 'react'
import ProjectForm from '../components/SkillSheet/ProjectForm';
import AddIcon from '@mui/icons-material/Add';
import './SkillSheet.css'

const SkillSheet = () => {
  const [displayKihon, setDisplayKihon] = useState(false);
  const [project, setProject] = useState({
    id: 'project1',
    title: '案件1',
    startDate: '',
    endDate: '',
    period: 0, 
    projectDetail: '',
    role: '',
    memberCounts: {
      teams: 0,       // チーム
      developers: 0,  // 開発
      total: 0,       // 全体
    },
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
    },
    visible: true
  });
  const [projects, setProjects] = useState([
    project
  ]);
  // setProject 関数を定義して個別プロジェクトを更新
  const updateProject = (id, updatedProject) => {
    const updated = projects.map(p => p.id === id ? updatedProject : p);
    setProjects(updated);
  };
  
  const toggleDisplay = () => {
    setDisplayKihon(!displayKihon);
  }

  const addProject = () => {
    const cntProjects = projects.length + 1;
    const newProject = {
      ...project,
      id: `project${cntProjects}`,
      title: `案件${cntProjects}`,
      visible: true
    }
    setProjects([...projects, newProject]);
  }

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

  const kihonToggleText = displayKihon ? '閉じる' : '編集';

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
                  <button type="submit" className="btn btn-primary">保存する</button>
                </form>
              </div>
            }
          </div>

          {/* 案件 */}
          {
            projects.map((project, index) => (
              <ProjectForm key={index} project={project} setProject={(updated) => updateProject(project.id, updated)} onDeleteProject={deleteProject} />
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
                  <td>AAA</td>
                </tr>
                <tr>
                  <th scope="row" className="bg-th">氏名</th>
                  <td>AAA</td>
                </tr>
                <tr>
                  <th scope="row" className="bg-th">最寄駅</th>
                  <td>AAA</td>
                </tr>
                <tr>
                  <th scope="row" className="bg-th">稼働</th>
                  <td>AAA</td>
                </tr>
                <tr>
                  <th scope="row" className="bg-th">資格</th>
                  <td>AAA</td>
                </tr>
              </tbody>
            </table>
            {/* 基本情報テーブル（右） */}
            <table className="table table-bordered table-sm mb-1 project-table">
              <tbody>
                <tr>
                  <th scope="row" className="bg-th">所属</th>
                  <td>AAA</td>
                </tr>
                <tr>
                  <th scope="row" className="bg-th">性別</th>
                  <td>AAA</td>
                </tr>
                <tr>
                  <th scope="row" className="bg-th">年齢</th>
                  <td>AAA</td>
                </tr>
                <tr>
                  <th scope="row" className="bg-th">配偶者</th>
                  <td>AAA</td>
                </tr>
                <tr>
                  <th scope="row" className="bg-th">学歴</th>
                  <td>AAA</td>
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
                      <th scope="row" rowSpan={2} className="bg-th" style={{ width: '2%' }}>1</th>
                      <td style={{ width: '8%' }}>{project.startDate}</td>
                      <td style={{ width: '2%' }}>-</td>
                      <td style={{ width: '8%' }}>{project.endDate}</td>
                      <td>{`■${project.title}`}</td>
                      <td>{project.role}</td>
                      <td rowSpan={2}>
                        <span>
                          JavaScript<br />
                          node.js
                        </span>
                      </td>
                      <td rowSpan={2}>
                        <span>
                          AWS<br />
                          postgreSQL
                        </span>
                      </td>
                      <td rowSpan={2}>
                        <span>
                          Windows<br />
                          Linux
                        </span>
                      </td>
                      <td rowSpan={2}>
                        <span>
                          Vue.js<br />
                          Buefy<br />
                          C3.js<br />
                          Sequelize<br />
                          Swagger<br />
                          Git<br />
                          RedMine<br />
                          A5M2
                        </span>
                      </td>
                      <td rowSpan={2}>{dispPhaseIcon(project.phase.requirements)}</td>
                      <td rowSpan={2}>{dispPhaseIcon(project.phase.basicDesign)}</td>
                      <td rowSpan={2}>{dispPhaseIcon(project.phase.detailDesign)}</td>
                      <td rowSpan={2}>{dispPhaseIcon(project.phase.implementation)}</td>
                      <td rowSpan={2}>{dispPhaseIcon(project.phase.integrationTest)}</td>
                      <td rowSpan={2}>{dispPhaseIcon(project.phase.systemTest)}</td>
                      <td rowSpan={2}>{dispPhaseIcon(project.phase.maintenance)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='text-center'>{calcElapsedPeriod(project.startDate, project.endDate)}</td>
                      <td>
                        <span className='project-detail'>{`${project.projectDetail}`}</span>
                      </td>
                      <td>
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