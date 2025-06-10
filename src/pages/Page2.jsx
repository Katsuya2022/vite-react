import { useNavigate  } from 'react-router-dom' // React Routerを使うためのもの

function Page2(){
    const navigate = useNavigate()
    const changePage = () =>{
        navigate('/')
    }
    return (
        <>
        <h1>page2</h1>
        <button onClick={changePage}>page1へ遷移</button>
        </>
    )

}
export default Page2