import './Page1.css'

const Page1 = () => {
  return (
    <div className='page1'>
      <h1>Skill-Sheet</h1>
      <div className="d-flex gap-4 p-4">
        {/* <!-- 左エリア --> */}
        <div id="input-area" className="bg-primary text-white p-4 rounded">
          <h2>左エリア</h2>
          <p>ここは左側の領域です。</p>
        </div>

        {/* <!-- 右エリア --> */}
        <div id="preview-area" className="bg-success text-white p-4 rounded">
          <h2>右エリア</h2>
          <p>ここは右側の領域です。</p>
        </div>
      </div>
    </div>
  )

}
export default Page1