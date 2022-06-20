import React ,{useState} from 'react'
import Loading from './Loading'
import Form from './Form'
const App = () => {
    const [loading,setLoading] = useState(true)
    const loadingFalse = () => { 
        setLoading(false)
    }
    return (
        <div >
            {loading && <Loading loadingFalse={loadingFalse}/>}
            {!loading && <Form/> }
        </div>
    )
}

export default App
