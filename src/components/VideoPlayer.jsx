import React, {useRef, useEffect} from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css';
import '../forest-video-player.css';

const VideoPlayer = (props) => {
    
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const {options, onReady} = props;

    useEffect(() => {

        // Make sure Video.js player isn only initialized once
        if(!playerRef.current) {
            // The video.js player needs to be _inside_ the component el for React 18 Struct mode.
            const videoElement = document.createElement("video-js");

            videoElement.classList.add('vjs-big-play-centered');
            videoElement.classList.add('video-js');
            videoElement.classList.add('vjs-theme-forest');
            videoElement.classList.add('w-100');
            videoRef.current.appendChild(videoElement);

            const player = playerRef.current = videojs(videoElement, options, () => {
                videojs.log('Player is ready');
                onReady && onReady(player);
            });

            
        }
        else {
            const player = playerRef.current;

            player.autoplay(options.autoplay);
            player.src(options.sources);
        }

    },[options, videoRef]);

    //Dispose the video.js player when the functional component unmounts
    useEffect(() => {

        const player = playerRef.current;

        return () => {
            if(player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        }

    }, [playerRef]);

  return (
    <div data-vjs-player>
        <div ref={videoRef} />
    </div>
  )
}

export default VideoPlayer