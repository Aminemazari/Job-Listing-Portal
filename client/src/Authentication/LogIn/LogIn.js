import React from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
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
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol col='3' md='4'>

          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
          <MDBInput wrapperClass='mb-2' label='Password' id='formControlLg' type='password' size="lg"/>


          <div className="d-flex justify-content-end mx-2 mb-4">
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-1 w-100" size="lg">Sign in</MDBBtn>

          <div className="divider d-flex align-items-center justify-content-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>

          <MDBBtn className="mb-2 w-100" size="lg" style={{backgroundColor: '#dd4b39'}}>
                <MDBIcon fab icon="google" className="mx-2"/>
                Continue with google
              </MDBBtn>

          <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#55acee'}}>
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

    </MDBContainer>
    </div>
  );
}

export default LogIn;