import React, {useContext, useState,useEffect } from 'react'
import styled from "styled-components"
import { AuthContext } from './Global/AuthProvider'
import img from "./Image/avatar.png"
import { app } from '../base'

const HeaderComp = () => {
    const {currentUser} = useContext(AuthContext)
    const [auth, SetAuth]= useState(false)
    const [userData, SetUserData] = useState([])


    const Toggle = ()=>{
        SetAuth(!auth)
    }

   

    const readData = async () => {
        await app.firestore()
        .collection("users")
        .doc(currentUser?.uid)
        .get()
        .then((doc)=>{
            SetUserData(doc.data())
        })
    }

    useEffect(() => {
        readData()
        
    }, [])
    return (
        <Container>
            <Wrapper>
                <Logo/>
                <Text>Welcome back {userData?.username}
                </Text>
                {auth ? (
                <Nav1 >
                     <Avatar src={img}/>
                     <ButtonHolder2 onClick={()=>{
                         app.auth().signOut()
                     }}>Logout</ButtonHolder2>
                 </Nav1>
                   
                ):(
                    <Nav onClick={Toggle}>
                    <ButtonHolder>Register</ButtonHolder>

                    </Nav>
                )}
                
               
            </Wrapper>
        </Container>
    )
}

export default HeaderComp

const Container = styled.div`
height: 70px;
background-color: black;
width: 100vw;
color: white;
display: flex;
justify-content: center;
`
const Wrapper = styled.div`
height: 70px;
background-color: black;
width: 90vw;
display: flex;
justify-content:space-between ;
align-items: center;
`

const Logo = styled.div`
 height: 50px;
 width: 50px;
 background-color: turquoise;
`

const ButtonHolder = styled.div`

height: 40px;
width: 100px;
display: flex;
justify-content: center;
align-items: center;
background-color: turquoise;
border-radius: 8px;

`

const Nav =  styled.div``

const Text =  styled.div``


const Nav1=  styled.div`
height: 70px;
width: 150px;
display: flex;
align-items: center;
justify-content: space-between;
`

const Avatar =  styled.img`
height: 40px;
width: 40px;
border-radius: 100%;
background-color: turquoise;
object-fit: cover;
`

const ButtonHolder2 =  styled.div`
height: 40px;
width: 100px;
display: flex;
justify-content: center;
align-items: center;
background-color: turquoise;
border-radius: 8px;

`
