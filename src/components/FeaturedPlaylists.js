import React from 'react'
import Slider from 'react-animated-slider';
import { View, Mask } from 'mdbreact'
import 'react-animated-slider/build/horizontal.css';

const FeaturedPlaylists = props => {

    const { featuredPlaylists } = props
    return (
        <div>
        <h3 className='header'>Featured Playlists</h3>
        <Slider>
            {featuredPlaylists.map(playlist => <div key={playlist.id}>
                    <View zoom>
                        <img src={playlist.images[0].url} className="img-fluid" alt="" align='center'/>
                        <Mask className="flex-center">
                            <p className="white-text">Zoom effect</p>
                        </Mask>
                    </View>
            </div>)}
        </Slider>
        </div>
    )
}

export default FeaturedPlaylists




