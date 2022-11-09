import { auth ,signOutUser} from "../../../lib/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithGooglePopup } from "../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { onAuthStateChangedListener } from "../../../lib/firebase";
const provider = new GoogleAuthProvider();
const handleClick = ()=>{
  signInWithGooglePopup(auth,provider)
}


onAuthStateChangedListener((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(uid)
    // ...
  } else {
    // User is signed out
    // ...
    console.log('no user')
  }
})

const handleGetUser = ()=>{
    const user = auth.currentUser
    console.log(user)
}
const handleSignOut = ()=>{
  signOutUser()
}
const Home = ()=>{
  return (
    <div className="Home">
      Home
      <button onClick={handleClick}>Google Sign In</button>
      <button onClick={handleGetUser}>cur user</button>
      <button onClick={handleSignOut}>sign out</button>
    </div>
  )
}

export default Home;