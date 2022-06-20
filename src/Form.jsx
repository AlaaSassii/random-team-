import React,{useState,useEffect,useRef,useReducer} from 'react'
import { FaRegTrashAlt } from "react-icons/fa";

const reducer = (state,action) => {
const {type,payload} = action
switch(type) {
    case "ADDED_NAME" : return {...state,isModalOpen:true,ModalContent:`added ${payload}`}
    case "PLACE_PERSON" :
        let team ; 
        if (payload.team === 0){
            team = 'team 1' ;
        }
        else team = 'team2' ;
        
    let  name = payload.name.name
    console.log(name);
        return {isModalOpen:true , ModalContent:`${name} in ${team}`} ; 
    case 'DELETE_PERSON' : return {isModalOpen:true , ModalContent:`delete ${payload}` ,danger:true} ; 
    case 'MODAL_SAKROU' : return {...state ,isModalOpen:false}
    case 'HAVE_FUN_MESSAGE' : return {isModalOpen:true,danger:false , ModalContent:'have fun guys!!!'} ; 
    case 'REPEAT_AGAIN' : return {...state,isModalOpen:true ,ModalContent:"repeat again"} ; 
    case 'NOTHING' : return {isModalOpen:false,ModalContent:'',danger:false} ;   
    case 'RESATE' : return {...state , isModalOpen:true , ModalContent:'reset'} ;
}
}
const Form = () => {
    const [state,dispatch] = useReducer(reducer,{isModalOpen:false,ModalContent:'',danger:false}) ; 
    
    const Reset = () => { 
        setPeople([]) ; 
        setTeam1([]) ; 
        setTeam2([]) ; 
        setSamePeople([])
        setRandom(false) ; 
        // setRepeatSamePeople(false)
        // dispatch({type:"NOTHING"})
    }

    const [name,setName] = useState('') ; 
    const [people,setPeople] = useState([]) ;
    const [random,setRandom] = useState(false)  ; 
    const [team1,setTeam1] = useState([]) ; 
    const [team2,setTeam2] = useState([]) ; 
    const refContainer = useRef(null)
    const [samePeople,setSamePeople] = useState([]) ; 
    const [repeatSamePpl,setRepeatSamePeople] = useState(false) ; 
    let yes = ''
    const handleSubmit = e => { 
        e.preventDefault() ; 
        if (name ) {
            const newPerson = {name , id : new Date().getTime().toString()} 
            setPeople([...people,newPerson]) ; 
            setName('')
            dispatch({type:'ADDED_NAME',payload:name})
        }
        if (random ){
            setName('')
            if (conditionOfTheTeams ) {
                setName('')
                yes = 'a'
                const randomName = people[(Math.random() * people.length) | 0] 
                const randomTeam = Math.floor(Math.random() * 2) 

                if (team2.length === 5 && team1.length === 5 ){
                    dispatch({type:"HAVE_FUN_MESSAGE"})
                }
                    

            else if ((randomTeam === 0 && team1.length < 5)||(randomTeam === 1 && !(team2.length < 5)) ) {
                    setTeam1([...team1,randomName]) ; 
                    setSamePeople([...samePeople,randomName])
                    const newPeople =people.filter(person => person.name !== randomName.name) ; 
                    console.log("newPeople",newPeople);
                    setPeople(newPeople)
                    dispatch({type:'PLACE_PERSON',payload:{team:randomTeam,name:randomName}})

                }
                else if ((randomTeam === 1 && team2.length < 5)||(randomTeam === 0 && !(team1.length < 5))) { 
                    setSamePeople([...samePeople,randomName])
                    setTeam2([...team2,randomName]) ; 
                    const newPeople =people.filter(person => person.name !== randomName.name) ; 
                    setPeople(newPeople)
                dispatch({type:'PLACE_PERSON',payload:{team:randomTeam,name:randomName}})
                }
                
                // smart =>
            // dispatch({type:'PLACE_PERSON',payload:{team:randomTeam,name:randomName}})
                

            }
        }
    }
    const repeatAgain = () => { 
        setTeam1([]) ; 
        setTeam2([]) ; 
        console.log(samePeople);
        setPeople([...samePeople]) ; // we need to put dots nextTime
        console.log(people);
        dispatch({type:'REPEAT_AGAIN'})
    }
    const conditionOfTheTeams = team1.length <= 5  || team2.length <= 5
    useEffect(()=> { 
        if (people.length > 9){
            setRandom(true)
        }
        else (setRandom(false))
    },[name])
    useEffect(()=> refContainer.current.focus())
    const deletePerson = (id) => { 
        setPeople(people.filter(person => person.id !== id )) }
        console.log('delete');
    
    useEffect(()=> { 
        if (team2.length === 5 && team1.length === 5 ){
            dispatch({type:"HAVE_FUN_MESSAGE"})
            setRepeatSamePeople(true)
        
        }
        else {
            setRepeatSamePeople(false)
            // dispatch({type:"REPEAT_AGAIN"})

        }
    },[team1,team2])
    useEffect(()=> { 
        if (people.length === 10) {
            dispatch({type:'NOTHING'})
        }
    },[random])
    useEffect(()=>{
        if(team1.length === 5 && team2.length === 5){

            setTimeout(()=>dispatch({type:'MODAL_SAKROU'},2200))
        }
    },[name])
  

    // }
    return (

        <div>
            {state.isModalOpen && <div className={`${state.danger ? 'Danger' : 'notDanger'}`}>{state.ModalContent}</div>  }
        <div className="appForm">
            

            <form onSubmit={handleSubmit}>
                <input ref={refContainer} placeholder="type a name" type="text" value={name} onChange={e => setName(e.target.value)} />
                <button>{random ? 'random' : 'add'}</button>

            </form>
            {
                !random && <ol>
                {
                    people.map(person => <div> <li key={person.id} >{person.name}</li> <FaRegTrashAlt onClick={()=>{
                        deletePerson(person.id) ; 
                        dispatch({type:"DELETE_PERSON",payload:person.name})
                    }}/> </div> )
                }
                </ol>
            }
            
            {
                random &&  
                <div className="displayFlexTeams">
                    <div>
                    <h1>team1</h1>
                    <ol>{
                    team1.map(person => <div> <li key={person.id} >{person.name}</li> </div> )
                }</ol> </div>
                <div>
                <h1>team2</h1>
                    <ol>{
                    team2.map(person => <div> <li key={person.id} >{person.name}</li>   </div> )
                }</ol> </div>
                </div>
            }

            {repeatSamePpl &&  <div className='buttons'>
                <button className="repeat-random" onClick={repeatAgain} >Repeat Same People</button>
                <button className="reset" onClick={Reset}>Reset</button>
                </div> }
            
        </div>
        </div>
    )
}

export default Form

// I can sure do many fucntions but I want it like it's 4 teams or even 100 ; well I will do it 2 function I don't wanna screw things app 
// alright I got really serious about seEffecy but unfortuatly it didn't work so I will something cool 

// const deletePersonTeam1 = (id) => { 
    //     setTeam1(team1.filter(person => person.id !== id ))
    //     console.log('delete');

    // }
    // const deletePersonTeam2 = (id) => { 
    //     setTeam2(team2.filter(person => person.id !== id ))
    //     console.log('delete');
