import axios from 'axios';
import React from 'react'
import { ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';

export function Brands() {

    function getAllBrands(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/brands')


    
    }
    const { isLoading, data} = useQuery('allBrands', getAllBrands)
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
        <h1 className='text-success text-center py-5'>All Brands</h1>

            <div className="row gy-4 ">

            {data?.data.data.map( function( product, idx){
                    return  <div key={idx} className="col-md-3 ">
                    <div  className="product border">
                        <img style={{height:'200px'}} src={product.image} className="w-100" alt={product.name} />
                        <h5 className=' text-center py-3'>{product.name}</h5>
                    </div>
                </div>})}
               
            </div>
        </div>
        
        </>
    )
}
