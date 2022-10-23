import { Link,Outlet } from "react-router-dom";

const Navigation = ()=>{
  return (
    <div>
      <h1>Navigation</h1>
      <Link to='/'>Home</Link>
      <Link to='/test'>Test</Link>
      <Outlet />
    </div>
  )
}

export default Navigation