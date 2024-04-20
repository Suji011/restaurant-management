import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';

function IntroductionSection() {
  return (
    <MDBContainer id='intro' className="my-5 py-5 introLandingPage">
      <MDBRow>
        <MDBCol md="6" className="d-flex flex-column justify-content-center">
          <MDBTypography tag="h2" className="h2 mb-3">
            Simplify Your Restaurant Management with RunYourResto
          </MDBTypography>
          <p className="mb-4">
            RunYourResto brings a comprehensive solution to manage your restaurant's daily operations seamlessly. From order tracking and kitchen management to billing and customer service, our system is designed to streamline every aspect of your business.
          </p>
          <MDBBtn href='#about' className='btnLearMore' >Learn More</MDBBtn>
        </MDBCol>
        <MDBCol md="6" className='mt-2 btnlearnmore '>
          <img src="https://hospitalityinsights.ehl.edu/hs-fs/hubfs/Blog-EHL-Insights/Images-EHL-Insights/restaurant-management-skills.jpeg?width=777&height=429&name=restaurant-management-skills.jpeg" alt="RunYourResto Dashboard" className="img-fluid rounded" />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default IntroductionSection;
