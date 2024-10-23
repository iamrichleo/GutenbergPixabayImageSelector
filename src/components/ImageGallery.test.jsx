import { render, screen, fireEvent } from '@testing-library/react';
import ImageGallery from './ImageGallery'; // Adjust the import path if needed

describe( 'ImageGallery', () => {
	const mockHandleImageSelect = jest.fn(); // Mock function for handling image selection
	const fetchedImages = [
		{ id: 1, webformatURL: 'image1.jpg', tags: 'Image 1' },
		{ id: 2, webformatURL: 'image2.jpg', tags: 'Image 2' },
	];

	beforeEach( () => {
		render(
			<ImageGallery
				fetchedImages={ fetchedImages }
				handleImageSelect={ mockHandleImageSelect }
			/>
		);
	} );

	it( 'renders the correct number of images', () => {
		const images = screen.getAllByRole( 'img' ); // Select all image elements
		expect( images ).toHaveLength( fetchedImages.length ); // Expect number of images to match fetchedImages
	} );

	it( 'displays images with correct src and alt attributes', () => {
		const images = screen.getAllByRole( 'img' );
		images.forEach( ( img, index ) => {
			expect( img ).toHaveAttribute(
				'src',
				fetchedImages[ index ].webformatURL
			); // Check src
			expect( img ).toHaveAttribute( 'alt', fetchedImages[ index ].tags ); // Check alt text
		} );
	} );

	it( 'calls handleImageSelect when an image is clicked', () => {
		const firstImage = screen.getByAltText( 'Image 1' ); // Get the first image by its alt text
		fireEvent.click( firstImage ); // Simulate a click on the first image
		expect( mockHandleImageSelect ).toHaveBeenCalledWith(
			fetchedImages[ 0 ].webformatURL
		); // Check if mock function was called with the correct URL
	} );
} );
