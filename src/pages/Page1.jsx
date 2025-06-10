import { useNavigate  } from 'react-router-dom' // React Routerを使うためのもの

function Page1(){
    const navigate = useNavigate()
    const changePage = () =>{
        navigate('/Page2')
    }
    return (
        <>
            <h1>page1</h1>
            <button onClick={changePage}>pageBへ遷移</button>
        </>
    )

}
export default Page1