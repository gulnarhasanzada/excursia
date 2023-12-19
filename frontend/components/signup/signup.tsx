import { Button, TextField } from "@mui/material";
import MuiPhoneNumber, { MuiPhoneNumberProps } from "mui-phone-number";
import "./signup.css"
import { FormEvent, useRef, useState } from "react";
import { validateEmail, validatePassword, validateInputLength, validatePhoneNumber } from "../util/validation";
import Modal from "../util/modal/modal";

const Signup = (props: any)=>{
  const fnameRef = useRef<HTMLInputElement>(null);
  const lnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [firstnameErr, setFirstnameErr] = useState<string>("");
  const [lastnameErr, setLastnameErr] = useState<string>("");
  const [emailErr, setEmailErr] = useState<string>("");
  const [phoneErr, setPhoneErr] = useState<string>("");
  const [passwordErr, setPasswordErr] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleOnChange: MuiPhoneNumberProps["onChange"] = (value)=>{
    setPhoneNumber(value.toString());
  }

  const onSubmit = async (e: FormEvent)=>{
    e.preventDefault();
    const firstName = fnameRef.current?.value;
    const lastName = lnameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    setFirstnameErr(validateInputLength("Firstname", firstName));
    setLastnameErr(validateInputLength("Lastname", lastName));
    setEmailErr(validateEmail(email));
    setPhoneErr(validatePhoneNumber(phoneNumber));
    setPasswordErr(validatePassword(password));
    
    const user = {
      firstName,
      lastName,
      phoneNumber,
      email,
      password
    }
    
    const response = await fetch("http://localhost:8080/user/signup", {
                                  method: 'POST',
                                  body: JSON.stringify(user),
                                  headers: {
                                    "Content-Type": "application/json"
                                  }});
    
    const data = await response.json();
    if(data.message){ 
      setError(data.message);
    }
    props.closeSignup();
  }

  const onHidePageHandler = ()=>{
    props.closeSignup();
  }
  
  return (<>
  <Modal onHidePage = {onHidePageHandler}>
    <h5>Sign up</h5>

    {error && <p>{error}</p>}
    <form onSubmit={onSubmit}>
      <TextField required
                id="standard-basic"
                label="Firstname" 
                variant="standard"
                className="input-field"
                name="firstname"
                inputRef={fnameRef}
                helperText={firstnameErr}
      />
    
      <TextField required
                id="standard-basic"
                label="Lastname" 
                variant="standard"
                className="input-field"
                name="lastname"
                inputRef={lnameRef}
                helperText={lastnameErr}
      />

      <TextField required
                id="standard-basic"
                label="Email" 
                variant="standard"
                className="input-field"
                name="email"
                type="email"
                inputRef={emailRef}
                helperText={emailErr}
      />

      <TextField required
                id="standard-basic"
                label="Password" 
                variant="standard"
                className="input-field"
                name="password"
                inputRef={passwordRef}
                type="password"
                helperText={passwordErr}
      />
      
      <MuiPhoneNumber required 
                      id="outlined-required" 
                      defaultCountry={'ca'} 
                      label="Phone"
                      onChange={handleOnChange}
                      className="input-field"
                      helperText={phoneErr}
      />
      
      <Button variant="contained" 
              className="input-field button" 
              type="submit">Sign up</Button>
      
    </form>
    </Modal></>)
}

export default Signup;

