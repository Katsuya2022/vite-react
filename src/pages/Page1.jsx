import { useState } from 'react'
import ProjectForm from '../components/SkillSheet/ProjectForm';
import AddIcon from '@mui/icons-material/Add';
import './Page1.css'

const Page1 = () => {
  const [displayKihon, setDisplayKihon] = useState(false);
  const [project, setProject] = useState({
    id: 'project1',
    title: '案件1',
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

  const kihonToggleText = displayKihon ? '閉じる' : '編集';

  return (
    <div className='page1'>
      <h1>Skill Sheet</h1>
      <div className="d-flex gap-4 py-2 px-4">
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
          <h2>右エリア</h2>
          <p>ここは右側の領域です。</p>
          <div className='d-flex'>
            <table class="table table-bordered table-sm mb-1">
              <tbody>
                <tr>
                  <th scope="row" class="bg-primary">フリガナ</th>
                  <td>AAA</td>
                </tr>
                <tr>
                  <th scope="row" class="bg-primary">氏名</th>
                  <td>AAA</td>
                </tr>
                <tr>
                  <th scope="row" class="bg-primary">最寄駅</th>
                  <td>AAA</td>
                </tr>
                <tr>
                  <th scope="row" class="bg-primary">稼働</th>
                  <td>AAA</td>
                </tr>
                <tr>
                  <th scope="row" class="bg-primary">資格</th>
                  <td>AAA</td>
                </tr>
              </tbody>
            </table>
            <table class="table table-bordered table-sm mb-1">
              <tbody>
                <tr>
                  <th scope="row" class="bg-primary">所属</th>
                  <td>AAA</td>
                </tr>
                <tr>
                  <th scope="row" class="bg-primary">性別</th>
                  <td>AAA</td>
                </tr>
                <tr>
                  <th scope="row" class="bg-primary">年齢</th>
                  <td>AAA</td>
                </tr>
                <tr>
                  <th scope="row" class="bg-primary">配偶者</th>
                  <td>AAA</td>
                </tr>
                <tr>
                  <th scope="row" class="bg-primary">学歴</th>
                  <td>AAA</td>
                </tr>
              </tbody>
            </table>
          </div>
          <table class="table table-bordered table-sm mb-1">
            <tbody>
              <tr>
                <th scope="row" class="bg-primary">得意分野</th>
                <td></td>
              </tr>
              <tr>
                <th scope="row" class="bg-primary">得意技術</th>
                <td></td>
              </tr>
              <tr>
                <th scope="row" class="bg-primary">得意業務</th>
                <td></td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered table-sm mb-1">
            <tbody>
              <tr>
                <th scope="row" class="bg-primary">自己PR</th>
                <td></td>
              </tr>
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
export default Page1