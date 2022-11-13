import { Link,Outlet } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { signOutUser } from "../../../lib/firebase";
import './navigation.css'
import {
  Box,
  Drawer,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Container,
  VStack,
  StackDivider,
  Button
} from '@chakra-ui/react'
import {HamburgerIcon,CalendarIcon,ViewIcon,LockIcon} from '@chakra-ui/icons'
import { useDisclosure } from '@chakra-ui/react'
import { useRef } from "react";
const Navigation = ()=>{
  const auth = getAuth();
  const user = auth.currentUser;
  const handleSignOut = ()=>{
    signOutUser()
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef =useRef()

  return (

    <>
    <div className='menuIcon'>
      <IconButton ref={btnRef} colorScheme='blackAlpha' onClick={onOpen} icon={<HamburgerIcon />} />
    </div>
    
    <Drawer
      isOpen={isOpen}
      placement='left'
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      
      <DrawerContent w='30%' maxW='30%'>
        <DrawerCloseButton />
        <br></br>
        <Container mb='5vh' mt='5vh'>Welcome, {user.displayName || ''}</Container>
            <VStack
              divider={<StackDivider borderColor='gray.200' />}
              align='stretch'
              h='80vh'
            >

              <Box bg='gray.100' h='20vh' textAlign='center' lineHeight='20vh'><Link to='/'><CalendarIcon /> Home</Link></Box>
              <Box bg='gray.100' h='20vh' textAlign='center' lineHeight='20vh'><Link to='/rat'><ViewIcon /> Rats Page</Link> </Box>
              <Box bg='gray.100' h='20vh' textAlign='center' lineHeight='20vh'><Link to='/test'><LockIcon /> Under dev</Link></Box>


          </VStack>
        <DrawerFooter>
          <Button  ref={btnRef} colorScheme='red' onClick={handleSignOut}>Sign Out </ Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    <Outlet />
  </>
    // <div>
    //   <h1>Navigation</h1>
    //   <Text as="mark">Current User: {user.displayName || ''}</Text>
    //   <br></br>
    //   <Link to='/'>Home</Link>
    //   <Link to='/test'>Test</Link>
    //   <br></br>
    //   <Link to='/rat'><Button>Rats Page</Button></Link>
    //   <Outlet />
    // </div>
  )
}

export default Navigation