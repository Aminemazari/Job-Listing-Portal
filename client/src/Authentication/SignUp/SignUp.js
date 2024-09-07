import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import { useState } from 'react';

function SignUp() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    return (
        <div style={{
            display: 'flex',
            alignItems: "center",
            justifyContent:"center",
            width: "100%",
            height: "100vh",
            overflow:"hidden",
            background:"rgb(243, 242, 241)"
        }}>
            <MDBContainer fluid className=" pb-0 my-4" style={{
                display: 'flex',
                alignItems: "center",
                justifyContent:"center",}}  >

                <MDBCard className='text-black m-5  ' style={{ borderRadius: '25px',maxWidth:"85%" }}>
                    <MDBCardBody className='p-10' >
                        <MDBRow>
                            <MDBCol md='10' lg='5' className='order-2 order-lg-1 d-flex flex-column  mt-2'>
                            <p style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', margin: '5px 0' }}>Sign Up</p>
                                <div className="d-flex flex-row align-items-center mb-3 ">
                                    <MDBIcon fas icon="user me-3" size='lg' />
                                    <MDBInput label='Your Name' id='form1' type='text' className='w-100' />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-3 ">
                                    <MDBIcon fas icon="envelope me-3" size='lg' />
                                    <MDBInput label='Your Email' id='form2' type='email' />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-3 ">
                                    <MDBIcon fas icon="lock me-3" size='lg' />
                                    <MDBInput
                                        label="Password"
                                        id="form3"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon fas icon="key me-3" size='lg' />
                                    <MDBInput
                                        className={`mb-1 ${password !== confirmPassword && confirmPassword ? 'is-invalid' : ''}`}
                                        label="Repeat your password"
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <MDBBtn className='mb-1 w-100' size='lg' >Sign Up</MDBBtn>
                                <div className="divider d-flex align-items-center justify-content-center my-2">
                                    <p className="text-center fw-bold mx-2 mb-0">OR</p>
                                </div>
                                <MDBBtn className="mb-2 w-100" size="lg" style={{ backgroundColor: '#dd4b39' }}>
                                    <MDBIcon fab icon="google" className="mx-2" />
                                    Continue with google
                                </MDBBtn>

                                <MDBBtn className=" w-100" size="lg" style={{ backgroundColor: '#55acee' }}>
                                    <MDBIcon fab icon="linkedin" className="mx-2" />
                                    Continue with Linkedin
                                </MDBBtn>
                                <p className="large fw-bold mt-2 pt-1 mb-2" style={{textAlign:"center"}}>
                                    Already have an account? <a href="/login" className="link-danger" >Sign in here</a>
                                </p>    


                            </MDBCol>

                            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
                            </MDBCol>

                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>

            </MDBContainer>
        </div>
    );
}

export default SignUp;