const ImageGallery = ( { fetchedImages, handleImageSelect } ) => {
	return (
		<div className="image-gallery">
			{ fetchedImages.map( ( image ) => (
				<button
					key={ image.id }
					className="image-item"
					onClick={ () => handleImageSelect( image.webformatURL ) }
					aria-label={ `Select image ${ image.tags }` }
				>
					<img src={ image.webformatURL } alt={ image.tags } />
				</button>
			) ) }
		</div>
	);
};

export default ImageGallery;
