const form = document.getElementById('myForm')
const subm = document.getElementById('submit1')
const email= document.getElementById('email')
const password = document.getElementById('password')
const emerror = document.getElementById('emerror')
const perror = document.getElementById('perror')
const reset = document.getElementById('myReset')
const errorM = document.getElementById('errorM')

function strongPassword(password){
    const lowerCase = /[a-z]/;
    const upperCase = /[A-Z]/;
    const numbers = /[0-9]/;
    const isLowerCase = lowerCase.test(password);
    const isUppreCase =upperCase.test(password);
    const isNumbers = numbers.test(password);
    return  isLowerCase && isUppreCase && isNumbers 
}  
const store = []

function resetForm(){
    email.value='';
    password.value='';
    }

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let thereIsError = false;
    const Email = email.value;
 const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordValue = password.value;
    const passWordValid = strongPassword(passwordValue)
    if(Email === ''){
     thereIsError = true;
        email.style.border = '1px solid red';
        emerror.textContent = 'Email required';
        }else if(emailRegex.test(Email)){
         thereIsError = false;
            email.style.border = '3px solid green'
            emerror.textContent = '';
            }else{
            thereIsError = true;
                emerror.textContent = 'Invalid Email'
                email.style.border = '1px solid red'
            }
            if(passwordValue ===''){
                thereIsError = true;
            perror.textContent = 'Password required';
            password.style.border = '1px solid red'
        } else if(passwordValue.length<8){
            thereIsError = true;
            password.style.border = '1px solid red'
            perror.textContent = 'password should have at least 8 charactor';
        } 
        else if(!passWordValid){
            thereIsError = true;
            password.style.border = '1px solid red'
            perror.textContent = 'password should be contain Numbers, uppercase and lowercase';
        
        }
        else{
            thereIsError = false;
            password.style.border = '3px solid green'
            perror.textContent = '';

        }

            if((!email ||!password)||thereIsError){
                reset.textContent = "";
                errorM.style.color = 'red'
                return;
            }

          
})






const login = async(email,password)=>{
  const res = await axios({
    method:"POST",
    url:"https://mybrandbackend-93l8.onrender.com/api/users/login",
    data:{password,email}
  })
  console.log(res);
  localStorage.setItem("jwt",res.data.token)
  localStorage.setItem("user",res.data.user)
  if(res.data.user.role === "admin"){
    window.location.href = "dashboard/index.html"
  }
  else if(res.data.user.role === "user"){
    window.location.href = "index.html"
  }
};

subm.addEventListener('click',()=>{
    console.log("fail");
    const loginEmail= document.getElementById('email').value
    const loginPassword = document.getElementById('password').value
    console.log(loginEmail,loginPassword);
  login(loginEmail,loginPassword)
  
});
