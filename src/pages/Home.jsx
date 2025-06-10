import { useNavigate  } from 'react-router-dom' // React Routerを使うためのもの

function Home(){
    const navigate = useNavigate()
    const changePage = (page) =>{
        navigate(page)
    }
    return (
        <>
            <h1>Home</h1>
            <button onClick={() => changePage('/Page1')}>page1へ遷移</button>
            <button onClick={() => changePage('/Page2')}>page2へ遷移</button>
        </>
    )

}
export default Home