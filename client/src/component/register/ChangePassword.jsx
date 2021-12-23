import React, { useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap'
import axios from 'axios'
import {useHistory} from "react-router";

const ChangePassword = (props) => {
  const history = useHistory()
  const { userId } = props
  const [isPrevPasswordInvalid, setIsPrevPasswordInvalid] = useState(false)
  const [isNewPasswordInvalid, setIsNewPasswordInvalid] = useState(false)

  const submitFormChangePassword = (event) => {
    event.preventDefault()
    const data = event.target.elements

    // 폼 입력여부 확인
    let emptyCount = 0
    for (let i = 0; i < data.length - 1; i += 1) {
      if (data[i].value === '') {
        emptyCount = changeValid(data[i].id, true, emptyCount)
      } else changeValid(data[i].id, false)
    }
    if (emptyCount > 0) {
      console.log('빈값 존재')
      return
    }

    // 패스워드 일치여부 확인
    axios
    .post('/api/user?type=pwdCheck', {
      user_email: userId,
      user_password: data.prev_password.value
    })
    .then((response) => {
      const confirm = response.data.value
      console.log(confirm)
      // 패스워드 일치하면 변경요청하기
      if (confirm === 'Y') {
        axios.post('/api/user?type=pwd', {
          user_email: userId,
          user_password: data.new_password.value
        })
        .then((res) => {
          alert('비밀번호가 변경되었습니다.')
          history.replace('/mypage')
        })
        .catch((e) => (console.log(e)))
      } else {
        alert('비밀번호가 옳지 않습니다.')
        setIsPrevPasswordInvalid(true)}
    })
    .catch((error) => (console.log(error)))
  }

  const changeValid = (id, value, emptyCount) => {
    switch(id){
      case 'prev_password': {
        setIsPrevPasswordInvalid(value)
        emptyCount += 1
        break;
      }
      case 'new_password': {
        setIsNewPasswordInvalid(value)
        emptyCount += 1
        break;
      }
      default: return emptyCount
    } return emptyCount
  }
  return (
    <Container>
      <h2>비밀번호 변경하기</h2>
      <Form onSubmit={submitFormChangePassword}>
      <FormGroup>
        <Label htmlFor="prev_password">기존 비밀번호</Label>
        <Input id="prev_password" placeholder="기존 비밀번호를 입력해주세요." invalid={isPrevPasswordInvalid}/>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="new_password">새로운 비밀번호</Label>
        <Input id="new_password" placeholder="새로운 비밀번호를 입력해주세요." invalid={isNewPasswordInvalid}/>
      </FormGroup>
      <Button type="submit"> 변경하기 </Button>
      </Form>
    </Container>
  );
};

export default ChangePassword;
