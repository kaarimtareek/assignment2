import axios from 'axios';
import React, { useContext } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { cartContext } from './CartContext';
import { wishlistContext } from './WishlistContext';

export function Products() {


    const {addProductToCart}= useContext( cartContext)
    const {addProductToWishlist} = useContext(wishlistContext)

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

    function getAllProducts(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')

    }
    const { isLoading, data} = useQuery('allProducts', getAllProducts)
        
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
            <div className="row gy-4">

            <input type="text" id='search' className="form-control mt-5" placeholder='search' />


            {data?.data.data.map( function( product, idx){
                    return  <div key={idx} className="col-md-3">
                    <div  className="product px-3">
                        <Link to={`/productDetailes/${product.id}`}>
                        <img src={product.imageCover} className="w-100" alt={product.title} />
                        <h6 className='text-success'>{product.category.name}</h6>
                        <h5 className='py-3'>{product.title.split(' ').slice(0-2).join(' ')}</h5>
                        <div className="d-flex justify-content-between ">
                            <p>{product.price} EGP</p>
                            <p> <span><i className='fa-solid fa-star text-warning'></i></span>{product.ratingsAverage}</p>

                        </div>
                        <Link onClick={()=> wishProduct(product.id)}>
                          <i className="pointer fa-solid fa-heart d-flex justify-content-end fs-3"></i>
                        </Link>
                        </Link>
                        <button onClick={()=> addProduct(product.id)} className='btn btn-success mb-2'> + Add</button>

                    </div>
                </div>})}
               
            </div>
        </div>

        
        


            
        </>
    )
}
