// import spotifyLogo from "../../../../app/assets/images/spotify_white.png"
import { AiOutlineHome } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';

import { useHistory } from "react-router-dom";
import PlaylistIndexList from '../PlaylistIndexList';
import spotifyLogo from "./spotify_white.png"


const SideControlBar = () => {
    const history = useHistory();

    return (
        <nav className="sideBar">
            <div className="logoDiv" onClick={(e) => history.push(`/`)}>
                <img className="logoIcon" src={spotifyLogo} alt='logo'/>
                <p className="logoName">Symphonify</p>
            </div>
            <div className="sidebar-links">
                <div className="home-div" onClick={(e) => history.push(`/`)}>
                    <AiOutlineHome className='home-icon'/>
                    <p className="home-text">Home</p>
                </div>
                <div className="search-div" onClick={(e) => history.push(`/search`)}>
                    <FiSearch className='search-icon'/>
                    <p className="search-text">Search</p>
                </div>
            </div>
            <PlaylistIndexList className='playlist-index-list'/>
        </nav>
    )
}

export default SideControlBar;