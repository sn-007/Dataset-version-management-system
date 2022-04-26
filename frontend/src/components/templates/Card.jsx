import React from 'react'
import './card.css'
import { useNavigate } from 'react-router';




const trim = (str, maxLength) => {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '........';
    } else {
        return str;
    }
}


export default function Card({info}) {
    const navigate= useNavigate();
    return (
        
        <div className='card-container' onClick={()=>{navigate('/'+info.id)}}>


            <div className='card-content'>
                <div className="card-title">
                    <h3>{info.name}</h3>
                </div>

                <div className="card-body">
                    <p>{trim(info.description,200)}</p>
                </div>

            </div>

            <div className="btn">
                <button>
                    <a>
                        VIEW MORE
                    </a>
                </button>
            </div>

        </div>
        
    )
}
