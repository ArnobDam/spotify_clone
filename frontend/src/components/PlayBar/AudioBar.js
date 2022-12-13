import { useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAlbum, fetchAlbums } from '../../store/albums';
import { makeCurrentPlaylist } from '../../store/currentPlaylist';
import './PlayBar.css';

// const AudioPlayer = window.ReactH5AudioPlayer.default;


const playlist = [
    { src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/ziyounvshen.mp3' },
    { src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3' },
    { src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/suipian.mp3' },
]


const AudioBar = ({ trackUrl , autoPlayBool }) => {

    const dispatch = useDispatch();
    const { albumId } = useParams();


    // const [currentPlaylistObj, setCurrentPlaylistObj] = useState({});
    const currentTrackId = useSelector((state) => state.currentTrack)
    
    const [currentPlaylistArr, setCurrentPlaylistArr] = useState([])

    const currentPlaylistSliceOfState = useSelector((state) => JSON.stringify(state.currentPlaylist) !== '{}' ? state.currentPlaylist : null)
    // console.log(currentPlaylistSliceOfState)

    // const handleOnPlay = (e) => {
    //     // debugger
    //     dispatch(makeCurrentPlaylist(albumId))
    //         .then(res => setCurrentPlaylistObj(res.album.songs))
    //     // console.log(currentPlaylistObj)
        
    //     // console.log(currentPlaylistArr)
    // }

    useEffect(() => {
        if (currentPlaylistSliceOfState) {
            // console.log(currentPlaylistSliceOfState)
            for (const [key, value] of Object.entries(currentPlaylistSliceOfState[1].album.songs)) { //!!!
                if (!currentPlaylistArr.includes(value.songUrl)) {
                    setCurrentPlaylistArr((currentPlaylistArr) => [...currentPlaylistArr, value.songUrl]) //later maybe get song name too
                    // console.log(value.songUrl)
                }
            }
        }
        
    }, [currentPlaylistSliceOfState])
    

    // console.log(currentPlaylistObj)
    // console.log(currentPlaylistArr)
    
    console.log(currentTrackId)
    const [currentTrack, setTrackIndex] = useState(0);

    useEffect(() => {
        setTrackIndex(currentTrackId)
    }, [currentTrackId]);

    const handleClickNext = () => {
        setTrackIndex((currentTrack) =>
            currentTrack < currentPlaylistArr.length - 1 ? currentTrack + 1 : 0
        );
    };

    const handleClickPrevious = () => {
        setTrackIndex((currentTrack) =>
            currentTrack > 0 ? currentTrack - 1 : currentPlaylistArr.length - 1
        );
    };
  
    const handleEnd = () => {
        setTrackIndex((currentTrack) =>
            currentTrack < currentPlaylistArr.length - 1 ? currentTrack + 1 : 0
        );
    }

    return (
    // <AudioPlayer
    //     className='bar'
    //     // autoPlay
    //     showSkipControls
    //     showFilledVolume
    //     src="https://download.samplelib.com/mp3/sample-12s.mp3"
    //     // src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
    //     onPlay={e => console.log("onPlay")}

    //     // other props here
    // />
    <AudioPlayer
        className='bar'
        autoPlay
        // autoPlay={autoPlayBool ? false : autoPlayBool}
        showSkipControls
        // src={playlist[currentTrack].src}
        src={currentPlaylistArr[currentTrack]}
        // src={trackUrl}
        // src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
        // onPlay={handleOnPlay}
        onClickNext={handleClickNext}
        onClickPrevious={handleClickPrevious}
        onEnded={handleEnd}
        showFilledVolume
        // customAdditionalControls={["LOOP"]}
        customAdditionalControls={[]}
        // other props here
    />
    )
};

export default AudioBar;