import axios from "axios";
import React, { useState } from "react";
import { Container, Form, Input, Label, Button, FormGroup, InputGroupText, InputGroup, Col } from 'reactstrap'

const Register = ({ history }) => {
  // 필수 입력값
  const [ userIds, setUserIds ] = useState({
    email1: '',
    eamil2: ''
  })
  const [ userPassword, setUserPassword ] = useState('')
  const [ userName, setUserName ] = useState('')
  const [ userMajor, setUserMajor ] = useState('')
  const [ userPhone, setUserPhone ] = useState({
    phone1: '010',
    phone2: '',
    phone3: ''
  })
  const [ userJob, setUserJob ] = useState('')

  // 필수값 입력여부 확인
  const [ isSigninEmailInvalid, setIsSigninEmailInvalid ] = useState(false)
  const [ isSigninEmail2Invalid, setIsSigninEmail2Invalid ] = useState(false)
  const [ isSigninPasswordInvalid, setIsSigninPasswordInvalid ] = useState(false)
  const [ isSigninNameInvalid, setIsSigninNameInvalid ] = useState(false)
  
  // 이메일 중복여부 확인
  const [ isDoubledCheck, setIsDoubledCheck ] = useState(false)

  // 폼 제출하기
  const submitFormSignin = (event) => {
    event.preventDefault()
    console.log('회원가입 시도')
    const data = event.target.elements
    
    //이메일 중복확인 진행여부 확인
    if (isDoubledCheck !== true) {
      setIsSigninEmailInvalid(true)
      setIsSigninEmail2Invalid(true)
      alert('이메일 중복확인을 진행해주세요.')
      return
    }

    // 필수값 입력여부확인
    let emptyCount = 0
    for (let i = 0; i < data.length; i += 1 ){
      if(data[i].tagName === 'INPUT'){
        const InputValue = data[i].value
        if (InputValue === "") { //입려값이 비어있으면
          console.log(data[i].id, '비어있음')
          emptyCount = changeValid(data[i].id, true, emptyCount)
        } else changeValid(data[i].id, false )
      }
    }
    if (emptyCount > 0) {
      alert('필수 입력내용을 모두 작성해주세요.')
      return
    } else (console.log('필수값 다있음', emptyCount))

    // 회원가입 진행
    axios
    .post('/api/user?type=signup', {
      user_email1: userIds.email1,
      user_email2: userIds.email2,
      user_password: userPassword,
      user_major: userMajor,
      user_phone: `${userPhone.phone1}-${userPhone.phone2}-${userPhone.phone3}`,
      user_name: userName,
      user_org: userJob
    })
    .then((response) => {
      console.log(response)
      alert('회원가입이 완료되었습니다.')
      history.replace('/')
    })
    .catch((error) => {console.log(error)})
  }

  // 필수값 입력확인 함수
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

  // 이메일 올바른입력 확인
  const emailCheck = () => {
    const firstPlace = userIds.email1
    const secondPlace = userIds.email2
    const fullEmail = `${firstPlace}@${secondPlace}`
    console.log('1', firstPlace, '2', secondPlace)
    // 이메일 빈값 확인(첫 번째 칸)
    if (firstPlace.length < 1 && secondPlace === undefined) {
      setIsSigninEmailInvalid(true)
      setIsSigninEmail2Invalid(true)
      return
    } else if (firstPlace.length < 1 || firstPlace.length > 30) {
      setIsSigninEmailInvalid(true)
      setIsSigninEmail2Invalid(false)
      return
    } else {
      setIsSigninEmailInvalid(false)
    }
    // 이메일 유효성 확인, 오류 발생 시 이메일 주소 오류 설정(두 번째 칸)
    var emailRef = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (emailRef.test(fullEmail)) { 
      console.log('이메일 통과')
      setIsSigninEmail2Invalid(false)
    } else { 
      console.log('이메일 실패')
      setIsSigninEmail2Invalid(true)
      return
    }
    //이메일 중복 검사
    axios
    .post('/api/user?type=dplicheck', {
      user_email1: firstPlace,
      user_email2: secondPlace
    })
    .then((response)=>{
      const data = response.data.json[0]
      if (data.dupliEmailCount !== 0){
        setIsDoubledCheck(false)
        setIsSigninEmailInvalid(true)
      } else (setIsDoubledCheck(true))
    })
    .catch((error)=>{ console.log(error) })
  }

  // Value onChange
  const changeEmail1InputValue = (event) => {
    setUserIds({
      ...userIds,
      'email1': event.target.value,
    })
    setIsDoubledCheck(false)
  }

  const changeEmail2InputValue = (event) => {
    setUserIds({
      ...userIds,
      'email2': event.target.value
    })
    setIsDoubledCheck(false)
  }

  const changePhoneValue = (event) => {
    const changedTarget = event.target.id
    switch(changedTarget) {
      case 'signin-userPhone':
        return setUserPhone({
          ...userPhone,
          phone1: event.target.value,
        })
      case 'signin-userPhone2':
        return setUserPhone({
          ...userPhone,
          phone2: event.target.value,
        })
      case 'signin-userPhone3':
        return setUserPhone({
          ...userPhone,
          phone3: event.target.value,
        })
      default: return
    }
  }


  return (
    <Container >
      <h2>회원가입</h2>
      <Form onSubmit={submitFormSignin} >
        <FormGroup row>
          <Label md={2} htmlFor="signin-userId">
              이메일 (필수)
          </Label>
          <Col md={3}>
            <Input id="signin-userId" type="text" placeholder="이메일"  onChange={changeEmail1InputValue} invalid={isSigninEmailInvalid} valid={isDoubledCheck} />
          </Col>
          <Col md={3}>
          <InputGroup>
              <InputGroupText>
                @
              </InputGroupText>
              <Input id="signin-userId2" type="text" placeholder="직접 입력" defaultValue={userIds.email2} onChange={changeEmail2InputValue} invalid={isSigninEmail2Invalid} valid ={isDoubledCheck} />
            </InputGroup>
          </Col>
          <Col md={2}>
            <Input name="email" type="select" defaultValue="" onChange={changeEmail2InputValue}>
              <option value="" disabled> 이메일 선택 </option>
              <option value="naver.com"> naver.com </option>
              <option value="gmail.com"> gmail.com </option>
              <option value="hanmail.net"> hanmail.net </option>
              <option value="daum.net"> daum.net </option>
            </Input>
          </Col>
          <Col md={2}>
            <Button type="button" onClick={emailCheck}> 중복확인 </Button>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2} htmlFor="signin-userPassword">
            비밀번호 (필수)
          </Label>
          <Col md={3}>
            <Input id="signin-userPassword" type="password" onChange={(event)=>{setUserPassword(event.target.value)}} maxLength={10} placeholder="비밀번호를 입력하세요" invalid={isSigninPasswordInvalid}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2} htmlFor="signin-userName">
            성명 (필수)
          </Label>
          <Col md={3}>
            <Input id="signin-userName" type="text" onChange={(event)=>{setUserName(event.target.value)}} placeholder="이름을 입력하세요" invalid={isSigninNameInvalid}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2} htmlFor="signin-userPhone">
            전화번호
          </Label>
          <Col md={1}>
            <Input name="phone" id="signin-userPhone" type="select" onChange={changePhoneValue} >
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="019">019</option>
              <option value="02">02</option>
              <option value="031">031</option>
              <option value="없음">없음</option>
            </Input>
          </Col>
          <Col md={2}>
            <Input id="signin-userPhone2" type="text" onChange={changePhoneValue} />
          </Col>
          <Col md={2}>
            <Input id="signin-userPhone3" type="text" onChange={changePhoneValue} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2} htmlFor="signin-userMajor">
            전공
          </Label>
          <Col md={3}>
            <Input id="signin-userMajor" type="text" onChange={(event)=>{setUserMajor(event.target.value)}} placeholder="전공을 입력하세요"/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2} htmlFor="signin-userJob">
            직업
          </Label>
          <Col md={3}>
            <Input id="signin-userJob" name="job" defaultValue="" onChange={(event)=>{setUserJob(event.target.value)}} type="select" placeholder="직업을 입력하세요">
              <option value="" disabled> 직업 선택 </option>
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
