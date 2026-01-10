
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
    if (mapContainerRef.current && !mapInstanceRef.current) {
      // Initialize Map centered on Haryana
      const map = L.map(mapContainerRef.current).setView([29.0588, 76.0856], 8);

      // Add Satellite Tile Layer (Esri World Imagery)
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 17
      }).addTo(map);

      // Add Labels Tile Layer (Optional, improves readability)
      L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png',
        opacity: 0.7
      }).addTo(map);

      mapInstanceRef.current = map;

      // --- Simulate Heatmap Data ---
      // Generating 100 random points within Haryana's approx bounding box
      // Lat: 27.6 to 30.9, Lng: 74.4 to 77.6
      const heatmapPoints: MapPoint[] = Array.from({ length: 80 }).map((_, i) => ({
        lat: 28.0 + Math.random() * 2.5,
        lng: 75.0 + Math.random() * 2.0,
        intensity: Math.floor(Math.random() * 100),
        name: `Cluster #${1000 + i}`
      }));

      // Render Points
      heatmapPoints.forEach(point => {
        let color = '#00ff00'; // Low usage
        let radius = 800;
        
        if (point.intensity > 40) {
            color = '#FFFF00'; // Medium
            radius = 1200;
        }
        if (point.intensity > 75) {
            color = '#FF0000'; // High
            radius = 1800;
        }

        L.circle([point.lat, point.lng], {
          color: 'transparent',
          fillColor: color,
          fillOpacity: 0.6,
          radius: radius
        }).bindPopup(`
          <div style="font-family: sans-serif; text-align: center;">
            <strong style="color: #333;">${point.name}</strong><br/>
            <span style="font-size: 10px; color: #666;">AMU Intensity: ${point.intensity}%</span>
          </div>
        `).addTo(map);
      });
      
      // Cleanup on unmount
      return () => {
        map.remove();
        mapInstanceRef.current = null;
      };
    }
  }, []);

  return (
    <div className="relative w-full h-96 bg-gray-100 rounded border border-gray-200 overflow-hidden group">
      <div ref={mapContainerRef} className="w-full h-full z-0" style={{ zIndex: 0 }} />
      
      {/* Overlay Legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded shadow-lg z-[400] text-xs">
         <h4 className="font-bold mb-2 text-darkBlue">AMU Intensity</h4>
         <div className="flex items-center gap-2 mb-1">
           <span className="w-3 h-3 rounded-full bg-red-600 opacity-80"></span>
           <span>Critical (&gt;75%)</span>
         </div>
         <div className="flex items-center gap-2 mb-1">
           <span className="w-3 h-3 rounded-full bg-yellow-400 opacity-80"></span>
           <span>Moderate (40-75%)</span>
         </div>
         <div className="flex items-center gap-2">
           <span className="w-3 h-3 rounded-full bg-green-500 opacity-80"></span>
           <span>Safe (&lt;40%)</span>
         </div>
      </div>
    </div>
  );
};

export default HaryanaMap;
