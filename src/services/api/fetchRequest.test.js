import fetchRequest from './fetchRequest';

describe( 'fetchRequest', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'should make a GET request and return JSON data', async () => {
		global.fetch = jest.fn( () =>
			Promise.resolve( {
				ok: true,
				json: () => Promise.resolve( { message: 'Success' } ),
			} )
		);

		const data = await fetchRequest( 'https://api.example.com/data' );

		expect( fetch ).toHaveBeenCalledWith( 'https://api.example.com/data', {
			method: 'GET',
			headers: {},
			body: undefined,
		} );
		expect( data ).toEqual( { message: 'Success' } );
	} );

	it( 'should handle a non-200 response', async () => {
		global.fetch = jest.fn( () =>
			Promise.resolve( {
				ok: false,
				status: 404,
				statusText: 'Not Found',
			} )
		);

		await expect(
			fetchRequest( 'https://api.example.com/data' )
		).rejects.toThrow( 'HTTP error! Status: 404 - Not Found' );
	} );

	it( 'should make a POST request with JSON body', async () => {
		const mockResponse = { message: 'Created' };
		global.fetch = jest.fn( () =>
			Promise.resolve( {
				ok: true,
				json: () => Promise.resolve( mockResponse ),
			} )
		);

		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: { name: 'New Item' },
		};

		const data = await fetchRequest(
			'https://api.example.com/data',
			options
		);

		expect( fetch ).toHaveBeenCalledWith( 'https://api.example.com/data', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( options.body ),
		} );
		expect( data ).toEqual( mockResponse );
	} );

	it( 'should throw an error for unsupported response types', async () => {
		await expect(
			fetchRequest( 'https://api.example.com/data', {
				responseType: 'unsupported',
			} )
		).rejects.toThrow( 'Unsupported response type' );
	} );

	it( 'should handle network errors', async () => {
		global.fetch = jest.fn( () =>
			Promise.reject( new Error( 'Network Error' ) )
		);

		await expect(
			fetchRequest( 'https://api.example.com/data' )
		).rejects.toThrow( 'Network Error' );
	} );
} );
