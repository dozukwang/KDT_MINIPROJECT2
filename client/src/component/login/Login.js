import React, { useState } from "react";
import axios from 'axios'
import { Container, Form, Input, Label, Button, FormGroup } from 'reactstrap'
// import Swal from 'sweetalert2'
import cookies from 'react-cookies'
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory()
  const [ isLoginIdInvalid, setIsLoginIdInvalid ] = useState(false)
  const [ isLoginPasswordInvalid, setIsLoginPasswordInvalid ] = useState(false)

  const submitFormLogin = (event) => {
    event.preventDefault()
    console.log('로그인시도')
    const data = event.target.elements
    for (let i = 0; i < data.length - 1; i += 1) {
      if (data[i].value === "") {
        changeValid(data[i].id, true)
      } else {
        changeValid(data[i].id, false)
      }
    }
    // 로그인 시도
    axios.post('/api/user?type=login', {
      user_email: data.userId.value,
      user_password: data.userPassword.value
    })
    .then((response)=>{
      console.log(response.data)
      if (response.data !== undefined && response.data !== '') {
        var user_email = response.data[0].user_email
        var user_name = response.data[0].user_name
        var user_pwd = response.data[0].user_password
  
        // 로그인 성공
        if (user_email) {
          alert('로그인 되었습니다.')
          // 로그인 후에 세션 유효기간 설정
          const expires = new Date(); 
          expires.setMinutes(expires.getMinutes() + 60)
          axios.post('/api/user?type=webtoken', { //JWT 토큰 발생하기
            user_email,
            user_name,
          })
          .then((response)=>{
            console.log(response.data)
            console.log('토큰아이디', response.data.token_id)
            console.log('토큰이름', response.data.token_name)
            
            // 쿠키에 토큰 저장하기
            // 1. 토큰 아이디
            cookies.save('token_id', response.data.token_id, {
              path:'/',
              expires
            })
            // 2. 토큰 이름
            cookies.save('token_name', response.data.token_name, {
              path:'/',
              expires
            })
            // 3. 비밀번호
            cookies.save('user_password', user_pwd, {
              path: '/',
              expires
            })
            history.push('/board')
          })
          .catch((error)=>{console.log('JWT발생실패', error)})
        }
      } else {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.')
        return
      }
    })
    .catch((error)=>(console.log(error)))
  }

  const changeValid = (id, value) => {
    switch(id) {
      case 'userId':
          return (setIsLoginIdInvalid(value))
      case 'userPassword':
        return (setIsLoginPasswordInvalid(value))
      default:
        return null
    }
  }

  const fncLogin = () => {

  }

  // const sweetalert = (title, showConfirmButton, icon) => {
  //   Swal.fire({
  //     position: "bottom-end",
  //     icon,
  //     title,
  //     showConfirmButton,
  //     timer: 1000,
  //   })
  // }

  const loginValidCheck = () => {
    console.log('입력값이 존재함')
  }

  return (
    <div>
      <Container
      className="border border-1 rounded rounded-3"
      >
        <h2>로그인</h2>
        <Form onSubmit={submitFormLogin}>
        <FormGroup>
          <Label htmlFor="userId">
            이메일
          </Label>
          <Input id="userId" placeholder="아이디를 입력하세요" invalid={isLoginIdInvalid}/>
          </FormGroup>
          <FormGroup>
          <Label htmlFor="userPassword">
            비밀번호
          </Label>
          <Input id="userPassword" placeholder="비밀번호를 입력하세요" invalid={isLoginPasswordInvalid}/>
          </FormGroup>
          <Button> 로그인 </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
