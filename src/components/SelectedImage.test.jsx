import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectedImage from './SelectedImage';
import { __ } from '@wordpress/i18n';

describe( 'SelectedImage', () => {
	it( 'renders the correct heading', () => {
		const { getByText } = render(
			<SelectedImage selectedImage="https://example.com/image.jpg" />
		);

		const heading = getByText(
			__( 'Selected Image:', 'pixabay-image-selector' )
		);
		expect( heading ).toBeInTheDocument();
	} );

	it( 'displays the selected image', () => {
		const imageUrl = 'https://example.com/image.jpg';
		const { getByRole } = render(
			<SelectedImage selectedImage={ imageUrl } />
		);

		const img = getByRole( 'img' );
		expect( img ).toHaveAttribute( 'src', imageUrl );
		expect( img ).toHaveAttribute( 'alt', 'Selected' );
	} );

	it( 'renders the image with correct styles', () => {
		const { getByRole } = render(
			<SelectedImage selectedImage="https://example.com/image.jpg" />
		);

		const img = getByRole( 'img' );
		expect( img ).toHaveStyle( 'width: 100%;' );
		expect( img ).toHaveStyle( 'height: auto;' );
	} );
} );
