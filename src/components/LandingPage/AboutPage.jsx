import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

function AboutPage() {
  return (
    <MDBContainer className="my-5" id='about'>
      <div className="about-page">
      <MDBRow>
        <MDBCol size="12" className="text-center">
          <h2>About RunYourResto</h2>
          <p className="lead">Empowering Restaurants Worldwide</p>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mt-4">
        <MDBCol md="6">
          <img src="runyourrestologo.webp" alt="About RunYourResto" className="img-fluid rounded" />
        </MDBCol>
        <MDBCol md="6">
          <h3>Our Story</h3>
          <p>
            RunYourResto began with a simple idea: to make restaurant management effortless. Founded by hospitality professionals and tech innovators, we've built a comprehensive system that integrates seamlessly into the daily workings of any restaurant, cafe, or food service establishment.
          </p>
          <h3>Our Mission</h3>
          <p>
            Our mission is to streamline the operations of restaurants worldwide, enabling them to provide exceptional service, reduce waste, and increase profitability. With real-time updates, efficient order management, and intuitive interfaces, we're setting new standards in the food service industry.
          </p>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mt-4">
        <MDBCol size="12">
          <h3>Why Choose Us?</h3>
          <p>
            At RunYourResto, we're more than just a software company. We're partners in your restaurant's journey to success. Our platform is designed by restaurateurs for restaurateurs, ensuring that every feature is built with your needs in mind. From the kitchen to the counter, we're with you every step of the way.
          </p>
        </MDBCol>
      </MDBRow>
      </div>
    </MDBContainer>
  );
}

export default AboutPage;
