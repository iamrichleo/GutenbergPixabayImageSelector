import { __ } from '@wordpress/i18n';
import React from 'react';

const ImageSearch = ( { searchTerm, handleSearchChange } ) => {
	return (
		<div>
			<input
				type="text"
				value={ searchTerm }
				onChange={ handleSearchChange }
				placeholder={ __(
					'Search for images…',
					'pixabay-image-selector'
				) }
				style={ {
					marginBottom: '10px',
					width: '100%',
					padding: '8px',
				} }
			/>
		</div>
	);
};

export default ImageSearch;
