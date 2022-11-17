import { useState} from "react";
import moment from "moment/moment";
import {BsGenderFemale,BsGenderMale} from 'react-icons/bs'
import {FaBaby} from 'react-icons/fa'
import { Avatar, Box} from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { nanoid } from "nanoid";
import { getDoc, setDoc,updateDoc } from "firebase/firestore";
import ratBadge from '../../../static/rat.jpg'
// import { addCollectionAndDocuments } from "../../../lib/firebase";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tfoot,
  Text
} from '@chakra-ui/react'
import {
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import React from 'react';
import { collection, query } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import {useFirestoreQueryData} from "@react-query-firebase/firestore"
import { doc } from "firebase/firestore";


const Rat = ()=>{

  const ratsRef = collection(db, 'rats');
  const ratsQuery = useFirestoreQueryData(["rats"],query(ratsRef),{subscribe:true,idField:"name"})
  const qrats = ratsQuery.data || []

  const curDate =  moment().format('YYYY-MM-DD')
  const color = ['green','red','blue']
  // const init_rats = [
  //   {
  //     id:'1',
  //     nickName:'Taro',
  //     birthday:'2022-09-22',
  //     gender:'1',
  //     position:[1,'a'],
  //     notes:['operation','no feeding'],
  //     isDead:null
  //   },
  //   {
  //     id:'2',
  //     nickName:'Jiro',
  //     birthday:'2022-09-10',
  //     gender:'2',
  //     position:[2,'c'],
  //     notes:['operation'],
  //     isDead:null
  //   },
  //   {
  //     id:'3',
  //     nickName:'Sanro',
  //     birthday:'2022-09-01',
  //     gender:'0',
  //     position:[2,'b'],
  //     notes:[],
  //     isDead:null
  //   },
  //   {
  //     id:'4',
  //     nickName:'Yonro',
  //     birthday:'2022-08-22',
  //     gender:'0',
  //     position:[2,'b'],
  //     notes:['operation'],
  //     isDead:null
  //   }
  // ]

  const initFirestore = ()=>{
    alert("I know you gonna click🤗 just wasted you 10 sec")
    // addCollectionAndDocuments('rats',init_rats)
    console.log('add run')
  }

 
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [newBirthday,setNewBirthday] = useState('')
  const [newName,setNewName] = useState('')
  const [newGender,setNewGender] = useState('')
  const [newTags,setNewTags] = useState([])
  const { 
    isOpen: isOpenTagModal, 
    onOpen: onOpenTagModal, 
    onClose: onCloseTagModal 
} = useDisclosure()
  const {
    isOpen:isOpenBabyGender,
    onOpen:onOpenBabyGender,
    onClose:onCloseBabyGender
  } = useDisclosure()

  const [idToAdd,setIdToAdd] = useState()
  const [tagToAdd,setTagToAdd] = useState('')


  // Dragable data function, work on in the future

  // const [fstStage,setFstStage] = useState({})
  // const [sndStage,setSndStage] = useState({})
  // const [trdStage,setTrdStage] = useState({})
  // rats.forEach((rat)=>{
  //   switch (rat.position[0]){
  //     case 0:
  //       if(fstStage.hasOwnProperty(rat.position[1])) fstStage[rat.position[1]].push(rat)
  //       else fstStage[rat.position[1]] = [rat]
  //       break;
  //     case 1:
  //       if(sndStage.hasOwnProperty(rat.position[1])) sndStage[rat.position[1]].push(rat)
  //       else sndStage[rat.position[1]] = [rat]
  //       break;
  //     case 2:
  //       if(trdStage.hasOwnProperty(rat.position[1])) trdStage[rat.position[1]].push(rat)
  //       else trdStage[rat.position[1]] = [rat]
  //       break;
  //     default:
  //       break;
  //   }
  // })
  
  const handleDeathReport = (id)=>{
    const docRef = doc(db, "rats", id);
    updateDoc(docRef,{
      isDead:curDate
    })
  }
  const handleAdd = ()=>{
    const newRat = {
      id: nanoid(),
      nickName:newName,
      birthday:newBirthday,
      gender:newGender,
      position:[2,'c'],
      notes:newTags,
      isDead:null
    }
    setDoc(doc(db, "rats", newRat.id), newRat);
    formInit();
    onClose();
  }

  const formInit = ()=>{
    setNewName('')
    setNewBirthday('')
    setNewGender('')
    setNewTags('')
  }

  // const handleNewBirthday = (e)=>{console.log(e.target.value)}
  const handleNameChange = (e)=>{
    setNewName(e.target.value)
  }
  const handleDateChange = (e)=>{
    setNewBirthday(e.target.value)
    console.log(e.target.value)
  }
  const handleGenderChange = (e)=>{
    setNewGender(e.target.value)
    console.log(e.target.value)
  }
  const handleTagsChange = (e)=>{

    const newTag = e.target.value!==''?e.target.value.split(','):[]
    console.log(newTag)
    setNewTags(newTag)
  }
  const handleBabyMale = ()=>{
    const docRef = doc(db,'rats',idToAdd)
    updateDoc(docRef,{
      gender:'1'
    })
    onCloseBabyGender()
  }
  const handleBabyFemale = ()=>{
    const docRef = doc(db,'rats',idToAdd)
    updateDoc(docRef,{
      gender:'0'
    })
    onCloseBabyGender()
  }
  const handleOpenBabyModal = (id)=>{
    setIdToAdd(id)
    onOpenBabyGender();
  }
  const handleDeleteTag = async (id,index)=>{
    const docRef = doc(db, "rats", id);
    const docSnap = await getDoc(docRef);
    const curNotes = docSnap.data().notes
    const afdeletedNotes = curNotes.filter((_,i)=>i!==index)
    updateDoc(docRef,{
      notes:afdeletedNotes
    })
  }
  const handleAddTag = async ()=>{
    console.log(idToAdd)
    const docRef = doc(db, "rats", idToAdd);
    const docSnap = await getDoc(docRef);
    const curNotes = docSnap.data().notes
    updateDoc(docRef,{
      notes:[...curNotes,tagToAdd]
    })
    onCloseTagModal();
  }
  const handleOpenTagModal = (id)=>{
    setIdToAdd(id)
    onOpenTagModal();
  }
  const handleTagToAddChange = (e)=>{
    setTagToAdd(e.target.value)
  }

  return (
    <Box h='100vh'>
      {/* For data initialization at development  */}
      <Button mt='5vh' onClick={initFirestore}>Init Data(For test, do not click!)</Button>
      <Text color='blackAlpha.600' fontSize='2xl'>Toal: {qrats.filter(rat=>rat.isDead===null).length}     Male: {qrats.filter(rat=>rat.gender==='1' && rat.isDead===null).length}     Female: {qrats.filter(rat=>rat.gender==='0' && rat.isDead===null).length}     Baby: {qrats.filter(rat=>rat.gender==='2' && rat.isDead===null).length}</Text>
  <Table variant='striped' colorScheme='teal'>
    <Thead>
      <Tr>
        <Th>Rats</Th>
        <Th>Age(days)</Th>
        <Th>Gender</Th>
        <Th>Tags</Th>
        <Th>Operation</Th>
      </Tr>
    </Thead>
    <Tbody>
      {
        qrats.map((rat,index)=>{
          if(rat.isDead!==null){
            return null
          }
          return (
            <Tr key={rat.id}>
              <Td><Avatar name='Kent Dodds' src={ratBadge}/>{rat.nickName}</Td>
              <Td>{-1*moment(rat.birthday).diff(curDate,'days')}</Td>
              <Td>{rat.gender==='0'?<BsGenderFemale/>:(rat.gender==='1'?<BsGenderMale/>:<div><FaBaby/><Button size='xs' onClick={()=>handleOpenBabyModal(rat.id)}>Report Gender</Button></div>)}
              </Td>
              <Td>
              <Button onClick={()=>handleOpenTagModal(rat.id)}>+</Button>

                {rat.notes.map((note,index)=>{
                  return (
                    <Tag key={index} borderRadius='full' variant='solid' colorScheme={color[index]}>
                    <TagLabel>{note}</TagLabel>
                    <TagCloseButton onClick={()=>{handleDeleteTag(rat.id,index)}} />
                  </Tag>
                  )
                })}
              </Td>
              <Td>
              <Button colorScheme='red' size='xs' onClick={()=>{handleDeathReport(rat.id)}}>
                Report Death
              </Button>
              </Td>
            </Tr>
          )
        })
      }
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>    
          <Button colorScheme='blue' size='xs' onClick={onOpen}>
                ADD RAT
          </Button>
        </Th>
  
      </Tr>
    </Tfoot>
  </Table>
  <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Input Rat Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <Text as="mark">Birthday:   </Text><input type="date" placeholder="birthday" onChange={handleDateChange}/>
              <br></br>
              <Text as="mark">Rat/Owner's Name:   </Text><input type="text" placeholder="name:" onChange={handleNameChange}/>
              <br></br>
              <Select placeholder='Select gender' onChange={handleGenderChange}>
                <option value='1'>Male</option>
                <option value='0'>Female</option>
                <option value='2'>Baby</option>
              </Select>
              <Text as="mark">Notes:use comma to separate</Text>
              <br></br>
              <input type="text" placeholder="tags" onChange={handleTagsChange}/>
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
  <Modal isOpen={isOpenTagModal} onClose={onCloseTagModal}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Input New Tag Content</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                      <input type="text" placeholder="new tag" onChange={handleTagToAddChange}/>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme='red' variant='ghost' onClick={onCloseTagModal}>
                      Cancel
                    </Button>
                    <Button ml={3} colorScheme='teal' onClick={handleAddTag}>Add</Button>
                  </ModalFooter>
                </ModalContent>
  </Modal>
  <Modal isOpen={isOpenBabyGender} onClose={onCloseBabyGender}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Report Gender of baby</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                      <Text color='red'>Caution: Gender can not be changed again once selected!</Text>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleBabyMale}>
                      Male
                    </Button>
                    <Button colorScheme='blue' mr={3} onClick={handleBabyFemale}>
                      Female
                    </Button>

                  </ModalFooter>
                </ModalContent>
  </Modal>
  </Box>
  )
}


export default Rat