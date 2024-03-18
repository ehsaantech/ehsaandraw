import React, { useEffect, useState } from 'react'
import { database } from '../../firebaseConfig'
import { addDoc ,collection, getDocs ,doc, deleteDoc, updateDoc } from 'firebase/firestore';

const Modal = () => {

    const [userName, setUserName] = useState("");
    const [scenes, setScenes] = useState("");
    const [values, setValues] = useState([]);
    const [id, setId] = useState("");
    const [show, setShow] = useState(false);



    const value = collection(database,'demo')
    const handleCreateBoard = async () => {
            await addDoc(value,{userName1:userName,scenes1:scenes})
            setUserName('')
            setScenes('')
    
    }
    useEffect(()=>{
        const getData = async () =>{
           const dbValue = await getDocs(value)
           setValues(dbValue.docs.map(doc => ({...doc.data(),id:doc.id})));
        }
        getData()
    })
    const handleDelete = async (id) => {
        const deleteValue = doc(database,'demo',id)
        await deleteDoc(deleteValue)
    }

    const handleEdit = async (id,userName,scenes) => {
        setUserName(userName)
        setScenes(scenes)
        setId(id)
        setShow(true)
       
    }
    const handleUpdate = async () => {
        const updateValue = doc(database,'demo',id)
        await updateDoc(updateValue,{userName1:userName,scenes1:scenes})
        setShow(false)
        setUserName('')
        setScenes('')
    }

  return (
    <div>
        <input value={userName} onChange={(e)=>setUserName(e.target.value)}/>
        <input value={scenes} onChange={(e)=>setScenes(e.target.value)}/>
        {!show ?<button onClick={handleCreateBoard}>Create</button>:
        <button onClick={handleUpdate}>Update</button>
    }
      {
        values.map((item,index)=>{
          return (
          <div key={index}>
            
            {item.userName1}
            {item.scenes1}
            <button onClick={()=>handleDelete(item.id)}>Delete</button>
            <button onClick={()=>handleEdit(item.id,item.userName1,item.scenes1)}>Edit</button>

            </div>
            )
        })
      }
    </div>
  )
}

export default Modal
