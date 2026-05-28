

import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import logo from '../assets/images/logo.png';

function Footer() {
  return (
    <MDBFooter className='m-3 text-center text-lg-start text-dark bg-light'>
      <section className='py-4'>
        <MDBContainer className='text-center text-md-start'>
          <MDBRow>
            {/* About Section */}
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <img src={logo} alt="Medicare Logo" width={150} />
              </h6>
              <p className=''>
                Your trusted partner in healthcare, providing top-quality medical services with expert doctors and modern facilities.
              </p>
            </MDBCol>

            {/* Quick Links */}
            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Explore</h6>
              <p>
                <a href='/doctors' className='text-dark' style={{ textDecoration: 'none' }}>
                  Find a Doctor
                </a>
              </p>
              <p>
                <a href='/services' className='text-dark' style={{ textDecoration: 'none' }}>
                  Our Services
                </a>
              </p>
              <p>
                <a href='/doctors' className='text-dark' style={{ textDecoration: 'none' }}>
                  Book an Appointment
                </a>
              </p>
              <p>
                <a href='/contact' className='text-dark' style={{ textDecoration: 'none' }}>
                  Contact Us
                </a>
              </p>
            </MDBCol>

            {/* Support Section */}
            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Support</h6>
              <p>
                <a href='#' className='text-dark' style={{ textDecoration: 'none' }}>
                  FAQs
                </a>
              </p>
              <p>
                <a href='#' className='text-dark' style={{ textDecoration: 'none' }}>
                  Privacy Policy
                </a>
              </p>
              <p>
                <a href='#' className='text-dark' style={{ textDecoration: 'none' }}>
                  Terms of Service
                </a>
              </p>
              <p>
                <a href='#' className='text-dark' style={{ textDecoration: 'none' }}>
                  Patient Guide
                </a>
              </p>
            </MDBCol>

            {/* Subscribe & Social Links */}
            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Stay Connected</h6>
              <div className='mb-3 d-flex'>
                <input className='form-control me-2' type="email" placeholder='Enter Your Email' />
                <button className='btn btn-warning'>Subscribe</button>
              </div>
              <div className='d-flex justify-content-center'>
                <a href='/' className='me-3 text-dark'>
                  <MDBIcon fab icon="facebook-f" />
                </a>
                <a href='/' className='me-3 text-dark'>
                  <MDBIcon fab icon="twitter" />
                </a>
                <a href='/' className='me-3 text-dark'>
                  <MDBIcon fab icon="instagram" />
                </a>
                <a href='/' className='me-3 text-dark'>
                  <MDBIcon fab icon="linkedin" />
                </a>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      {/* Copyright Section */}
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Medicare | <a className='text-reset fw-bold' href='/' style={{ textDecoration: 'none' }}>medicare.com</a>
      </div>
    </MDBFooter>
  );
}

export default Footer;
