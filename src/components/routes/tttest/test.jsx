import NumItem from "../../num_item/num_item"
import Shift from "../../shift/shift";
const Test = ()=>{
  const food_num = 10;
  const bedding_num = 20;
  const food_his = [
    { key:'1',
      date:'2022/10/22',
      user:'Daniel',
      action:'use',
      quantity:'2',
      note:' '
    },
    { key:'2',
      date:'2022/10/23',
      user:'James',
      action:'buy',
      quantity:'4',
      note:' '
    },
  ]
  return (
    <div>
      <h1>Test Page for Animal Room</h1>
      <NumItem name='Food' num = {food_num} his = {food_his}></NumItem>
      {/* <NumItem name='Bedding'></NumItem> */}
      <Shift></Shift>
    </div>
  )
}

export default Test