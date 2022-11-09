import { useState } from "react";
const Shift = ()=>{
  const members = ['Tom','Jerry','Jane','Daniel','James','Lilly'];
  const curUser = 'admin'
  // API to be added: fetch shift data from firebase && fetch current user and all members list from firebase
  let Oshift = [
    {date:'2022/10/20',
    person:'Tom',
    Uperson:'Jerry'
    },
    {date:'2022/10/27',
    person:'James',
    Uperson:'Lily'
    },
    {date:'2022/11/07',
    person:'Jane',
    Uperson:'Daniel'
    },
    {date:'2022/11/22',
    person:'Tom',
    Uperson:'Jerry'
    },
  ]

  const [shift,setShift] = useState(Oshift)
  const [newDate,setNewDate] = useState('')
  const [newPerson,setNewPerson] = useState('')
  const [newUPerson,setNewUPerson] = useState('')

  const handleClick = ()=>{
    let objToAdd = {
      date:newDate,
      person:newPerson,
      Uperson:newUPerson
    }
    if(shift.length>6){
      shift.shift()
    }
    setShift([...shift,objToAdd])
    //API to be added: update shift data to firebase store
  }

  return (
    <div>
      <h1>Shift</h1>
        {
          curUser==='admin' && 
          <div>
            <input type='date' placeholder="date" onChange={(e)=>{setNewDate(e.target.value)}}></input>
            <input placeholder="person1" onChange={(e)=>{setNewPerson(e.target.value)}}></input>
            <input placeholder="Uterus Person" onChange={(e)=>{setNewUPerson(e.target.value)}}></input>
            <button onClick={handleClick}>submit</button>
        </div>
        }

        
      
      {shift.map((item)=>{
        return (
          <div key={item.date+item.person+item.Uperson}>date: {item.date} person: {item.person} {item.Uperson}</div>
        )
      })}
    </div>
  )
}

export default Shift