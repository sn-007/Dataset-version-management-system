import React from 'react'
import './Versioncard.css'
import { useNavigate } from 'react-router';

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

const convertDate = (date) => {

    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return day + "/" + month + "/" + year;
}

export default function Versioncard({ info }) {
    const navigate = useNavigate();
    return (
        <div className='version-card-container' onClick={
            (e) => {
                //check if the target is a button or not
                if (e.target.tagName === "a") {
                    console.log('button clicked');

                }
                else {
                    //alert('navigated');
                }
            }

        }>

            {/* Printing Dataset's Version info */}
            <div className='version-card-content'>
                <div className="admin-title">
                    <h3 ><u>{capitalize("Version " + info.version)}</u></h3>
                </div>

                <div className="admin-body">
                    <p>{trim(info.comment, 10000)}</p>
                </div>


                <div className="version-date">
                    <p>Updated on : {convertDate(info.date)}</p>
                </div>
            </div>

            <div className="version-btn" onClick={(e) => { e.stopPropagation(); }}>

                {/* //To downlaod the Dataset Version */}
                <button className='Download'>
                    <a href={info.reference} target='_blank'>
                        Download
                    </a>
                </button>
            </div>
        </div>
    )
}
