import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';

const Home = () => {
  const navigate = useNavigate()
  const changePage = (page) => {
    navigate(page)
  }
  return (
    <div className='home'>
      <h1>Home</h1>
    </div>
  )

}
export default Home