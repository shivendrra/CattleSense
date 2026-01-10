
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface MapPoint {
  lat: number;
  lng: number;
  intensity: number; // 0 to 100
  name: string;
}

const HaryanaMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Cleanup existing map if strict mode double-invokes or re-renders
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    if (mapContainerRef.current) {
      // Initialize Map centered on Haryana
      // Coordinates: 29.0588° N, 76.0856° E
      const map = L.map(mapContainerRef.current, {
        center: [29.25, 76.2], // Slightly adjusted center
        zoom: 8,
        zoomControl: false, // Custom placement or minimal UI
        attributionControl: false // Cleaner look (add attribution manually if needed)
      });

      // Google Maps Satellite Hybrid Tile Layer
      // lyrs=y (Hybrid: Satellite + Roads/Labels), lyrs=s (Satellite only), lyrs=m (Standard Road)
      L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        attribution: 'Map data &copy; Google',
      }).addTo(map);

      // Add zoom control to top-right
      L.control.zoom({
        position: 'topright'
      }).addTo(map);

      mapInstanceRef.current = map;

      // --- Simulate Heatmap Data (Randomized points in Haryana) ---
      // Haryana Bounding Box Approx: 
      // North: 30.9, South: 27.6, West: 74.5, East: 77.6
      const heatmapPoints: MapPoint[] = Array.from({ length: 60 }).map((_, i) => ({
        lat: 27.8 + Math.random() * (30.5 - 27.8),
        lng: 74.8 + Math.random() * (77.3 - 74.8),
        intensity: Math.floor(Math.random() * 100),
        name: `Cluster #${1024 + i}`
      }));

      // Render Heatmap "Bubbles"
      heatmapPoints.forEach(point => {
        let color = '#4ade80'; // Green-400
        let fillColor = '#22c55e'; // Green-500
        let radius = 2000; // Meters

        if (point.intensity > 50) {
          color = '#facc15'; // Yellow-400
          fillColor = '#eab308'; // Yellow-500
          radius = 3500;
        }
        if (point.intensity > 80) {
          color = '#f87171'; // Red-400
          fillColor = '#ef4444'; // Red-500
          radius = 5000;
        }

        const circle = L.circle([point.lat, point.lng], {
          color: color,
          weight: 1,
          fillColor: fillColor,
          fillOpacity: 0.5,
          radius: radius
        }).addTo(map);

        circle.bindPopup(`
          <div class="p-2 min-w-[120px] text-center font-sans">
            <h4 class="font-bold text-darkBlue text-sm mb-1">${point.name}</h4>
            <div class="flex items-center justify-center gap-2">
                <span class="text-xs font-semibold text-gray-500">AMU Level:</span>
                <span class="text-xs font-bold ${point.intensity > 80 ? 'text-red-600' : point.intensity > 50 ? 'text-yellow-600' : 'text-green-600'}">${point.intensity}%</span>
            </div>
            <p class="text-[10px] text-gray-400 mt-1">Updated: 2h ago</p>
          </div>
        `);
      });

      // Invalidate size to ensure tiles load correctly after render
      setTimeout(() => {
        map.invalidateSize();
      }, 200);

      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    }
  }, []);

  return (
    <div className="relative w-full h-[500px] bg-gray-900 rounded-sm border border-gray-200 overflow-hidden shadow-inner">
      <div ref={mapContainerRef} className="w-full h-full z-0" style={{ zIndex: 0 }} />

      {/* Custom Legend Overlay */}
      <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur shadow-xl p-4 rounded-sm z-[400] border-l-4 border-darkBlue min-w-[160px]">
        <h4 className="font-serif text-lg text-darkBlue mb-3">AMU Intensity</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-500 shadow-sm ring-2 ring-red-100"></span>
            <span className="text-xs font-medium text-gray-600">High Risk (&gt;80%)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm ring-2 ring-yellow-100"></span>
            <span className="text-xs font-medium text-gray-600">Moderate (50-80%)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-green-500 shadow-sm ring-2 ring-green-100"></span>
            <span className="text-xs font-medium text-gray-600">Safe (&lt;50%)</span>
          </div>
        </div>
      </div>

      {/* Map Badge */}
      <div className="absolute top-4 left-4 z-[400] bg-darkBlue/80 backdrop-blur text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-widest shadow-lg border border-white/10">
        Haryana • Satellite View
      </div>
    </div>
  );
};

export default HaryanaMap;