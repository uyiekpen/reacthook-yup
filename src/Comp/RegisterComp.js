import React,{useState} from 'react'
import styled from 'styled-components'
import img from "./Image/avatar.png"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form'
import { app } from '../base'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress';


const RegisterComp = () => {
    const [image , SetImage] = useState(img)
    const [avatar, setAvatar]=useState("")
    const [percent , Setpercent ] = useState(0)



    const Schema = yup.object().shape({
        username: yup.string().required("enter your name"),
        email : yup.string().email().required("Enter your Email"),
        password : yup.string().required("enter your password"),
        confirm :yup.string().oneOf([yup.ref("password"),null])
    })

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,

    } =useForm({
        resolver : yupResolver(Schema)
    })
    const UploadImage = async (e) =>{
        const file = e.target.files[0]
        const save = URL.createObjectURL(file)
        SetImage(save)
        
        const fileRef =await app.storage().ref()
        const storageRef  = fileRef.child("userImage/"+file.name).put(file)
        storageRef.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot =>{
            const counter = (snapshot.bytesTransferred/snapshot.totalBytes)*100
            Setpercent(counter)
            console.log(counter)

        },(err)=> console.log(err),
        ()=>{
            storageRef.snapshot.ref.getDownloadURL().then(url =>{
                setAvatar(url)
                console.log(url)
            })
        }
        )
    }

      const Register = handleSubmit (async (val)=>{
        const {username,email,password}= val


        const saveUser = await app.auth().createUserWithEmailAndPassword(email, password)
  
      if (saveUser) {
        await app.firestore().collection("users").doc(saveUser.user.uid).set({
          avatar,
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
        <Container>
        <Wrapper>
                <ImageHolder>
                <Image src={image}/>
                    {
                        percent > 0 && percent < 99.9999999 ? (
                            <div> style={{width:"500px"}}<LinearProgress variant="determinate" value={(Math.floor(percent))} />
                            </div>

                        ):null
                    }
                   
                    <ImageButton htmlFor='pix'>Upload</ImageButton>
                    <ImgInput id="pix" type="file" onChange={UploadImage}/>
                </ImageHolder>
                <Card>
                    <Form onSubmit={Register}>
                        <Label>{errors.username?.message}</Label>
                        <Input
                        placeholder='name'
                            {...register("username")} 
                        />

                        <Label>{errors.email?.message}</Label>
                        <Input 
                                placeholder='Email'

                                 {...register("email")}
                        />

                        <Label>{errors.password?.message}</Label>
                        <Input 
                                 placeholder='enter password'

                                 {...register("password")}

                        />

                        <Label>{errors.confirm?.message}</Label>
                        <Input 
                                placeholder='Confirm password'

                                 {...register(" confirm")}

                        />

                        <SubmitButton type="submit">Submit</SubmitButton>

                        <SubmitButton2 onClick={SiginGoogle} >Sign in with Google</SubmitButton2>

                        <Text>
                            <Account>Already have an account,</Account>
                            <Sign to="/Signin">Sign in</Sign>
                        </Text>

                    </Form>

                </Card>
            </Wrapper>
            
        </Container>
    )
}

export default RegisterComp



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
height: 100vh;
width: 400px;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
background-color: whitesmoke;
`

const ImageHolder = styled.div`
height: 300px;
width: 300px;
display: flex;
justify-content: center;
align-items: center;
flex-direction:column;
`

const Image = styled.img`
height: 150px;
width: 150px;
border-radius: 100%;
border: 2px solid black;
`

const ImageButton = styled.label`
height: 40px;
width: 100px;
display: flex;
justify-content: center;
align-items: center;
background-color: turquoise;
border-radius: 8px;
margin-top: 20px;
`
const ImgInput = styled.input`
display: none;
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
width: 150px;
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
text-decoration:none;
color: red;

`
