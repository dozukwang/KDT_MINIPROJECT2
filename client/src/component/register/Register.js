import React, { useState } from "react";
import { Container, Form, Input, Label, Button, FormGroup, InputGroupText, InputGroup, Col } from 'reactstrap'


const Register = (props) => {
  // 제출내용 유효확인
  const [ isSigninPasswordInvalid, setIsSigninPasswordInvalid ] = useState(false)
  const [ isSigninEmailInvalid, setIsSigninEmailInvalid ] = useState(false)
  const [ isSigninEmail2Invalid, setIsSigninEmail2Invalid ] = useState(false)
  const [ isSigninNameInvalid, setIsSigninNameInvalid ] = useState(false)
  const [ isSigninPhoneInvalid, setIsSigninPhoneInvalid ] = useState(false)
  // 이메일 입력확인
  const [ isUserId, setIsUserId ] = useState("")
  const [ isUserId2, setIsUserId2 ] = useState("")

  const submitFormSignin = (event) => {
    event.preventDefault()
    console.log('회원가입 시도')
    const data = event.target.elements

    // 필수값 입력확인
    let emptyCount = 0
    for (let i = 0; i < data.length; i += 1 ){
      if(data[i].tagName === 'INPUT'){
        const InputValue = data[i].value
        if (InputValue === "") { //입려값이 비어있으면
          console.log(data[i].id, '비어있음')
          emptyCount = changeValid(data[i].id, true, emptyCount)
        } else changeValid(data[i].id, false)
      }
    }
    if (emptyCount > 0) {
      console.log('필수값 비어있음', emptyCount)
    } else (console.log('필수값 다있음', emptyCount))

    // 비밀번호 유효형식 확인
    
  }

  const changeValid = (id, value, emptyCount) => {
    switch(id) {
      case 'signin-userId':
        setIsSigninEmailInvalid(value)
        emptyCount += 1
        break;
      case 'signin-userId2':
        setIsSigninEmail2Invalid(value)
        emptyCount += 1
        break;
      case 'signin-userPassword':
        setIsSigninPasswordInvalid(value)
        emptyCount += 1
        break;
      case 'signin-userName':
        setIsSigninNameInvalid(value)
        emptyCount += 1
        break;
      default:
        return emptyCount
    } return emptyCount
  }

  const changeEmailValue = (event) => {
      setIsUserId2(event.target.value)
  }


  return (
    <Container >
      <h2>회원가입</h2>
      <Form onSubmit={submitFormSignin}>
        <FormGroup row>
          <Label md={2} htmlFor="signin-userId">
              아이디 (이메일)
          </Label>
          <Col md={3}>
            <Input id="signin-userId" type="text" placeholder="이메일" invalid={isSigninEmailInvalid}/>
          </Col>
          <Col md={3}>
          <InputGroup>
              <InputGroupText>
                @
              </InputGroupText>
              <Input id="signin-userId2" type="text" placeholder="직접 입력" defaultValue={isUserId2? isUserId2 : undefined} invalid={isSigninEmail2Invalid} />
            </InputGroup>
          </Col>
          <Col md={2}>
            <Input name="email" type="select" onChange={changeEmailValue}>
              <option value="naver.com"> naver.com </option>
              <option value="google.com"> google.com </option>
              <option value="hanmail.net"> hanmail.net </option>
              <option value="daum.net"> daum.net </option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2} htmlFor="signin-userPassword">
            비밀번호
          </Label>
          <Col md={3}>
            <Input id="signin-userPassword" type="password" placeholder="비밀번호를 입력하세요" invalid={isSigninPasswordInvalid}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2} htmlFor="signin-userName">
            성명
          </Label>
          <Col md={3}>
            <Input id="signin-userName" type="text" placeholder="이름을 입력하세요" invalid={isSigninNameInvalid}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2} htmlFor="signin-userPhone">
            전화번호
          </Label>
          <Col md={1}>
            <Input name="phone" id="signin-userPhone" type="select" invalid={isSigninPhoneInvalid}>
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="019">019</option>
              <option value="02">02</option>
              <option value="031">031</option>
              <option value="없음">없음</option>
            </Input>
          </Col>
          
          <Col md={2}>
            <Input id="signin-userPhone2" type="text" invalid={isSigninPhoneInvalid}/>
          </Col>
          <Col md={2}>
            <Input id="signin-userPhone3" type="text" invalid={isSigninPhoneInvalid}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2} htmlFor="signin-userMajor">
            전공
          </Label>
          <Col md={3}>
            <Input id="signin-userMajor" type="text" placeholder="전공을 입력하세요"/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2} htmlFor="signin-userJob">
            직업
          </Label>
          <Col md={3}>
            <Input id="signin-userJob" name="job" type="select" placeholder="직업을 입력하세요">
              <option value="직장인"> 직장인 </option>
              <option value="자영업자"> 자영업자 </option>
              <option value="학생"> 학생 </option>
              <option value="주부"> 주부 </option>
              <option value="기타"> 기타 </option>
            </Input>
          </Col>
        </FormGroup>
        <Button type="submit"> 가입하기 </Button>
      </Form>
    </Container>
  );
};

export default Register;
