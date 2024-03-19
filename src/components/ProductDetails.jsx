import axios from 'axios'
import React, { useContext } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { cartContext } from './CartContext'
import { wishlistContext } from './WishlistContext'

export function ProductDetails() {

    const {addProductToCart} = useContext(cartContext)
    const {addProductToWishlist} = useContext(wishlistContext)

    const { id } = useParams()

   async function addProduct(id){

      const res = await addProductToCart(id)
    
      if(res.status ==='success'){

        toast.success(res.message,{
        
            position:'top-right'

        })
    }   
    }

    async function wishProduct(id){

        const res = await addProductToWishlist(id)
        
        if(res.status ==='success'){
            toast.success(res.message,{
        
                position:'top-right'

            })
        }
    }

    function getProductDetails( ){
        return axios.get( `https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
   const {data , isLoading} = useQuery("productDetails", getProductDetails)

   if(isLoading){
    return <div className=" vh-100 d-flex align-items-center justify-content-center">
    <ColorRing
    visible={true}
    hight='80'
    width='80'
    arialLabel='blocks-loading'
    wrapperStyle={{}}
    wrapperClass='blocks-wrapper'
    colors={['#e15b64','#f47e60','#f8b26a','#abbd81','#849b87']}
    />
</div> 
}
    

    return (
        <>

        <div className="container py-5">
            <div className="row py-5 align-items-center">
                <div className="col-md-4">

                        <figure>
                            <img className='w-100' src={data.data.data.imageCover} alt={data.data.data.title} />
                        </figure>
                </div>
                <div className="col-md-8">

                    <div className="details">
                    <h1>{data.data.data.title}</h1>
                    <p>{data.data.data.description}</p>
                    <div className="d-flex justify-content-between py-3">
                        <p>{data.data.data.price} EGP</p>
                        <p> <span><i className='fa-solid fa-star text-warning'></i> </span> {data.data.data.ratingsAverage} </p>

                    </div>
                    <div className='d-flex justify-content-around py-3'>
                    <button onClick={()=> addProduct(data.data.data.id)} className='btn btn-outline-success w-75 border-white'> + Add</button>
                    <Link onClick={()=> wishProduct(data.data.data.id)}><i className="pointer fa-solid fa-heart d-flex justify-content-end fs-3"></i></Link>

                    </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
