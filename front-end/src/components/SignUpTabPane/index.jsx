import React from 'react';
import { Formik, Field } from "formik";
import { object, string, ref } from "yup";

import AuthService from "../../services/auth.service";
import { useNavigate, useLocation } from 'react-router-dom';


const RegisterValidation = object().shape({
    //file: array().min(1, "select at least one file"),
    lastname: string().required("Required"),
    firstname: string().required("Required"),
    departmentID: string().required("Required"),
    email: string().required("Valid email required").email("Valid email required"),
    password: string().min(8, "Required").required("Required"),
    passwordConfirm: string().required("Please confirm your password").oneOf([ref("password")], "Passwords do not match"),
  });
  
  

function SignUpTabPane() {

    const navigate = useNavigate();
    const location = useLocation();

    const [avatarPreview, setAvatarPreview] = React.useState('icons/default-avatar.png');
    const [lastname, setLastname] = React.useState('');
    const [firstname, setFirstname] = React.useState('');
    const [departmentID, setDepartmentID] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');

    
    const handleSubmit = (values) => {
        
            alert("avatarPreview :"+avatarPreview);
            console.log("departmentID :"+departmentID);
            console.log("email :"+email);
             //let data = new FormData();
             //for (let value in values) {
             //  data.append(value, values[value]);
             //}
             //alert(data.toString());
             AuthService.signup(values.file, lastname, firstname, departmentID, email, password, passwordConfirm)
                 .then( () => {
                     const origin = location.state?.from?.pathname || 'app/feeds';
                     navigate(origin, {replace: true});
                 })
                 .catch((err) => { console.log(err); })
        }


    const handleFileOnChange = (event) => {
        
        const file = event.target.files[0];

        //setFieldValue("file", file);

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
           setAvatarPreview(reader.result)   
        };
        
    };

    return (
    <>
    <div className="tab-pane fade show border border-secondary border-2 rounded-3 color-4"
         id="signup-box" role="tabpanel" aria-labelledby="signup-tab">
        
        <Formik 
        initialValues= {{
            photobutton: '',
            lastnameinput: '',
            firstnameinput: '',
            selectdepartment: '',
            recemailinput: '',
            passwordinput: '',
            passwordinput2: '',
        }}
        validationSchema={RegisterValidation}        
        >   
        {( isSubmitting) => (     
        <form className="form-horizontal px-3" onSubmit={handleSubmit} encType='multipart/form-data'>
            <fieldset>
                <div className="form-group">
                    <div className="mx-auto py-1 avatar-signup-container">
                        <img className="rounded-circle thumbnail w-100 h-100 img-fit" id="defaultphoto"
                            alt="user account icon" title="Preview profile photo" 
                            src={avatarPreview} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-btn mx-auto pt-1 pb-2">
                            <button className="fileUpload btn btn-secondary btn-sm fake-shadow">
                                <span className='font-title'>J'insère ma photo</span>
                                <Field id="choosefilebutton" name="photobutton" type="file" accept='image/*' onChange={handleFileOnChange}  className="" />
                            </button>
                        </div>
                    </div>
                </div>
               
                <div className="form-group">
                    <div className="col-md-10 mx-md-auto mt-2 input-group input-group-sm">
                        <input id="lastnameinput" name="lastnameinput" type="text" placeholder="nom" 
                            onChange={(event) => setLastname(event.target.value)} value={lastname} className="form-control" required=""/>
                    </div>
                </div>
                
                <div className="form-group"> 
                    <div className="col-md-10 mx-md-auto mt-2 input-group input-group-sm">
                        <input id="firstnameinput" name="firstnameinput" type="text" placeholder="prénom"
                             onChange={(event) => setFirstname(event.target.value)} value={firstname} className="form-control" required=""/>
                    </div>
                </div>
            
                <div className="form-group">
                    <div className="col-6 col-md-4 mx-auto mt-2">
                        <select name="departments" id="selectdepartment" 
                            onChange={(event) => setDepartmentID(event.target.value)} value={departmentID} className="form-control bg-secondary font-title text-light">
                            <option value='' label="- département -" className="text-center">- département -</option>
                            <option value='1' label="Administration">Administration</option>
                            <option value='2' label="Finances">Finances</option>
                            <option value='3' label="Comptabilité">Comptabilité</option>
                            <option value='4' label="SSI">SSI</option>
                            <option value='5' label="Marketing">Marketing</option>
                            <option value='6' label="Logistique">Logistique</option>
                        </select>
                    </div>
                </div>


                <div className="form-group">
                    <div className="col-md-10 mx-md-auto mt-2 input-group input-group-sm">
                        <input id="rec-emailinput" name="recemailinput" type="email" placeholder="email"
                             onChange={(event) => setEmail(event.target.value)} value={email} className="form-control"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-10 mx-md-auto mt-2 input-group input-group-sm">
                        <input id="passwordinput1" name="passwordinput" type="password" placeholder="mot de passe"
                            onChange={(event) => setPassword(event.target.value)} value={password} className="form-control"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-10 mx-md-auto mt-2 input-group input-group-sm">
                        <input id="passwordinput2" name="passwordinput2" type="password" placeholder="mot de passe"
                            onChange={(event) => setPasswordConfirm(event.target.value)} value={passwordConfirm} className="form-control"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-3 col-md-1 mx-auto my-3">
                        <button id="submitbutton" name="submitbutton" type="submit" disabled={isSubmitting} className="btn btn-sm btn-secondary">Save</button>
                    </div>
                </div>
            </fieldset>
        </form>
        )}
    </Formik>
    
    </div>

    </>
    );
                };

export default SignUpTabPane