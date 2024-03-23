import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';


import Anhlogin from "../../assets/images/Anhlogin.png";
import "./SignInPage.scss";
import { loginApi } from '../../api/UserAPi';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
// handle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleLogin = (e) => {
    e.preventDefault();
    if (!handleValidationEmail()) {
      return;
    }
    if (!password) {
      toast.error('The password is required');
      return;
    }
    loginApi(email, password)
      .then((response) => {
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        const decodedAccessToken = atob(accessToken.split('.')[1]);
        console.log('Day la du lieu tra ve',response.data.accessToken);
        console.log('Dữ liệu accessToken giải mã:', decodedAccessToken);
        localStorage.setItem("userInfo", decodedAccessToken)
        navigate(JSON.parse(decodedAccessToken)?.accountId?.role === "ADMIN" ? '/admin' : '/');
        
      })
      .catch((error) => {
        console.error('Đăng nhập thất bại', error);
        toast.error('Login Failed: Your email or password is incorrect');
      });
  };

  const handleValidationEmail = () => {
    const emailPattern = /^[\w-]+(\.[\w-]+)*@(gmail\.com)$/;

    if (!email) {
      toast.error('An email is required!');
      return false;
    } else if (!emailPattern.test(email)) {
      toast.error('An invalid email format! (must be @gmail.com)');
      return false;
    }
    return true;
  };

  return (
    <div className='background-image' style={{ backgroundImage: `url(${Anhlogin})`, height: "100vh" }}>
      <Scrollbars
        style={{ height: "100vh" }}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
      >
        <div className="background-container">
          <div className="login-container">
            <div className="login-form">
              <div className="login-title" style={{ color: 'white' }}>Login</div>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ color: 'white' }}>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={{ color: 'white' }}>Password</Form.Label>
                  <div className="password-input-container">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      className="password-toggle"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeSlash /> : <Eye />}
                    </span>
                  </div>
                </Form.Group>
                <Row>
                  <div className="checkbox-and-resetpw" >
                    <Form.Group
                      className="check-pw"
                      controlId="formBasicCheckbox"
                      as={Col}
                    >
                      <Form.Check type="checkbox" style={{ color: 'white' }} label="Remember me" />
                    </Form.Group>
                    <Link className="nav-link " to='/forgotpassword'>
                      <Form.Text className="forget-password" style={{ color: 'white' }} as={Col} >
                        Forgot password?
                      </Form.Text>
                    </Link>
                  </div>
                </Row>
                <div className="login-btn">           
                  <Button variant="primary" type="submit" onClick={handleLogin}>
                    Login
                  </Button>
                  <div className="text" style={{ textAlign: 'center', marginTop: '14px', color: 'white' }}>
                  Don't have an account? <Link to="/signup" className="signuplink" style={{ textDecoration: 'none'}} >Sign up now</Link>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Scrollbars>
      <ToastContainer />
    </div>
  );
};

export default SignInPage;
