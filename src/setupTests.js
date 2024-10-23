import '@testing-library/jest-dom';

jest.mock( '@wordpress/block-editor', () => ( {
	useBlockProps: jest.fn( () => ( {
		save: jest.fn().mockReturnValue( {
			className: 'wp-block-pixabay-image-selector',
		} ),
	} ) ),
} ) );

jest.mock( '@wordpress/i18n', () => ( {
	__: jest.fn( ( text ) => text ),
} ) );
