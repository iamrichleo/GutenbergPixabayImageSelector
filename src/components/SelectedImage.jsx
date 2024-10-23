import React from 'react';
import { __ } from '@wordpress/i18n';

const SelectedImage = ( { selectedImage } ) => {
	return (
		<div>
			<h4>{ __( 'Selected Image:', 'pixabay-image-selector' ) }</h4>
			<img
				src={ selectedImage }
				alt="Selected"
				style={ { width: '100%', height: 'auto' } }
			/>
		</div>
	);
};

export default SelectedImage;
