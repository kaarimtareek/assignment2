import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import  axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { cartContext } from './CartContext';
import toast from 'react-hot-toast';



export function CheckOut() {
    


    const {cartId, getUserCart, setCartProducts, setTotalCartPrice, setNumOfCartItems} = useContext(cartContext)
    const [errMsg, setErrMsg] = useState(null); 
    const [successMsg, setsuccessMsg] = useState(null);
    const navigate = useNavigate();
    const shippingAddress = {
        "shippingAddress":{
            details : "",
            phone: "",
            city: "",
        }}

    async function confirmPayment(values){
        console.log('submit',values);

        try{
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}` , values,
            {
                headers: {token: localStorage.getItem('tkn')},
                params: {url: "http://localhost:3000"}
            })


            if(data.status === "success") {

                toast.success('order placed successfully')

                  setCartProducts([]); 
                  setTotalCartPrice(0);
                  setNumOfCartItems(0);
                  getUserCart();
                 
            }

            window.open(data.session.url, "_self");

        }
        catch(err){
            console.log('error' , err);
            
        }
    }

   const formikObj = useFormik({

        initialValues : shippingAddress,

        onSubmit: confirmPayment,

        validate: function(values){

            setErrMsg(null);

            const errors ={};

            if (values && values.city && values.city.length < 3) {

                errors.city = "city must be at least 3 letters"
                
            }

            if (values && values.phone && !values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
                errors.phone ='phone not valid'
            }

            if (values && values.details && values.details.length < 3) {

                errors.details = "Details must be at least 3 letters"
                
            }

            
            return errors;


        }
            
    });


    return (
        <>
       <div className="container pt-5">


            {errMsg? <div className="alert alert-danger">{errMsg}</div> :""}
            {successMsg? <div className="alert alert-success">{successMsg}</div> :""}

         <h1 className='pt-5'>Order Now</h1>

        <form onSubmit={formikObj.handleSubmit}>

           <label htmlFor='city' className="form-label">City :</label>
           <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} id='city' value={formikObj.values.city} className="form-control" type="text" aria-label="default input example"/>
           {formikObj.errors.city && formikObj.touched.city ? <div className="alert alert-danger">{formikObj.errors.city }</div> :""}

          
           <label htmlFor='phone' className="form-label">Phone :</label>
           <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} id='phone' value={formikObj.values.phone} className="form-control" type="text" aria-label="default input example"/>
           {formikObj.errors.phone && formikObj.touched.phone? <div className="alert alert-danger">{formikObj.errors.phone }</div> :""}

           <label htmlFor='details' className="form-label">Details :</label>
           <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} id='details' value={formikObj.values.details} className="form-control" type="text" aria-label="default input example"/>
           {formikObj.errors.details && formikObj.touched.details ? <div className="alert alert-danger">{formikObj.errors.details }</div> :""}

           <div onBlur={formikObj.handleBlur}    className='d-flex justify-content-end mt-3'>
               <button type='submit' id='submit'  disabled={formikObj.isValid === false || formikObj.dirty === false} className='btn btn-outline-primary w-100'>pay Now</button>
           </div>

        </form>
       </div>
        </>
    )
}
