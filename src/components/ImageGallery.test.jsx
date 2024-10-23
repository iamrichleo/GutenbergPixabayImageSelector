import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageGallery from './ImageGallery';

describe( 'ImageGallery', () => {
	const fetchedImages = [
		{
			id: 1,
			webformatURL: 'https://example.com/image1.jpg',
			tags: 'image 1',
		},
		{
			id: 2,
			webformatURL: 'https://example.com/image2.jpg',
			tags: 'image 2',
		},
	];

	const handleImageSelect = jest.fn();

	it( 'renders the correct number of images', () => {
		const { getAllByRole } = render(
			<ImageGallery
				fetchedImages={ fetchedImages }
				handleImageSelect={ handleImageSelect }
			/>
		);

		const imageButtons = getAllByRole( 'button' );
		expect( imageButtons ).toHaveLength( fetchedImages.length );
	} );

	it( 'calls handleImageSelect with the correct URL when an image is clicked', () => {
		const { getByLabelText } = render(
			<ImageGallery
				fetchedImages={ fetchedImages }
				handleImageSelect={ handleImageSelect }
			/>
		);

		const firstImageButton = getByLabelText( 'Select image image 1' );
		fireEvent.click( firstImageButton );

		expect( handleImageSelect ).toHaveBeenCalledWith(
			'https://example.com/image1.jpg'
		);
	} );

	it( 'displays the correct alt text for each image', () => {
		const { getByAltText } = render(
			<ImageGallery
				fetchedImages={ fetchedImages }
				handleImageSelect={ handleImageSelect }
			/>
		);

		const firstImage = getByAltText( 'image 1' );
		const secondImage = getByAltText( 'image 2' );

		expect( firstImage ).toBeInTheDocument();
		expect( secondImage ).toBeInTheDocument();
	} );
} );
