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
      <Button text='page1へ遷移' func={() => changePage('/page1')}></Button>
      <Button text='page2へ遷移' func={() => changePage('/page2')}></Button>
    </div>
  )

}
export default Home