import { useNavigate } from 'react-router-dom' // React Routerを使うためのもの
import Button from '../components/Button/Button';

const Page1 = () => {
  const navigate = useNavigate()
  const changePage = (page) => {
    navigate(page)
  }
  return (
    <div className='page1'>
      <h1>page1</h1>
    </div>
  )

}
export default Page1