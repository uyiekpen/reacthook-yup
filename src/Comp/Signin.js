import React, { useState } from 'react'
import styled from "styled-components"
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import { app } from '../base'


const Registration = () => {
   


    const Schema = yup.object().shape({
        username: yup.string().required("Enter your name"),
        email: yup.string().email().required("Enter your email"),
        password: yup.string().required("Enter your password"),
        confirm: yup.string().oneOf([yup.ref("password"),null])



    })

    const {
        register,
        handleSubmit,
        formState:{errors},
        reset,
    }= useForm({
        resolver : yupResolver(Schema)
    })
    
    
    const Signin = handleSubmit (async (val)=>{
        const {username,email,password}= val


        const saveUser = await app.auth().createUserWithEmailAndPassword(email, password)
  
      if (saveUser) {
        await app.firestore().collection("users").doc(saveUser.user.uid).set({
          username,
          email,
          createdBy: saveUser.user.uid,
        });
      }
        reset()
    })


    const SiginGoogle = async () =>{
        const provider = new firebase.auth.GoogleAuthProvider()
        const saveUser = await app.auth().signInWithPopup(provider)
        if (saveUser){
            await app.firestore().collection("user").doc(saveUser.user.uid).set({
                avatar:saveUser.user.photoURL,
                username:saveUser.user.displayName,
                email:saveUser.user.email,
                createdBy: saveUser.user.uid,
            })
        }
    }

       
     

    

    return (
        <Container >
            <Wrapper>
               
                <Card>
                    <Form onSubmit={Signin}>
                        <Label>{errors.username?.message}</Label>
                        <Input placeholder="username"
                            {...register("username")}
                        />

                        <Label>{errors.email?.message}</Label>
                        <Input placeholder="Email"
                            {...register("email")}

                        />

                        <Label>{errors.password?.message}</Label>
                        <Input placeholder="Password"
                            {...register("password")}

                        />


                        <SubmitButton type="submit">Submit</SubmitButton>

                        <SubmitButton2 onClick={SiginGoogle}>Sign up with Google</SubmitButton2>

                        <Text>
                            <Account>Don't have an account,</Account>
                            <Sign to ="/register"> Register</Sign>
                        </Text>

                    </Form>

                </Card>
            </Wrapper>
            
        </Container>
    )
}

export default Registration

const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
justify-content: center;
font-family: poppins;
align-items: center;

`
const Wrapper = styled.div`
margin-top: 20px;
height: 500px;
width: 400px;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
background-color: whitesmoke;
`


const Card = styled.div`
height: 400px;
width: 400px;
display: flex;
justify-content: center;
align-items: center;

`

const Form = styled.form`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

const Label = styled.div`
display: flex;
width: 500px;
margin-left: 140px;
color: red;
`

const Input = styled.input`
display: flex;
justify-content: center;
height: 50px;
width: 350px;
background-color: white;
margin-top: 10px;
`
const SubmitButton = styled.button`
height: 40px;
width: 100px;
margin-top: 10px;
border: 3px;
background-color: turquoise;
color: white;
border-radius: 2px;
display: flex;
justify-content: center;
align-items: center;
`

const SubmitButton2 = styled.button`
height: 40px;
width: 150px;
margin-top: 10px;
border: 3px;
background-color: red;
color: white;
border-radius: 2px;
display: flex;
justify-content: center;
align-items: center;
`

const Text = styled.div`
width: 500px;
display: flex;
flex-direction: row;
justify-content: center;
margin-top: 20px;
`

const Account = styled.div`

`
const Sign = styled(Link)`
text-decoration: none;

`