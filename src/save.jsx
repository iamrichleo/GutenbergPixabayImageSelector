import React from 'react';
import { useBlockProps } from '@wordpress/block-editor';

const SaveComponent = ( { attributes } ) => {
	return (
		<div
			{ ...useBlockProps.save() }
			className="wp-block-pixabay-image-selector"
		>
			{ attributes.selectedImage && (
				<div className="image-container">
					<img src={ attributes.selectedImage } alt="Selected" />
				</div>
			) }
		</div>
	);
};

export default SaveComponent;
