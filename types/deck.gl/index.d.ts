/// <reference path="../deck.gl__core/index.d.ts" />
/// <reference path="../deck.gl__layers/index.d.ts" />
/// <reference path="../deck.gl__geo-layers/index.d.ts" />
/// <reference path="../deck.gl__react/index.d.ts" />
/// <reference path="../deck.gl__extensions/index.d.ts" />

declare module 'deck.gl' {
	export { experimental } from '@deck.gl/core';
	export {
		// CONSTANTS
		COORDINATE_SYSTEM,
		// Main class
		Deck,
		// Base Layers
		Layer,
		CompositeLayer,
		// Views
		View,
		MapView,
		FirstPersonView,
		ThirdPersonView,
		OrbitView,
		PerspectiveView,
		OrthographicView,
		// Viewports
		Viewport,
		WebMercatorViewport,
		// Controllers
		Controller,
		MapController,
		// For custom layers
		AttributeManager,
		// Shader modules
		project,
		project64,
		lighting,
		// Internal classes
		LayerManager,
		// Logging
		log,
		// Controllers
		_OrbitController,
		_FirstPersonController,
		// Transition bindings
		TRANSITION_EVENTS,
		LinearInterpolator,
		FlyToInterpolator,
		// Effects
		LightingEffect,
		_EffectManager,
		_Effect,
		_ReflectionEffect
	} from '@deck.gl/core';
	export {
		ArcLayer,
		IconLayer,
		LineLayer,
		PointCloudLayer,
		ScatterplotLayer,
		ScreenGridLayer,
		GridLayer,
		GridCellLayer,
		HexagonLayer,
		HexagonCellLayer,
		PathLayer,
		PolygonLayer,
		GeoJsonLayer,
    TextLayer,
    LineLayerDatum,
	} from '@deck.gl/layers';
	export {
		DataFilterExtension
	} from '@deck.gl/extensions';
  export { default, DeckGL } from '@deck.gl/react';
  export { TripsLayer } from '@deck.gl/geo-layers';
}
