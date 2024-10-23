import { __ } from '@wordpress/i18n';

const Pagination = ( { currentPage, handlePrevPage, handleNextPage } ) => {
	return (
		<div className="pagination">
			<button onClick={ handlePrevPage } disabled={ currentPage === 1 }>
				{ __( 'Previous', 'pixabay-image-selector' ) }
			</button>
			<span>
				{ __( 'Page:', 'pixabay-image-selector' ) } { currentPage }
			</span>
			<button onClick={ handleNextPage }>
				{ __( 'Next', 'pixabay-image-selector' ) }
			</button>
		</div>
	);
};

export default Pagination;
