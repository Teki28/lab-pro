import { useState } from "react";


const Rat = ()=>{
  const rats = [
    {
      id:1,
      name:'Taro',
      birthday:'2022/09/22',
      gender:'0',
      position:[1,'a'],
      note:'operation'
    },
    {
      id:2,
      name:'Jiro',
      birthday:'2022/09/10',
      gender:'1',
      position:[2,'c'],
      note:'operation'
    },
    {
      id:3,
      name:'Sanro',
      birthday:'2022/09/01',
      gender:'0',
      position:[2,'b'],
      note:''
    },
    {
      id:4,
      name:'Yonro',
      birthday:'2022/08/22',
      gender:'0',
      position:[2,'b'],
      note:'operation'
    }
  ]


  const [fstStage,setFstStage] = useState({})
  const [sndStage,setSndStage] = useState({})
  const [trdStage,setTrdStage] = useState({})
  rats.forEach((rat)=>{
    switch (rat.position[0]){
      case 0:
        if(fstStage.hasOwnProperty(rat.position[1])) fstStage[rat.position[1]].push(rat)
        else fstStage[rat.position[1]] = [rat]
        break;
      case 1:
        if(sndStage.hasOwnProperty(rat.position[1])) sndStage[rat.position[1]].push(rat)
        else sndStage[rat.position[1]] = [rat]
        break;
      case 2:
        if(trdStage.hasOwnProperty(rat.position[1])) trdStage[rat.position[1]].push(rat)
        else trdStage[rat.position[1]] = [rat]
        break;
      default:
        break;
    }
  })




  return (
    <div>
      <h1>Rat Page</h1>
      <button onClick={()=>console.log("1st:",fstStage,"2nd",sndStage,"3rd",trdStage)}>log</button>
      <br></br>
      { 
          Object.values(trdStage).map(
            (cage)=>{
               return (<span key={cage}> 
                {
              cage.map((rat)=>{
                return <span key={rat.name}>{rat.name} </span>
              })
                }
                <span>  *****  </span>
              </span>)

            } 
         )
      }
      <br></br>
      { 
          Object.values(sndStage).map(
            (cage)=>{
               return (<span key={cage}> 
                {
              cage.map((rat)=>{
                return <span key={rat.name}>{rat.name} </span>
              })
                }
                <span>  *****  </span>
              </span>)

            } 
         )
      }
      <br></br>
      { 
          Object.values(fstStage).map(
            (cage)=>{
               return (<span key={cage}> 
                {
              cage.map((rat)=>{
                return <span key={rat.name}>{rat.name} </span>
              })
                }
                <span>  *****  </span>
              </span>)

            } 
         )
      }
    </div>
  )
}


export default Rat