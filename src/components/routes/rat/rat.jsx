import { useState } from "react";
import moment from "moment/moment";
import {BsGenderFemale,BsGenderMale} from 'react-icons/bs'
import { Avatar} from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tfoot
} from '@chakra-ui/react'
import {
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react'
import React from 'react';


const Rat = ()=>{
  const curDate =  moment().format('YYYY-MM-DD')
  const color = ['green','red','blue']
  const rats = [
    {
      id:1,
      name:'Taro',
      birthday:'2022-09-22',
      gender:'0',
      position:[1,'a'],
      notes:['operation','no feeding'],
      isDead:null
    },
    {
      id:2,
      name:'Jiro',
      birthday:'2022-09-10',
      gender:'1',
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

  return (
    <div>
      <h1>Rat Page</h1>
      
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
        rats.map((rat)=>{
          if(rat.isDead!==null){
            return null
          }
          return (
            <Tr key={rat.id}>
              <Td><Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' /></Td>
              <Td>{-1*moment(rat.birthday).diff(curDate,'days')}</Td>
              <Td>{rat.gender=='0'? (<BsGenderFemale />): <BsGenderMale/>}
              
              </Td>
              <Td>
                {rat.notes.map((note,index)=>{
                  return (
                    <Tag key={index} borderRadius='full' variant='solid' colorScheme={color[index]}>
                    <TagLabel>{note}</TagLabel>
                    <TagCloseButton />
                  </Tag>
                  )
                })}
              </Td>
              <Td>
              <Button colorScheme='red' size='xs'>
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
          <Button colorScheme='blue' size='xs'>
                ADD RAT
          </Button>
        </Th>
  
      </Tr>
    </Tfoot>
  </Table>



    </div>
  )
}


export default Rat