import { useNavigate  } from 'react-router-dom' // React Routerを使うためのもの

function Page1(){
    const navigate = useNavigate()
    const changePage = (page) =>{
        navigate(page)
    }
    return (
        <>
            <h1>page1</h1>
            <button onClick={() => changePage('/')}>Homeへ遷移</button>
            <button onClick={() => changePage('/Page2')}>page2へ遷移</button>
        </>
    )

}
export default Page1