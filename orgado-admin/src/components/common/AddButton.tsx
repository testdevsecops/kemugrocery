"use client"
import { useRouter } from 'next/navigation';
import React from 'react';


interface propsType{
    title:string;
    link:string;
}

const AddButton = ({title, link}:propsType) => {
    const router = useRouter()

    const handleNaviget = () =>{
            router.push(`/${link}`)
    }
    return (
        <>
            <div className="cashier-managesale-top-btn default-light-theme m-7">
              <button className="btn-primary mb-1" onClick={handleNaviget}>
                <i className="fa-light fa-plus"></i> {title}
              </button>
             
            </div>
        </>
    );
};

export default AddButton;