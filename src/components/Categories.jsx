import React from "react";
import { Link } from "react-router-dom";
import { Subcategories } from "./Subcategories";
import Dropdown from "react-multilevel-dropdown";


export function Categories(props) {
  const { categories } = props;
  console.log(categories);
  if (!categories) {
    return "Loading Categories ...";
  } else 
  {
    return  <>
      <Dropdown style={{ backgroundColor: "transparent",
    fontFamily: "Poppins",
    textTransform:"uppercase",
    letterSpacing:"0.5px",
    fontStyle:"normal",
    fontSize :"15px",
    fontWeight:"500"
    }} title= "Categories">

          {categories?.map(((category) => {
            
          return <>
              <Link  role="button" to={`productsByCategory/${category._id}`}>
            <Dropdown.Item  > 
               {category?.name
               }
               
               {  category.subCategory   ?
               
                  <Dropdown.Submenu position="right">
                      {category.subCategory?.map((sub)=>{
                      return <>
                        <Link role="button" to={`productsBySubCategory/${sub._id}`}>
                          <Dropdown.Item>
                            {sub.name}
                          </Dropdown.Item>
                        </Link>
               
                 </>
               })}
               </Dropdown.Submenu>
                 : {}}
            </Dropdown.Item>
                 </Link >
               </>
          }))}
      </Dropdown>
      
          </>
    // (
    //   <ul className="dropdown-menu">
    //     {categories?.map((category) => {
    //       return (
    //         <li key={category._id}>
    //           <ul>
    //           <li className="nav-item dropdown">
    //             <Link
    //               className="nav-link dropdown-toggle"
    //               role="button"
    //               data-bs-toggle="dropdown"
    //               aria-expanded="true"
    //             >
    //             <span>

    //              {category?.name}
    //             </span>
    //             <Subcategories subCategories={category.subCategory} />
    //             </Link>
    //           </li>
    //           </ul>
    //           {/* <Link
    //             className="dropdown-item"
    //             to={`productsByCategory/${category._id}`}
    //           >
    //             {category?.name}
    //           </Link> */}
    //         </li>
    //       );
    //     })}
    //   </ul>
    // );
  }
}
