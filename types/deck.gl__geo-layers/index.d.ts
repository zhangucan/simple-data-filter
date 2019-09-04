declare module '@deck.gl/geo-layers/tile-layer/tile-layer' {
	import { Layer } from '@deck.gl/core';
  export default class TripsLayer extends Layer {
		constructor(props: any);
		getShaders(): {
			vs: string;
			fs: string;
			modules: string[];
		};
		initializeState(): void;
		updateState({ props, oldProps, changeFlags }: {
			props: any;
			oldProps: any;
			changeFlags: any;
		}): void;
		_getModel(gl: any): any;
		calculateInstancePositions(attribute: any): void;
		calculateInstancePositions64Low(attribute: any): void;
  }
}
declare module '@deck.gl/geo-layers' {
  export { default as TripsLayer } from '@deck.gl/geo-layers/tile-layer/tile-layer';
}
