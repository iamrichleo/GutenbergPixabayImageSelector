import { useState, useEffect } from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import { searchPixabayImages } from '../services/api/pixabayService';

const usePixabayAPI = ( searchTerm, currentPage ) => {
	const [ fetchedImages, setFetchedImages ] = useState( [] );
	const [ loading, setLoading ] = useState( false );
	const [ error, setError ] = useState( null );

	useEffect( () => {
		const fetchImages = async () => {
			if ( ! searchTerm ) {
				return;
			}

			setLoading( true );
			setError( null );
			try {
				const images = await searchPixabayImages(
					searchTerm,
					currentPage
				);
				setFetchedImages( images.hits );
			} catch ( err ) {
				setError( 'Failed to fetch images.' );
			} finally {
				setLoading( false );
			}
		};

		fetchImages();
	}, [ searchTerm, currentPage ] );

	return { fetchedImages, loading, error };
};

export default usePixabayAPI;
