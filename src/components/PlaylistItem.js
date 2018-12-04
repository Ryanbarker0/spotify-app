import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import GridListTile from '@material-ui/core/GridListTile';


const PlaylistItem = props => {

    const { classes, playlist } = props

return (
<GridListTile key={playlist.id}>
    <img src={playlist.images[0]} alt={playlist.name} />
    <GridListTileBar
        title={playlist.name}
        subtitle={<span>{playlist.tracks.length} Tracks</span>}
        actionIcon={
            <IconButton className={classes.icon}>
                <InfoIcon />
            </IconButton>
        }
    />
     </GridListTile>
)
    }

    export default PlaylistItem