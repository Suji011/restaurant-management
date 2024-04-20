import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

function Footer() {
  return (
    <>
      <MDBFooter bgColor='light' className='text-center text-lg-start text-muted mt-4 footerdiv'>
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
          <div className='me-5 d-none d-lg-block'>
            <span>Connect with RunYourResto on social networks:</span>
          </div>

          <div>
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon="facebook-f" />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon="twitter" />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon="instagram" />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon="linkedin" />
            </a>
          </div>
        </section>

        <section>
          <MDBContainer className='text-center text-md-start mt-5'>
            <MDBRow className='mt-3'>
              <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>
                  <MDBIcon icon="utensils" className="me-3" />
                  RunYourResto
                </h6>
                <p>
                  Revolutionizing restaurant management with integrated order handling, real-time kitchen updates, and comprehensive billing solutions.
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Features</h6>
                <p>
                  <a href='#!' className='text-reset'>
                    Order Management
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Real-time Updates
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Menu Customization
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Billing & Reporting
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Quick Links</h6>
                <p>
                  <a href='#about' className='text-reset'>
                    About Us
                  </a>
                </p>

                <p>
                  <a href='#testimonial' className='text-reset'>
                    Testimonials
                  </a>
                </p>
                <p>
                  <a href='#faq' className='text-reset'>
                    FAQ
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Contact Us</h6>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                  Kerala, India
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-3" />
                  support@runyourresto.com
                </p>
                <p>
                  <MDBIcon id='contact' icon="phone" className="me-3" /> + 00 123 456 789
                </p>
                <p>
                  <MDBIcon icon="print" className="me-3" /> + 00 987 654 321
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div className='footerdivbottom text-center p-4 text-white' >
          © {new Date().getFullYear()} RunYourResto: All rights reserved.
        </div>
      </MDBFooter>
    </>
  )
}

export default Footer;
