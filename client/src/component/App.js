import { Route, Switch } from "react-router-dom";
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

function App() {
  const [userId, setUserId] = useState(""); 

  useEffect(()=>{
    // 로그인 구현 전 유저아이디 디폴트 기입
  setUserId(process.env.REACT_APP_USER_ID)
  },[])
  
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/naverApi" component={Naver} />
        <Route exact path="/board" component={Board} />
        <Route exact path="/board/newpost" component={NewPost} />
        <Route exact path="/board/editpost/:id" component={EditPost} />
        <Route exact path="/board/:id" component={Post} />
        <Route path="/product" render={() => <Product userId={userId} />} />
        <Route path="/cart" render={() => <Cart userId={userId} />} />
        <Route path="/history" render={() => <History userId={userId} />} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
