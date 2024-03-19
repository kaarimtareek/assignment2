import React, { useContext } from 'react'
import { cartContext } from './CartContext'
import { Link, useNavigate } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'
import { toast } from 'react-hot-toast';

export function Cart() {
    
    
    const{cartProducts, clearCart, totalCartPrice, numOfCartItems , deleteCartItem, updateCartItem}= useContext(cartContext)
    const navigate = useNavigate();
    if(cartProducts === null){

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
        </div>;
    };

    if (    cartProducts.length === 0) {

        return<>
        <div className='bg-light container py-5'>

            <h1 className='pt-5'>Cart Shop</h1>
            <h3>your cart is empty</h3>
        </div>
        </>
        
    }

    async function clearCartItems(){
       await clearCart();

        
                 
        setTimeout(function(){
            navigate('/home')
        },1000)

      };

    async function updateElement(id, count){

        const res = await updateCartItem(id, count);

        if (res.status === "success") {
  
          toast.success('Updated Successfully')
          
        }
        else{
          toast.error('Error occurred')
  
        }
    };


    async function deleteItem(id){
      const res = await deleteCartItem(id);
      if (res.status === "success") {

        toast.success('product Removed Successfully')
        
      }
      else{
        toast.error('Error occurred')

      }
    };


    return (
        <>

        <div className="container pt-5 bg-light">
            <div className="row pt-5">
                <div className='d-flex align-items-center justify-content-between pt-5'>
                <div >
                    <h2>Cart Shop</h2>
                    <h5 className='text-success py-2'>Total Price:  {totalCartPrice} </h5>
                </div>
                <div >
                    <Link to='/checkout' className='btn btn-primary  '> Check Out</Link>
                    <h5 className='text-success py-3'>Total Number of Items:  {numOfCartItems} </h5>
                    
                </div> 
                </div>

                {cartProducts?.map(function(product , idx){
                    
                    return <div key={idx} className="row border-bottom border-3  p-2">
                    <div  className='d-flex justify-content-between'>
                        <div className=' d-flex align-items-center'>
                            <img className='w-25' src={product.product.imageCover} alt={product.product.title} />
                            <div className='px-4' >
                                <h4>{product.product.title.split(' ').slice(0-2).join(' ')}</h4>
                                <h6>{product.price} EGP</h6>
                                <Link onClick={ ()=> deleteItem(product.product.id)} className='text-danger'> <i className="fa-solid fa-trash-can "></i> Remove </Link>

                            </div>

                        </div>

                        <div className='d-flex align-items-center'>

                            <button onClick={ ()=> updateElement    (product.product.id, product.count + 1)} className='btn btn-outline-success px-2 mx-2'> + </button>
                            <h6 className='px-2'>{product.count}</h6>
                            <button onClick={ ()=> updateElement    (product.product.id, product.count - 1)} className='btn btn-outline-success px-2 mx-2'> - </button>

                        </div>


                    </div>

                    
                </div>})}

                <button onClick={clearCartItems} className='btn btn-outline-success m-auto w-25 my-5' > Clear Cart</button>


               

            </div>
        </div>
         
            
        </>
    )
}
