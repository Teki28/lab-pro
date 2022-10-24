import { useState } from "react"
import { nanoid } from "nanoid"

const NumItem = (props)=>{
  const name = props.name
  const num = parseInt(props.num)
  const his = props.his
  const curUser = 'Teki'
  const [curNum,setCurNum] = useState(num)
  const [inputVal,setInputVal] = useState(0)
  const [curHis,setCurHis] = useState(his)

  var handleAddClick = ()=>{
    var curDate = new Date()
    setCurNum(curNum+parseInt(inputVal))
    setCurHis([...curHis,{
      key:nanoid(),
      date:curDate.toLocaleString(),
      user:curUser,
      action:'Buy',
      quantity:inputVal,
      note:' '
    }])
  }

  var handleSubClick = ()=>{
    var curDate = new Date()
    setCurNum(curNum-parseInt(inputVal))
    setCurHis([...curHis,{
      key:nanoid(),
      date:curDate.toLocaleString(),
      user:curUser,
      action:'Use',
      quantity:inputVal,
      note:' '
    }])
  }


  return (
    <div>
      <h1>Num of {name}: {curNum}</h1>
      <h2>History</h2>
      {
        curHis.map((item)=>{
          return (
            <div key={item.key}>At {item.date} , {item.user} {item.action} {item.quantity} {name} Note: {item.note}</div>
          )
        })
      }
      <input type='number' onChange={(e)=>setInputVal(e.target.value)}></input>
      <button onClick={handleAddClick}>add</button>
      <button onClick={handleSubClick}>sub</button>

    </div>
  )
}

export default NumItem