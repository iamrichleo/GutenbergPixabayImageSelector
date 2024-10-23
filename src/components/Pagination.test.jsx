import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';
import { __ } from '@wordpress/i18n';

describe( 'Pagination', () => {
	const handlePrevPage = jest.fn();
	const handleNextPage = jest.fn();

	it( 'renders the current page number', () => {
		const { getByText } = render(
			<Pagination
				currentPage={ 2 }
				handlePrevPage={ handlePrevPage }
				handleNextPage={ handleNextPage }
			/>
		);

		const pageText = getByText( /Page:/ );
		expect( pageText ).toBeInTheDocument();
		expect( pageText ).toHaveTextContent( 'Page: 2' );
	} );

	it( 'disables the Previous button on the first page', () => {
		const { getByText } = render(
			<Pagination
				currentPage={ 1 }
				handlePrevPage={ handlePrevPage }
				handleNextPage={ handleNextPage }
			/>
		);

		const prevButton = getByText(
			__( 'Previous', 'pixabay-image-selector' )
		);
		expect( prevButton ).toBeDisabled();
	} );

	it( 'does not disable the Previous button on other pages', () => {
		const { getByText } = render(
			<Pagination
				currentPage={ 2 }
				handlePrevPage={ handlePrevPage }
				handleNextPage={ handleNextPage }
			/>
		);

		const prevButton = getByText(
			__( 'Previous', 'pixabay-image-selector' )
		);
		expect( prevButton ).not.toBeDisabled();
	} );

	it( 'calls handlePrevPage when Previous button is clicked', () => {
		const { getByText } = render(
			<Pagination
				currentPage={ 2 }
				handlePrevPage={ handlePrevPage }
				handleNextPage={ handleNextPage }
			/>
		);

		const prevButton = getByText(
			__( 'Previous', 'pixabay-image-selector' )
		);
		fireEvent.click( prevButton );

		expect( handlePrevPage ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'calls handleNextPage when Next button is clicked', () => {
		const { getByText } = render(
			<Pagination
				currentPage={ 2 }
				handlePrevPage={ handlePrevPage }
				handleNextPage={ handleNextPage }
			/>
		);

		const nextButton = getByText( __( 'Next', 'pixabay-image-selector' ) );
		fireEvent.click( nextButton );

		expect( handleNextPage ).toHaveBeenCalledTimes( 1 );
	} );
} );
