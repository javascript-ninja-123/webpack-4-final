import React, {useState} from 'react';
import { Button, Form } from 'semantic-ui-react'
import styled from 'styled-components'
import Firebase from '../utils/firebase'
import {Link} from 'react-router-dom';

const StyledForm = styled(Form)`
    width:60vw;
    margin:0 auto;
`,
PageContainer = styled.div`
    min-height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
`



const Login = () => {

    const  [email, setEmail] = useState('')
    const [password, setPassword] = useState("")
    const onChange = ({target}) => {
        if(target.name === "email"){
            setEmail(target.value)
        }
        else{
            setPassword(target.value)
        }
    }
    const onClick = async e => {
        try{
            e.preventDefault();
            if(email.trim() === "" || password.trim() === ""){

            }
            await Firebase.signUp({email,password})
            console.log("siged up")
        }
        catch(err){
            console.log(err)
        }
    }

    return (
    <PageContainer>
        <StyledForm>
        <Form.Field>
        <label>Email address</label>
        <input placeholder='email'  value={email} onChange={onChange} name="email" type="text"/>
        </Form.Field>
        <Form.Field>
        <label>Password</label>
        <input placeholder='password' value={password} onChange={onChange} name="password" type="password"/>
        </Form.Field>
        <Button type='submit' onClick={onClick}>Submit</Button>
        <Link to="/">Home</Link>
    </StyledForm>
    </PageContainer>
    )
}



export default Login