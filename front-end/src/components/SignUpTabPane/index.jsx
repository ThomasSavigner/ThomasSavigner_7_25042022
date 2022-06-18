import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';


function SignUpTabPane() {

    const [picture, setPicture] = useState('icons/default-avatar.png')

    const onChangePicture = (event) => {
        setPicture(URL.createObjectURL(event.target.files[0]))
    }

    return (
    <>
    
    <div className="tab-pane fade show border border-secondary border-2 rounded-3 color-4"
         id="signup-box" role="tabpanel" aria-labelledby="signup-tab">
        <Form className="form-horizontal px-3">
            <fieldset>
                <div className="form-group">
                    <div className="mx-auto py-1 avatar-signup-container">
                        <img className="rounded-circle thumbnail w-100 h-100 img-fit" id="defaultphoto"
                            alt="user account icon" title="Preview profile photo" 
                            src={picture} />
                    </div>
                    <div className="input-group">
                        <div className="input-group-btn mx-auto pt-1 pb-2">
                            <Button className="fileUpload btn btn-secondary btn-sm fake-shadow">
                                <span className='font-title'>J'insère ma photo</span>
                                <Form.Control id="choosefilebutton" name="photobutton" type="file" onChange={onChangePicture} className=""/>
                            </Button>
                        </div>
                    </div>
                </div>
                {/*<!-- Text input-->*/}
                <div className="form-group">
                    <div className="col-md-10 mx-md-auto mt-2 input-group input-group-sm">
                        <Form.Control id="lastnameinput" name="lastnameinput" type="text" placeholder="nom" className="form-control" required=""/>
                    </div>
                </div>
                {/*<!-- Text input-->*/}
                <div className="form-group"> 
                    <div className="col-md-10 mx-md-auto mt-2 input-group input-group-sm">
                        <Form.Control id="firstnameinput" name="firstnameinput" type="text" placeholder="prénom" className="form-control" required=""/>
                    </div>
                </div>
            
                <div className="form-group">
                    <div className="col-6 col-md-4 mx-auto mt-2">
                        <Form.Select name="departments" id="departments-select" className="form-control bg-secondary font-title text-light">
                            <option value="" className="text-center">- département -</option>
                            <option value="Administration">Administration</option>
                            <option value="Finances">Finances</option>
                            <option value="Comptabilité">Comptabilité</option>
                            <option value="SSI">SSI</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Logistique">Logistique</option>
                        </Form.Select>
                    </div>
                </div>


                <div className="form-group">
                    <div className="col-md-10 mx-md-auto mt-2 input-group input-group-sm">
                        <Form.Control id="rec-emailinput" name="rec-email-input" type="email" placeholder="email" className="form-control"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-10 mx-md-auto mt-2 input-group input-group-sm">
                        <Form.Control id="passwordinput1" name="passwordinput" type="password" placeholder="mot de passe" className="form-control"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-md-10 mx-md-auto mt-2 input-group input-group-sm">
                        <Form.Control id="passwordinput2" name="passwordinput" type="password" placeholder="mot de passe" className="form-control"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-3 col-md-1 mx-auto my-3">
                        <Button id="submitbutton" name="submitbutton" className="btn btn-sm btn-secondary">Save</Button>
                    </div>
                </div>
            </fieldset>
        </Form>
    </div>

    </>
    )
}

export default SignUpTabPane