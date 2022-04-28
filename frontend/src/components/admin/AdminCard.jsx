import React from 'react'
import { useNavigate } from 'react-router';
import './AdminCard.css'





const trim = (str, maxLength) => {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '........';
    } else {
        return str;
    }
}

//capitalize first letter of every word in a string
const capitalize = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}







export default function AdminCard({ info }) {
    const navigate = useNavigate();
    return (

        <div className='admin-container' onClick={
            (e) => {
                //check if the target is a button or not
                if (e.target.tagName === "a") {
                    console.log('button clicked');

                }
                else {
                    //alert('navigated');

                    let url = '/admincheck/' + info.id;
                    navigate(url);
                }
            }

        }>


            <div className='admin-content'>
                <div className="admin-title">
                    <h3 ><u>{capitalize(info.name)}</u></h3>
                </div>

                <div className="admin-body">
                    <p>{trim(info.description, 10000)}</p>
                </div>

            </div>

            <div className="adm-btn" onClick={(e) => { e.stopPropagation(); }}>


                <button className='source'>
                    <a href={info.source} target='_blank'>
                        SOURCE
                    </a>
                </button>





                <button className='viewmore' onClick={(e)=>{e.stopPropagation();let url = '/admincheck/' + info.id;
                    navigate(url);}}>
                    <a>
                        VIEW MORE
                    </a>
                </button>



                <button>
                    <a className='download' onClick={(e) => { e.stopPropagation();}} href={info.reference} target='_blank'>
                        DOWNLOAD
                    </a>
                </button>






            </div>

        </div>

    )
}
