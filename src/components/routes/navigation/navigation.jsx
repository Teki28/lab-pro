import { Link,Outlet } from "react-router-dom";
import { getCurrentUser } from "../../../lib/firebase";
const Navigation = ()=>{
  const curUser = getCurrentUser()?getCurrentUser():'please log in'
  return (
    <div>
      <h1>Navigation</h1>
      <h1>Current User: </h1>
      <Link to='/'>Home</Link>
      <Link to='/test'>Test</Link>
      <Link to='/rat'>Rat Details</Link>
      <Outlet />
    </div>
  )
}

export default Navigation