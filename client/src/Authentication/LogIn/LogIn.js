import React from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBCardBody,
  MDBCard,

}
from 'mdb-react-ui-kit';

function LogIn() {
  return (
    <div style={{
        display:'flex',
        alignItems:"center",
        width:"100%",
        height:"100vh",
    }}>
     <MDBContainer fluid className="p-3 my-4">

        <MDBCard className='text-black m-5 ' style={{borderRadius: '25px'}}>
        <MDBCardBody>
      <MDBRow>
      <MDBCol md='10' lg='6' className='d-flex align-items-center'>
          <img src="https://i0.wp.com/imgaston.tech/wp-content/uploads/2022/07/Bitcoin-mining.png?w=800&ssl=1" class="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol col='3' md='4'>

          <MDBInput wrapperClass='mb-4 mt-4' label='Email address' id='formControlLg' type='email' size="lg"/>
          <MDBInput wrapperClass='mb-2' label='Password' id='formControlLg' type='password' size="lg"/>


          <div className="d-flex justify-content-end mx-2 mb-4">
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-3 w-100" size="lg">Sign in</MDBBtn>

     

          <MDBBtn className="mb-3 w-100" size="lg" style={{backgroundColor: '#dd4b39'}}>
                <MDBIcon fab icon="google" className="mx-2"/>
                Continue with google
              </MDBBtn>

          <MDBBtn className="mb-3 w-100" size="lg" style={{backgroundColor: '#55acee'}}>
            <MDBIcon fab icon="linkedin" className="mx-2"/>
            Continue with Linkedin
          </MDBBtn>
          <div style={{
            display:"flex",
            justifyContent:"center",
            marginTop:"-10px"
          }}>
          <p className="large  fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="#!" className="link-danger">Register</a></p>
          </div>
        </MDBCol>

      </MDBRow>
      </MDBCardBody>
      </MDBCard>
    </MDBContainer>
   
   
    </div>
  );
}

export default LogIn;