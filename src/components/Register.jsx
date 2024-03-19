import React, { useState } from 'react'
import { useFormik } from 'formik'
import  axios from 'axios';
import { useNavigate } from 'react-router-dom';


export function Register() {
    
    let user ={
   
        name: "",
        email:"",
        password:"",
        rePassword:"",
        phone:""

    }


    const [errMsg, setErrMsg] = useState(null); 
    const [successMsg, setsuccessMsg] = useState(null);
    const navigate = useNavigate();

    async function regesterNewUser(values){
        console.log('submit',values);

        try{
            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values)

            if (data.message === "success") {

                setsuccessMsg("Account has created successfully")
                 
                setTimeout(function(){
                    navigate('/login')
                },1000)
            }
        }
        catch(err){
            console.log("error",err.response.data.message);
            setErrMsg(err.response.data.message)
            
        }
    }

   const formikObj = useFormik({

        initialValues : user,

        onSubmit: regesterNewUser,

        validate: function(values){

            setErrMsg(null);

            const errors ={};

            if (values.name.length < 3) {

                errors.name = "Name must be at least 3 letters"
                
            }

            if (values.email.includes("@") === false || values.email.includes(".") === false ) {
                errors.email = "This email is invalid"
            }

            if (! values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
                errors.phone ='phone not valid'
            }

            if (values.password.length < 8 || values.password.length > 10) {

                errors.password = "password must be betweent 8 characters to 10 characters "
                
            }

            if (values.rePassword !== values.password) {
                errors.rePassword = "the password doesn't match"
                
            }

            
            return errors;


        }
            
    });


    return (
        <>
       <div className="container pt-5">


            {errMsg? <div className="alert alert-danger">{errMsg}</div> :""}
            {successMsg? <div className="alert alert-success">{successMsg}</div> :""}

         <h1 className='pt-5'>Register Now</h1>

        <form onSubmit={formikObj.handleSubmit}>

           <label htmlFor='name' className="form-label">Name :</label>
           <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} id='name' value={formikObj.values.name} className="form-control" type="text" aria-label="default input example"/>
           {formikObj.errors.name && formikObj.touched.name ? <div className="alert alert-danger">{formikObj.errors.name }</div> :""}

           <div className="my-3">
               <label htmlFor='email' className="form-label">Email :</label>
               <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} id='email' type="email" className="form-control" />
               {formikObj.errors.email && formikObj.touched.email ? <div className="alert alert-danger">{formikObj.errors.email }</div> :""}
           </div>

           <label htmlFor='password' className="form-label">Password :</label>
           <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} id='password' type="password" className="form-control" />
           {formikObj.errors.password && formikObj.touched.password? <div className="alert alert-danger">{formikObj.errors.password }</div> :""}
           
           <div className="my-3">

                <label htmlFor='repassword' className="form-label">Re-password :</label>
                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.rePassword} id='rePassword' type="password" className="form-control" />
                {formikObj.errors.rePassword && formikObj.touched.rePassword? <div className="alert alert-danger">{formikObj.errors.rePassword }</div> :""}
           
            </div>      

           <label htmlFor='phone' className="form-label">Phone :</label>
           <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} id='phone' value={formikObj.values.phone} className="form-control" type="text" aria-label="default input example"/>
           {formikObj.errors.phone && formikObj.touched.phone? <div className="alert alert-danger">{formikObj.errors.phone }</div> :""}

           <div onBlur={formikObj.handleBlur}    className='d-flex justify-content-end mt-3'>
               <button type='submit' id='submit' disabled={formikObj.isValid === false || formikObj.dirty === false} className='btn btn-outline-dark'>Register Now</button>
           </div>

        </form>
       </div>
        </>
    )
}
