import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Button, Container, Label, Col, Row, Input, InputGroup, InputGroupText, Form, FormGroup } from 'reactstrap'
import {useHistory} from "react-router";

const MyPage = ( props ) => {
  const history = useHistory()
  const { userId } = props
  const [ userInfo, setUserInfo ] = useState({})
  const [ userInfoEmail, setUserInfoEmail ] = useState({
    email1: '',
    email2: ''
  })
  const [ userInfoPhone, setUserInfoPhone ] = useState({
    phone1: '',
    phone2: '',
    phone3: ''
  })

  // 필수값 입력정보 확인
  const [ isUserInfoNameInvalid, setIsUserInfoNameInvalid ] = useState(false)

  // 유저정보 불러오기 및 출력
  useEffect(() => {
    axios
    .post('/api/user?type=selectUser', {
      user_email: userId
    })
    .then((response) => {
      const data = response.data.json[0]
      setUserInfo(data)
      const splitEmail = data.user_email.split('@') // 이메일 나누기
      setUserInfoEmail({
        email1: splitEmail[0],
        email2: splitEmail[1]
      })
      const splitPhone = data.user_phone.split('-') // 전화번호 나누기
      setUserInfoPhone({
        phone1: splitPhone[0],
        phone2: splitPhone[1],
        phone3: splitPhone[2]
      })
    })
    .catch((error) => (console.log('오류남', error)))
  },[])

  // 폼 제출
  const submitFormEditInfo = (event) => {
    event.preventDefault()
    console.log('회원가입 시도')
    const data = event.target.elements

    // 필수값 입력 확인
    if (data.user_name.value === '') {
      setIsUserInfoNameInvalid(true)
      return
    }
    else if (data.user_name.value !== '') {
      setIsUserInfoNameInvalid(false)
    }
    else if (isUserInfoNameInvalid === true) {
      return
    }

    // 회원정보 수정 요청
    axios
    .post('/api/user?type=updateUser', {
      user_email: userInfo.user_email,
      user_name: data.user_name.value,
      user_major: data.user_major.value,
      user_phone: `${userInfoPhone.phone1}-${data.user_phone2.value}-${data.user_phone3.value}`,
      user_org: data.user_job.value,
      user_confirm: 'Y'
    })
    .then((response) => {
      console.log(response)
      alert('회원정보 수정이 완료되었습니다.')
      history.replace('/')
    })
    .catch((error) => {console.log(error)})
  }

  // Value onChange 함수
  const changeUserInfoPhoneValue = (event) => {
    console.log(event.target.value)
    setUserInfoPhone({
      ...userInfoPhone,
      phone1: event.target.value
    })
  }

  return (
      <Container>
        <h2>내 정보</h2>
        <Form onSubmit={submitFormEditInfo}>
          <Row>
            <Label md={2} htmlFor="user_signin_date">
              가입일자
            </Label>
            <Col md={3}>
              <div id="user_signin_date"> {dayjs(userInfo.reg_date).format('YYYY년 MM월 DD일')} </div>
            </Col>
            <Label md={2} htmlFor="user_updated">
              회원정보 변경일자
            </Label>
            <Col md={3}>
              <div id="user_updated"> {userInfo.update_date? dayjs(userInfo.update_date).format('YYYY년 MM월 DD일') : '변경내역 없음'} </div>
            </Col>
          </Row>
          <FormGroup row>
            <Label md={2} htmlFor="user_id">
                이메일 (필수)
            </Label>
            <Col md={3}>
              <Input id="user_id" type="text" defaultValue={userInfoEmail.email1} disabled/>
            </Col>
            <Col md={3}>
            <InputGroup>
                <InputGroupText>
                  @
                </InputGroupText>
                <Input id="user_id2" type="text" defaultValue={userInfoEmail.email2} disabled />
              </InputGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label md={2} htmlFor="user_password">
              비밀번호 (필수)
            </Label>
            <Col md={3}>
              <Button type="button" onClick={()=>{history.push('/mypage/changepassword')}}>변경하기</Button>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label md={2} htmlFor="user_name">
              성명 (필수)
            </Label>
            <Col md={3}>
              <Input id="user_name"defaultValue={userInfo.user_name} invalid={isUserInfoNameInvalid}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label md={2} htmlFor="user_phone">
              전화번호
            </Label>
            <Col md={1}>
            <Input id="user_phone" type="select" defaultValue={userInfoPhone.phone1} onChange={changeUserInfoPhoneValue} >
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="019">019</option>
              <option value="02">02</option>
              <option value="031">031</option>
              <option value="없음">없음</option>
            </Input>
            </Col>
            <Col md={2}>
              <Input id="user_phone2" defaultValue={userInfoPhone.phone2} />
            </Col>
            <Col md={2}>
              <Input id="user_phone3" defaultValue={userInfoPhone.phone3} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label md={2} htmlFor="user_major">
              전공
            </Label>
            <Col md={3}>
              <Input id="user_major" defaultValue={userInfo.user_major} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label md={2} htmlFor="user_job">
              직업
            </Label>
            <Col md={3}>
              <Input id="user_job" defaultValue={userInfo.user_org} />
          </Col>
          </FormGroup>
          <Button type="submit"> 수정하기 </Button>
        </Form>
      </Container>
  );
};

export default MyPage;
