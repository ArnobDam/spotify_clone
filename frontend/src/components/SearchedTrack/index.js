import { useDispatch } from 'react-redux';
import { createPlaylistSong } from '../../store/playlistSongs';
import './SearchedTrack.css';

function SearchedTrack({ id, songTitle, artistName, playlistId }) {
    const dispatch = useDispatch();

    const handleAddSongClick = () => {
        dispatch(createPlaylistSong({
            "playlist_id": playlistId,
            "song_id": id
        }))
    }

    return (
        <div className='searched-track'>
                <div className='searched-track-text'>
                    <p className='searched-track-song-title'>{songTitle}</p>
                    <p className='searched-track-artist-name'>{artistName}</p>
                </div>
            <button className='add-song-button' onClick={handleAddSongClick}>Add</button>
        </div>
    )
};

export default SearchedTrack;