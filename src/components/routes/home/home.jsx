import { onAuthStateChangedListener } from "../../../lib/firebase";
import { getAuth } from "firebase/auth";
import { Box,Button,CheckboxIcon,Image,Divider} from "@chakra-ui/react";
import moment from "moment/moment";
import { nanoid } from "nanoid";
import { useState } from "react";
import { limit, orderBy, setDoc } from "firebase/firestore";
import { useDisclosure } from '@chakra-ui/react'
import { doc } from "firebase/firestore";
import { Grid, GridItem } from '@chakra-ui/react'
import {
  Text,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'
import {CheckCircleIcon,InfoIcon,WarningTwoIcon} from '@chakra-ui/icons'
import ratSvg from '../../../static/ratwithcheese11.svg'
import './home.css'
import { addCollectionAndDocuments,db } from "../../../lib/firebase";
import {useFirestoreQueryData} from "@react-query-firebase/firestore"
import { collection, query } from "firebase/firestore";
// const provider = new GoogleAuthProvider();

// const handleClick = ()=>{
//   signInWithGooglePopup(auth,provider)
// }



const initPosts = [
  {
  id:'1',
  name:'Tom',
  date:'2022-10-17',
  content:'Do not feed rat Taro-kun!',
  type:'0'
},
{
  id:'2',
  name:'Sam',
  date:'2021-11-22',
  content:'Do not feed rat Taro-kun!',
  type:'1'
},
{
  id:'3',
  name:'Janifer',
  date:'2022-11-19',
  content:'Do not feed rat Taro-kun!',
  type:'2'
},
{
  id:'4',
  name:'Smith',
  date:'2022-12-02',
  content:'Do not feed rat Taro-kun!',
  type:'1'
},
{
  id:'5',
  name:'Pilson',
  date:'2019-10-22',
  content:'Do not feed rat Taro-kun!',
  type:'0'
},
]



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
  const auth = getAuth();
  const user = auth.currentUser;

  const postsRef = collection(db, 'posts');
  const postsQuery = useFirestoreQueryData(["posts"],query(postsRef,orderBy("date","desc"),limit(10)),{subscribe:true,idField:"id"})
  const posts = postsQuery.data || []

   
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [type,setType] = useState('')
  const [content,setContent] = useState('')

  const handleContentChange = (e)=>{
    setContent(e.target.value)
  }
  const handleTypeChange = (e)=>{
    setType(e.target.value)
  }
  const handleAdd = ()=>{
    console.log(user)
    const curDate =  moment().format('YYYY-MM-DD')
    const newContent = {
      id: nanoid(),
      name:user.displayName || 'Visitor',
      date:curDate,
      content:content,
      type:type
    }
    setDoc(doc(db, "posts", newContent.id), newContent);
    setContent('')
    setType('')
    onClose();
  }

  const IconList = [InfoIcon,WarningTwoIcon,CheckCircleIcon]
  const ColorList = ['green.500','red.500','blue.500']

  // const initFirestore = ()=>{
  // alert("I know you gonna click🤗 just wasted you 10 sec")
  // addCollectionAndDocuments('posts',initPosts)
  // }

  return (
  <Box bg='green.200' w='100%' h='100vh' p={4}>
    <Box fontFamily={'Secular One'} fontSize='4xl' mt='20vh' textAlign='center' color='gray.600'>Welcome to Lab-Pro!</Box>
    <Box fontFamily={'Secular One'} fontSize='2xl' textAlign='center' mt='5vh' color='gray'>An experimental animal management web application</Box>

    <Grid templateColumns='repeat(2, 1fr)' gap={6} mt='10%'>
      <GridItem w='100%'>    
        <Image h='80%'  src={ratSvg} />
      </GridItem>
      <GridItem w='100%'>    
        <Box boxShadow='dark-lg' rounded='md' bg='green.100'>
          <List h='30vh' overflow='scroll'>
            { 
              posts.map(post=>{
                return (
                <ListItem key={post.id}>
                  <ListIcon as={IconList[parseInt(post.type)]} color={ColorList[parseInt(post.type)]}/>
                  <b>{post.name}</b> at <b>{post.date}</b> said: <br />
                  <Text as='b' color='gray.600'>{post.content}</Text>
                  <Divider color='gray' />
                </ListItem>
                )
              })
            }
          </List>
        </Box>
        <Button mt='2vh' ml='40%' onClick={onOpen}>Add Post</Button>
      </GridItem>
    </Grid>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Input Rat Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <br></br>
              <Select placeholder='Select type' onChange={handleTypeChange}>
                <option value='1'>Info</option>
                <option value='0'>Alert</option>
                <option value='2'>News</option>
              </Select>
              <br></br>
              <input type="text" placeholder="input content here" onChange={handleContentChange}/>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='add' variant='ghost' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button  colorScheme='blue' onClick={()=>{handleAdd()}}>Add</Button>
          </ModalFooter>
        </ModalContent>
  </Modal>
  </Box>
    // <button onClick={handleClick}>Google Sign In</button>
    // <button onClick={handleGetUser}>cur user</button>
    // <button onClick={handleSignOut}>sign out</button>
  )
}

export default Home;