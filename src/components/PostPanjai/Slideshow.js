import React from 'react';
import SlideShow from 'react-image-show';

const Slideshow = (props) => {

    console.log(props);
    return (
        <div>
            <img src={'http://localhost:3001/image/' + props} />
            <SlideShow 
                images={props.data}
                width="920px"
                imagesWidth="800px"
                imagesHeight="450px"
                imagesHeightMobile="56vw"
                thumbnailsWidth="920px"
                thumbnailsHeight="12vw"
                indicators thumbnails fixedImagesHeight
            />
        </div>
    )
}

export default Slideshow



