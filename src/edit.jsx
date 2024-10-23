import { useState } from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import usePixabayAPI from './hooks/usePixabayAPI';
import ImageSearch from './components/ImageSearch';
import ImageGallery from './components/ImageGallery';
import Pagination from './components/Pagination';
import SelectedImage from './components/SelectedImage';

const EditComponent = ( { attributes, setAttributes } ) => {
	const [ selectedImage, setSelectedImage ] = useState(
		attributes.selectedImage || ''
	);
	const [ searchTerm, setSearchTerm ] = useState( 'nature' );
	const [ currentPage, setCurrentPage ] = useState( 1 );

	const { fetchedImages, loading, error } = usePixabayAPI(
		searchTerm,
		currentPage
	);

	const handleImageSelect = ( imageUrl ) => {
		setSelectedImage( imageUrl );
		setAttributes( { selectedImage: imageUrl } );
	};

	const handleSearchChange = ( event ) => {
		setSearchTerm( event.target.value );
		setCurrentPage( 1 ); // Reset to the first page on new search
	};

	const handleNextPage = () => {
		setCurrentPage( ( prevPage ) => prevPage + 1 );
	};

	const handlePrevPage = () => {
		setCurrentPage( ( prevPage ) => Math.max( prevPage - 1, 1 ) );
	};

	return (
		<div { ...useBlockProps() }>
			<h3>{ __( 'Select an Image:', 'pixabay-image-selector' ) }</h3>
			<ImageSearch
				searchTerm={ searchTerm }
				handleSearchChange={ handleSearchChange }
			/>
			{ loading && (
				<p>{ __( 'Loading images…', 'pixabay-image-selector' ) }</p>
			) }
			{ error && <p>{ error }</p> }
			{ ! loading && ! error && (
				<ImageGallery
					fetchedImages={ fetchedImages }
					handleImageSelect={ handleImageSelect }
				/>
			) }
			<Pagination
				currentPage={ currentPage }
				handlePrevPage={ handlePrevPage }
				handleNextPage={ handleNextPage }
			/>
			{ selectedImage && (
				<SelectedImage selectedImage={ selectedImage } />
			) }
		</div>
	);
};

export default EditComponent;
