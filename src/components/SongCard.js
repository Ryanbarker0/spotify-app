import React from 'react' 

const SongCard = props => {

    const { songName, artistName, image} = props

    return (
        <div className='song-container'>
        <div className="card">
            <div className='cardimage-container' align='center'>
                <img className="activator" src={image} style={{ width: 200 }} />
            </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">{songName}</span>
                    <br />
                    <span className="card-title activator grey-text text-darken-4">{artistName}</span>
                </div>
            </div>
        </div>
    )
}

export default SongCard