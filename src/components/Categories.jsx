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
    }} openOnHover="true" title= "Categories">

          {categories?.map(((category) => {
            
          return <>
            <Dropdown.Item > 
              <Link  role="button" to={`productsByCategory/${category._id}`}>
               {category?.name}
              </Link >
               {category.subCategory?.map((sub)=>{
                 return <>
                 <Dropdown.Submenu position="right">
                <Link role="button" to={`productsBySubCategory/${sub._id}`}>
                {sub.name}
                </Link>
                </Dropdown.Submenu>
                 </>
               })}
            </Dropdown.Item>
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
