import React, { useState } from "react";
import { Container, Form, Input, Label, Button, FormGroup } from 'reactstrap'

const Login = (props) => {
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
            아이디
          </Label>
          <Input id="userPassword" placeholder="비밀번호를 입력하세요" invalid={isLoginPasswordInvalid}/>
          </FormGroup>
          <Button> 확인 </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
