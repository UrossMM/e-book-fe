import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
    const [errorMessage, setErrorMessage] = useState();
    const [adminEmail, setAdminEmail] = useState();
    const [adminPassword, setAdminPassword] = useState();
    const [token, setToken] = useState();
    
    const handleChangeEmail = value => {
        setAdminEmail(value);
    }
    const handleChangePassword = value => {
       setAdminPassword(value);
    }

    useEffect(() => {
        localStorage.setItem('token', token);
      }, [token]);

  const navigate = useNavigate();
  const goToSignUp = () => {
    //poziv funkcije za proveru mejla i sifre
    const adminInputDataDto = {
        email: adminEmail,
        password: adminPassword
    }
    console.log(adminInputDataDto);
    axios.post('https://ebook.herokuapp.com/api/Admin/login', adminInputDataDto)
    .then((x) => {
        //upis tokena u localstorage
        //console.log(x.data["token"])
        //setToken(x.data["token"])  
        localStorage.setItem('token', x.data["token"]);
       // console.log(localStorage.getItem('token'))
        navigate("../admin");
      })
      .catch((error) => {
        setErrorMessage('Pogresni podaci. Pokusajte ponovo.')
      });
    //ako prodjes pozivas navigate na admin i upisujes token u localStorage
    //ako ne prodje ispisujes poruku da su pogresna sifra i mejl
   
    
  };

  return (
    <div className="adminLogin">
            <div className="card-container">
                    <div className="imageAdminLogin"><img id="profile-img" className="profile-img-card" src="https://nagriksevakendra.in/default/login/avatar.png" alt='slika' /></div>
                    <p id="profile-name" className="profile-name-card"></p>
                    {/* <form className="form-signin" onSubmit={this.naKlik.bind(this)}> */}
                    {/* <form className="form-signin"> */}
                        {/* <span id="reauth-email" className="reauth-email"></span> */}
                        <input className="emailAdminLogin" type="email" name="username" id="inputEmail" placeholder="Email address" required autoFocus 
                         value={adminEmail}
                         onChange={e => handleChangeEmail(e.target.value)}
                        />
                        <input className="passwordAdminLogin" type="password" name="password" id="inputPassword" placeholder="Password" required 
                         value={adminPassword}
                         onChange={e => handleChangePassword(e.target.value)}
                        />
                        <div style={{textAlign:"center"}}>
                        <label style={{color:"red"}}>{errorMessage}</label>
                        </div>
                        <button  className="buttonAdminLogin" type="submit" onClick={goToSignUp}>Prijavi se</button>
                    {/* </form> */}
                </div>
    </div>
  );
};

export default AdminLogin;
