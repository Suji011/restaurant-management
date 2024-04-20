import React from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";

function Testimonial() {
  return (
    <div className='testimonial'>
      <MDBContainer className="py-5" id='testimonial'>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol md="10" xl="8" className="text-center">
            <h3 className="mb-4">What Our Users Say</h3>
            <p className="mb-4 pb-2 mb-md-5 pb-md-0">
              Discover how RunYourResto has transformed the way restaurants manage their operations, from the kitchen to the counter. Our users share their success stories.
            </p>
          </MDBCol>
        </MDBRow>
        <MDBRow className="text-center d-flex align-items-stretch">
          <MDBCol md="4" className="mb-5 mb-md-0 d-flex align-items-stretch">
            <MDBCard className="testimonial-card">
              <div className="card-up" style={{ backgroundColor: "#f0ad4e" }}></div>
              <div className="avatar mx-auto bg-white">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp" className="rounded-circle img-fluid" />
              </div>
              <MDBCardBody>
                <h4 className="mb-4">Maria Smantha</h4>
                <hr />
                <p className="dark-grey-text mt-4">
                  <MDBIcon fas icon="quote-left" className="pe-2" />
                  "RunYourResto has revolutionized our order management. The live order updates and seamless kitchen communication have drastically reduced wait times!"
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="4" className="mb-5 mb-md-0 d-flex align-items-stretch">
            <MDBCard className="testimonial-card">
              <div className="card-up" style={{ backgroundColor: "#5cb85c" }}></div>
              <div className="avatar mx-auto bg-white">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp" className="rounded-circle img-fluid" />
              </div>
              <MDBCardBody>
                <h4 className="mb-4">Lisa Cudrow</h4>
                <hr />
                <p className="dark-grey-text mt-4">
                  <MDBIcon fas icon="quote-left" className="pe-2" />
                  "Creating and updating our menu has never been easier. The intuitive design of RunYourResto lets us focus on what we love most – creating delicious food!"
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="4" className="mb-5 mb-md-0 d-flex align-items-stretch">
            <MDBCard className="testimonial-card">
              <div className="card-up" style={{ backgroundColor: "#d9534f" }}></div>
              <div className="avatar mx-auto bg-white">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp" className="rounded-circle img-fluid" />
              </div>
              <MDBCardBody>
                <h4 className="mb-4">John Smith</h4>
                <hr />
                <p className="dark-grey-text mt-4">
                  <MDBIcon fas icon="quote-left" className="pe-2" />
                  "The real-time synchronization between the billing system and kitchen has transformed our service delivery. Happy chefs, happy customers, thanks to RunYourResto."
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  )
}

export default Testimonial;
