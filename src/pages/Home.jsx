import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className='home'>
      <h1>Home</h1>
      {
        user ? (
          <p>プロフィールの入力はお済みですか？</p>
        ) : (
          <p>まずはログインしてください。</p>
        )
      }
    </div>
  )

}
export default Home