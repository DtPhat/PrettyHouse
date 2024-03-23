import React from 'react'
import './Footer.scss';
import { Button, Form, InputGroup } from 'react-bootstrap';
import Logo from "../../assets/images/Interior-logo.png";
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const {pathname} = useLocation()
  if(pathname.includes('admin')){
    return <></>;
  }
  return (
    <section className='footer-container'>
      <div className='footer-content'>
        <div className='footer-item'>
          <h4>FOLLOW US</h4>
          <img src={Logo} alt='logo' className='footer-logo' width={128} height={96} />
        </div>

        <div className='footer-item'>
          <h4>ABOUT US</h4>
          <div className='sub-items'>
            <Link to="/introduction" style={{ textDecoration: 'none', color: '#F8F8F8' }} onClick={() => window.scrollTo(0,0)}>Introduction</Link>
            <Link to="/promotion" style={{ textDecoration: 'none', color: '#F8F8F8' }} onClick={() => window.scrollTo(0,0)}>Promotion</Link>
            <Link to="/policy" style={{ textDecoration: 'none', color: '#F8F8F8' }} onClick={() => window.scrollTo(0,0)}>Warranty Policy</Link>
          </div>
        </div>

        <div className='footer-item'>
          <h4>INSPIRATION</h4>
          <Link to="/shop" style={{ textDecoration: 'none', color: '#F8F8F8' }} onClick={() => window.scrollTo(0,0)}>Products</Link>
          <Link to="/rooms/living-room" style={{ textDecoration: 'none', color: '#F8F8F8' }} onClick={() => window.scrollTo(0,0)}>Designs</Link>
          <div className='sub-items'>
          </div>
        </div>

        <div className='footer-item'>
          <h4>NEWSLETTER</h4>
          <div>Please leave your email to receive new decoration ideas and information, as well as offers from Interior Construction.</div>
          <div><span>Email: </span><span>interiorconstruction301m@gmail.com</span></div>
          <div>
            <InputGroup className="mb-3">
              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                placeholder='Enter your email here'
                style={{ width: '20%' }}
              />
              <Button variant="outline-secondary" id="button-addon1" className='' style={{ color: 'white', backgroundColor: 'black' }}>
                Subscribe
              </Button>
            </InputGroup>
          </div>
        </div>
      </div>
      <div className='copyright'>
        Copyright © 2024 - Copyright of InteriorConstruction - ISC301 <br />
        Since 1999 - Trademark registered number 822024 by the Intellectual Property Office
      </div>
    </section>
  )
}

export default Footer