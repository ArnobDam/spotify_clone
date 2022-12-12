import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import csrfFetch from "../../store/csrf";

function AlbumListItem({ album, isHighlighted, setHighlightedBench }) {
    const { title, albumPhotoUrl, artistId } = album;
    const history = useHistory(); 

    const [artistName, setArtistName] = useState("");

    useEffect(() => {
        csrfFetch(`/api/artists/${artistId}`)
        .then(res => res.json())
        .then(data => setArtistName(data.name))
    },[artistId])


    return (
        
        <div>
            <div className="list-item-info">
                <img className="albumPhoto" 
                src={`https://symphonify-dev.s3.amazonaws.com/48fqqfpepeixxxfyn7i4h1xqdyrg`} 
                alt='Album'/>
                <p className="albumTitle">{title}</p>
                {/* <p>{artistId.name}</p> */}
                <p className="artistName">{artistName}</p>
            </div>
        </div>
    )
};

export default AlbumListItem;