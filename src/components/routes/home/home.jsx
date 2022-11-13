import { onAuthStateChangedListener } from "../../../lib/firebase";
import { Box,Image } from "@chakra-ui/react";
import ratSvg from '../../../static/ratwithcheese11.svg'
import './home.css'
// const provider = new GoogleAuthProvider();

// const handleClick = ()=>{
//   signInWithGooglePopup(auth,provider)
// }


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

// const handleGetUser = ()=>{
//     const user = auth.currentUser
//     console.log(user)
// }
// const handleSignOut = ()=>{
//   signOutUser()
// }
const Home = ()=>{

  return (
  <Box bg='green.200' w='100%' h='100vh' p={4}>
    <Box fontFamily={'Secular One'} fontSize='4xl' mt='20vh' textAlign='center' color='gray.600'>Welcome to Lab-Pro!</Box>
    <Box fontFamily={'Secular One'} fontSize='2xl' textAlign='center' mt='5vh' color='gray'>An experimental animal management web application</Box>
    <Image mt='10vh' ml='40%' w='25%' h='35%' src={ratSvg} />
  </Box>
    // <button onClick={handleClick}>Google Sign In</button>
    // <button onClick={handleGetUser}>cur user</button>
    // <button onClick={handleSignOut}>sign out</button>

  )
}

export default Home;