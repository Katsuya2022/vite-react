import { useNavigate } from 'react-router-dom' // React Routerを使うためのもの
import Button from '../components/Button/Button';

const Page2 = () => {
  const navigate = useNavigate()
  const changePage = (page) => {
    navigate(page)
  }
  return (
    <div className='page2'>
      <h1>page2</h1>
    </div>
  )

}
export default Page2