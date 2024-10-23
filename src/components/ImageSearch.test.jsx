import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageSearch from './ImageSearch';
import { __ } from '@wordpress/i18n';

describe( 'ImageSearch', () => {
	const handleSearchChange = jest.fn();
	const searchTerm = '';

	it( 'renders the input field with the correct placeholder', () => {
		const { getByPlaceholderText } = render(
			<ImageSearch
				searchTerm={ searchTerm }
				handleSearchChange={ handleSearchChange }
			/>
		);

		const input = getByPlaceholderText(
			__( 'Search for images…', 'pixabay-image-selector' )
		);
		expect( input ).toBeInTheDocument();
	} );

	it( 'displays the correct initial search term', () => {
		const { getByDisplayValue } = render(
			<ImageSearch
				searchTerm="test"
				handleSearchChange={ handleSearchChange }
			/>
		);

		const input = getByDisplayValue( 'test' );
		expect( input ).toBeInTheDocument();
	} );

	it( 'calls handleSearchChange when input changes', () => {
		const { getByPlaceholderText } = render(
			<ImageSearch
				searchTerm={ searchTerm }
				handleSearchChange={ handleSearchChange }
			/>
		);

		const input = getByPlaceholderText(
			__( 'Search for images…', 'pixabay-image-selector' )
		);
		fireEvent.change( input, { target: { value: 'new search term' } } );

		expect( handleSearchChange ).toHaveBeenCalledTimes( 1 );
		expect( handleSearchChange ).toHaveBeenCalledWith(
			expect.any( Object )
		);
	} );
} );
