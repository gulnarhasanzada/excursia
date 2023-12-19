export const validateEmail = (email: string | undefined): string=>{
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email?.trim() && emailRegex.test(email?.trim())? "": "Invalid email format!";
}

export const validatePassword = (password: string | undefined): string=>{
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
  if(password){
    return password.trim().length>=6 && regex.test(password.trim())  ? "": "Password must be at least 6 characters long and contain at least 1 uppercase letter, 1 special character, and 1 alphanumeric character.";
  }else{
    return ""
  }
}

export const validatePhoneNumber = (phoneNumber: string): string => {
  const pattern: RegExp = /^\+\d{1,3} \(\d{3}\) \d{3}-\d{4}$/;
  return pattern.test(phoneNumber.trim()) ? "": "Phone format should be +X (XXX) XXX-XXXX";
}

export const validateInputLength = (name: string, input: string | undefined, min: number = 2): string => {
  return !!input && input.length >= min ? "": name + " should be at least "+min+ " characters long!";
}



