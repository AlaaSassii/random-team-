import React,{useEffect} from 'react'

const Loading = ({loadingFalse}) => {
    useEffect(()=> { 
        setTimeout(()=>{loadingFalse() 
        },5000)
    } ,[])
    return (
        <div className="loading">
            <h1>Hi there</h1>
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            <h1>It May Take a While..</h1>
        </div>
    )
}

export default Loading
