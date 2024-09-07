import React,{useState}from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCardBody,
  MDBCard,

}
from 'mdb-react-ui-kit';

function LogIn() {
  const [password, setPassword] = useState('');
  return (
    <div style={{
        display:'flex',
        alignItems:"center",
        width:"100%",
        height:"100vh",
        background:"rgb(243, 242, 241)"
    }}>
     <MDBContainer fluid className="p-3 pb-0 my-4"style={{
                display: 'flex',
                alignItems: "center",
                justifyContent:"center",}} >

        <MDBCard className='text-black m-6 ' style={{borderRadius: '25px',maxWidth:"85%" }}>
        <MDBCardBody>
      <MDBRow>
      <MDBCol md='10' lg='6' className='d-flex align-items-center'>
          <img src="https://i0.wp.com/imgaston.tech/wp-content/uploads/2022/07/Bitcoin-mining.png?w=800&ssl=1" class="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol md='10' lg='5'>
        <p style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', margin: '20px 0' }}>Sign In</p>
        {/*<MDBInput wrapperClass='mb-4 mt-4' label='Email address' id='formControlLg' type='email' size="lg"/>*/}
          <div className="d-flex flex-row align-items-center mb-4 ">
              <MDBIcon fas icon="envelope me-3" size='lg' />
              <MDBInput label='Your Email' id='form2' type='email' size="lg" />
          </div>
          <div className="d-flex flex-row align-items-center mb-3 ">
              <MDBIcon fas icon="lock me-3" size='lg' />
              <MDBInput
                  label="Password"
                  id="form3"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size='lg'
                  required
              />
          </div>

          <div className="d-flex justify-content-end mx-2 mb-4">
            <a href="/Forgot-Password">Forgot password?</a>
          </div>

          <MDBBtn className="mb-2 w-100" size="lg">Sign in</MDBBtn>

          <p className="text-center fw-bold mx-1 mb-1">OR</p>

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
          <p className="large  fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="/" className="link-danger">Register</a></p>
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