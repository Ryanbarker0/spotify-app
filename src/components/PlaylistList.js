import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

function PlaylistList(props) {

    const { classes, playlists, viewPlaylist } = props;

    return (
        <div className='playlist-container'>
        <div className='card'>
        <div className={classes.root} style={{padding: 20}}>
            <GridList cellHeight={180} className={classes.gridList}>

                {playlists.map(playlist => (
                    <GridListTile key={playlist.uri}>
                        <img src={playlist.images[0].url} alt={playlist.name} />
                        <GridListTileBar
                            title={playlist.name}
                            subtitle={<span>{playlist.tracks.length}</span>}
                            actionIcon={
                                <IconButton className={classes.icon} >
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
        </div>
        </div>
    );
}

PlaylistList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlaylistList);