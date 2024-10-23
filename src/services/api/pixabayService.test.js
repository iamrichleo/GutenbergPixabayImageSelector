import { searchPixabayImages } from './pixabayService';
import fetchRequest from './fetchRequest';

jest.mock( './fetchRequest' );

describe( 'searchPixabayImages', () => {
	const PIXABAY_API_KEY = '45979271-945d910b95e96769c55111ae5';

	it( 'should construct the correct URL and fetch images', async () => {
		const mockResponse = {
			hits: [ { id: 1, webformatURL: 'https://example.com/image1.jpg' } ],
		};
		fetchRequest.mockResolvedValueOnce( mockResponse );

		const query = 'cats';
		const page = 1;
		const imagesPerPage = 20;

		const response = await searchPixabayImages(
			query,
			page,
			imagesPerPage
		);

		const expectedUrl = `https://pixabay.com/api/?key=${ PIXABAY_API_KEY }&q=${ encodeURIComponent(
			query
		) }&page=${ page }&per_page=${ imagesPerPage }`;

		expect( fetchRequest ).toHaveBeenCalledWith( expectedUrl, {
			method: 'GET',
			responseType: 'json',
		} );
		expect( response ).toEqual( mockResponse );
	} );

	it( 'should throw an error if fetchRequest fails', async () => {
		fetchRequest.mockRejectedValueOnce(
			new Error( 'Failed to fetch images' )
		);

		await expect( searchPixabayImages( 'cats' ) ).rejects.toThrow(
			'Failed to fetch images'
		);
	} );
} );
