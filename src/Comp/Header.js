import React, { createContext, useState } from 'react'
import styled from 'styled-components'
import { Link as LinkR } from 'react-router-dom'
import { app } from '../base'

const Header = () => {
    const {currentUser} = createContext()

    const [auth, setAuth] = useState(false)

    const Toggle = () =>{
        setAuth(!auth)
    }
    return (
        <Container>
            <Wrapper>
                <Logo/>
                <Text>Welcome back Osazie</Text>
               {
                   currentUser ? (
                    <Nav onClick={()=>{
                        app.auth().signOut()
                    }}>
                    <Icon/>

                    <ButtonHolder>Logout</ButtonHolder>
                </Nav>

                   ):(
                    <Nav1 to="/Register" >
                     <ButtonHolder>Register</ButtonHolder>

                 </Nav1>
                   )
                  
               }
                
            </Wrapper>

        </Container>
    )
}

export default Header

const Container = styled.div`
display: flex;
height: 70px;
width: 100vw;
background-color: black;
color: white;
justify-content: center;
`

const Wrapper = styled.div`
height: 70px;
width: 90vw;
display: flex;
justify-content: space-between;
align-items: center;



`
const Logo = styled.div`
height: 40px;
width: 40px;
background-color: turquoise;

`
const Text = styled.div``
const Nav = styled.div`
height: 70px;
width: 150px;
display: flex;
align-items: center;
justify-content: space-between;

`
const ButtonHolder = styled.div`
height: 40px;
width: 100px;
display: flex;
justify-content: center;
align-items: center;
background-color: turquoise;
border-radius: 8px;
text-decoration: none;
color: black;
`
const Nav1 = styled(LinkR)`
text-decoration: none;
`
const Icon = styled.div`
height: 40px;
width: 40px;
border-radius: 100%;
background-color: turquoise
`

