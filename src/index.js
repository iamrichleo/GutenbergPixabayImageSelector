import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';

import EditComponent from './edit';
import SaveComponent from './save';

registerBlockType( 'pixabay/image-selector', {
	edit: EditComponent,
	save: SaveComponent,
} );
