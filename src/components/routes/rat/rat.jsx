import { useState,useEffect } from "react";
import moment from "moment/moment";
import {BsGenderFemale,BsGenderMale} from 'react-icons/bs'
import {FaBaby} from 'react-icons/fa'
import { Avatar} from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { nanoid } from "nanoid";
import { Text } from "@chakra-ui/react";


import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tfoot
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


const Rat = ()=>{
  const curDate =  moment().format('YYYY-MM-DD')
  const color = ['green','red','blue']
  const init_rats = [
    {
      id:1,
      name:'Taro',
      birthday:'2022-09-22',
      gender:'1',
      position:[1,'a'],
      notes:['operation','no feeding'],
      isDead:null
    },
    {
      id:2,
      name:'Jiro',
      birthday:'2022-09-10',
      gender:'2',
      position:[2,'c'],
      notes:['operation'],
      isDead:null
    },
    {
      id:3,
      name:'Sanro',
      birthday:'2022-09-01',
      gender:'0',
      position:[2,'b'],
      notes:[],
      isDead:null
    },
    {
      id:4,
      name:'Yonro',
      birthday:'2022-08-22',
      gender:'0',
      position:[2,'b'],
      notes:['operation'],
      isDead:null
    }
  ]

  const [rats,setRats] = useState(init_rats)
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



  const [curMale,setCurMale] = useState(0)
  const [curFemale,setCurFemale] = useState(0)
  const [curBaby,setCurBaby] = useState(0)

  useEffect(()=>{
    const initMale = rats.filter(rat=>rat.gender==='1' && rat.isDead===null).length

    const initFemale = rats.filter(rat=>rat.gender==='0' && rat.isDead===null).length

    const initBaby = rats.filter(rat=>rat.gender==='2' && rat.isDead===null).length    

    setCurFemale(initFemale)
    setCurMale(initMale)
    setCurBaby(initBaby)
  },[])




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
  const handleDeathReport = (index)=>{
    const new_rats = [...rats]
    console.log('dead_rat ID: ',new_rats[index].id, 'dead date: ',curDate)
    new_rats[index].isDead = curDate
    if(rats[index].gender==='1') setCurMale(curMale-1)
    else setCurFemale(curFemale-1)
    setRats(new_rats)
  }
  const handleAdd = ()=>{
    console.log('Added')
    const newRat = {
      id: nanoid(),
      name:newName,
      birthday:newBirthday,
      gender:newGender,
      position:[2,'c'],
      notes:newTags,
      isDead:null
    }
    setRats([...rats,newRat])
    if(newRat.gender==='1') setCurMale(curMale+1)
    else if(newRat.gender==='0') setCurFemale(curFemale+1)
    else setCurBaby(curBaby+1)
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
  const handleDeleteTag = (id,index)=>{
    const newRats = rats.map((rat)=>{
      if(rat.id === id){
        return {...rat, notes: rat.notes.filter((_,i)=>i!==index)};
      }
      return rat
    })
    setRats(newRats)
  }
  const handleAddTag = (id)=>{
    const newRats = rats.map((rat)=>{
      if(rat.id===id){
        return {...rat,notes:[...rat.notes,'aaasdadaa']}
      }
      return rat
    })
    setRats(newRats)
  }


  return (
    <div>
      <h1>Rat Page</h1>
      <Heading>Current Total: {curMale+curFemale+curBaby}</Heading>
      <Heading>Current Male: {curMale}</Heading>
      <Heading>Current Female: {curFemale}</Heading>
      <Heading>Current Female: {curBaby}</Heading>
      
  <Table variant='striped' colorScheme='teal'>
    <Thead>
      <Tr>
        <Th>Rats</Th>
        <Th>Age</Th>
        <Th>Gender</Th>
        <Th>Tags</Th>
        <Th>Operation</Th>
      </Tr>
    </Thead>
    <Tbody>
      {
        rats.map((rat,index)=>{
          if(rat.isDead!==null){
            return null
          }
          return (
            <Tr key={rat.id}>
              <Td><Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' /></Td>
              <Td>{-1*moment(rat.birthday).diff(curDate,'days')}</Td>
              <Td>{rat.gender==='0'?<BsGenderFemale />:(rat.gender==='1'?<BsGenderMale/>:<FaBaby/>)}
              </Td>
              <Td>
              <Button onClick={onOpenTagModal}>{rat.id}</Button>
              <Modal isOpen={isOpenTagModal} onClose={onCloseTagModal}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Input New Tag Content</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                      <input type="text" placeholder="new tag" onChange={handleTagsChange}/>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onCloseTagModal}>
                      Cancel
                    </Button>
                    <Button variant='ghost' colorScheme='red' onClick={()=>{handleAddTag(rat.id)}}>Add</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

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
              <Button colorScheme='red' size='xs' onClick={()=>{handleDeathReport(index)}}>
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
              <input type="date" placeholder="birthday" onChange={handleDateChange}/>
              <input type="text" placeholder="name:" onChange={handleNameChange}/>
              <Select placeholder='Select gender' onChange={handleGenderChange}>
                <option value='1'>Male</option>
                <option value='0'>Female</option>
                <option value='2'>Baby</option>
              </Select>
              <input type="text" placeholder="tags" onChange={handleTagsChange}/>
            </form>
            <h2>{newName}</h2>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant='ghost' colorScheme='red' onClick={()=>{handleAdd()}}>Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>



  </div>
  )
}


export default Rat