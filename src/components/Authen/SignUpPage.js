import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Anhlogin from "../../assets/images/Anhlogin.png";
import "./SignUpPage.scss";
import { signupApi } from '../../api/UserAPi';


const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();


  const handleSignUp = (e) => {
    e.preventDefault();
    if (!handleValidationEmail()) {
      return;
    }
    if (!password) {
      toast.error('The password is required');
      return;
    }
    signupApi(email,password)
    .then((response)=>{
        console.log('Day la khi sign up', response);
        navigate('/signin');
    })
  };

  const handleValidationEmail = () => {
    const emailPattern = /^[\w-]+(\.[\w-]+)*@(gmail\.com)$/;
    if (!email) {
      toast.error('An email is required!');
      return false;
    } else if (!emailPattern.test(email)) {
      toast.error('An invalid email format! (must be @gmail.com)');
      return false;
    } else if (!password) {
      toast.error('A password is required!');
      return false;
    } else if (password !== confirmPassword) {
      toast.error('Password and confirm password do not match!');
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
              <div className="login-title" style={{ color: 'white' }}>Sign Up</div>
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
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />                  
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                  <Form.Label style={{ color: 'white' }}>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <Row>
                  <div className="checkbox-and-resetpw">
                    <Form.Group
                      className="check-pw"
                      controlId="formBasicCheckbox"
                      as={Col}
                    >
                      <Form.Check type="checkbox" style={{ color: 'white' }} label="I agree to the terms and conditions" />
                    </Form.Group>
                  </div>
                </Row>
                <div className="login-btn">
                  <Button variant="primary" type="submit" onClick={handleSignUp}>
                    Sign Up
                  </Button>
                  <div className="text" style={{ textAlign: 'center', marginTop: '14px', color: 'white' }}>
                    Already have an account? <Link to="/signin" className="signuplink" style={{ textDecoration: 'none' }}>Sign in now</Link>
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

export default SignUpPage;