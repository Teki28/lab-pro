import { Link,Outlet } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { Text } from "@chakra-ui/react";
const Navigation = ()=>{
  const auth = getAuth();
  const user = auth.currentUser;
  return (
    <div>
      <h1>Navigation</h1>
      <Text as="mark">Current User: {user.displayName || ''}</Text>
      <br></br>
      <Link to='/'>Home</Link>
      <Link to='/test'>Test</Link>
      <br></br>
      <Link to='/rat'><Button>Rats Page</Button></Link>
      <Outlet />
    </div>
  )
}

export default Navigation