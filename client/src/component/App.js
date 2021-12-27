import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Header from "../route/Header";
import Footer from "../route/Footer";
import "bootstrap/dist/css/bootstrap.css";
import "../css/toy.css";

import Board from "../component/board/Board";
import Login from "../component/login/Login";
import Register from "../component/register/Register";
import Product from "../component/product/Product";
import Cart from "../component/cart/Cart";
import History from "../component/history/History";
import Naver from "./naver/Naver";
import { useEffect, useState } from "react";
import NewPost from "./board/NewPost";
import Post from "./board/Post";
import EditPost from "./board/EditPost";
import ChangePassword from "./register/ChangePassword";
import MyPage from "./register/MyPage";
import cookie from 'react-cookies'
import axios from "axios";

function App() {
  const [userId, setUserId] = useState(''); 
  
  const history = useHistory()
  const location = useLocation()

  useEffect(()=>{
    // 회원가입 페이지 외의 페이지에서는 쿠키 확인하기
    if('/register' !== location.pathname) {
      checkSession()
    }
  }, [location.pathname])

  // 쿠키에 저장된 토근 정보 가져오기
  const checkSession = () => {
    const tokenId = cookie.load('token_id')
    const tokenName = cookie.load('token_name')
    const tokenPassword = cookie.load('user_password')

    // 가져온 쿠키 정보가 유효한 내용인지 확인하기(서버에 요청)
    if ( tokenId && tokenName ) {
      axios.post('/api/user?type=sessionCheck', {
        token_id: tokenId,
        token_name: tokenName
      })
      .then((response)=>{
        setUserId(response.data.decrypt_id.user_email) // 유저 아이디 셋팅

        if ( tokenPassword ) { // 쿠키 패스워드 검증
          axios.post('/api/user?type=sessionSignin', {
            user_email: response.data.decrypt_id.user_email,
            user_password: tokenPassword
          })
          .then((response)=>{
            if ( !response.data.json[0].user_email ) { // 유저 정보가 존재하지 않으면
              // 로그인 상태 해제
              notLogin()
            }
          })
          .catch((error)=>{console.log(error)})
        } else {
          // 비밀번호 정보가 없어도 로그인 상태 해제
          notLogin()
        }
      })
      .catch((error)=>{console.log(error)})
    } else {
      // 토큰 정보가 없으면 로그인 상태 해제
      notLogin()
    }
  }

  // 검증실패 또는 토큰 정보 없을 경우 로그인 상태 해제 처리
  const notLogin = () => {
    if ( window.location.hash !== 'nocookie' ) {
      removeCookie()
    }
    history.replace('/login/#nocookie')
  }

  // 로그아웃 요청(토큰 삭제)
  const removeCookie = () => {
    cookie.remove('token_id', {path: '/'})
    cookie.remove('token_name', {path: '/'})
    cookie.remove('token_password', {path: '/'})
  }

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/mypage" render={() => <MyPage userId={userId} />} />
        <Route exact path="/mypage/changepassword" render={() => <ChangePassword userId={userId} />} />
        <Route exact path="/naverApi" component={Naver} />
        <Route exact path="/board" component={Board} />
        <Route exact path="/board/newpost" component={NewPost} />
        <Route exact path="/board/editpost/:id" component={EditPost} />
        <Route exact path="/board/:id" component={Post} />
        <Route path="/product" render={() => <Product userId={userId} />} />
        {/* 미구현 목록 */}
        {/* <Route path="/cart" render={() => <Cart userId={userId} />} /> */}
        {/* <Route path="/history" render={() => <History userId={userId} />} /> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
