declare module '@deck.gl/extensions/data-filter/data-filter' {
	import { LayerExtension } from '@deck.gl/core';
	export default class DataFilterExtension extends LayerExtension {
		constructor({filterSize = 1} = {})
		getShaders(extension: any): any
		initializeState(context: any, extension:any): any
	}
}

declare module '@deck.gl/extensions' {
	export { default as DataFilterExtension } from '@deck.gl/extensions/data-filter/data-filter';
}