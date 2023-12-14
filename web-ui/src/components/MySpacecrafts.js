import React from 'react';
import Globe from "react-globe.gl";
import * as THREE from 'three';
import * as satellite from "satellite.js";

import TLEs from '../assets/satdata/my-spacecrafts-tles.txt';
import spacecraftColors from '../assets/satdata/my-spacecrafts-properties';
import EarthTextureMap from '../assets/img/earth-texture-map-cartoon.jpg';
import CloudsTextureMap from '../assets/img/clouds.png';

const { useState, useEffect, useRef, useMemo } = React;

const EARTH_RADIUS_KM = 6378; // km
const SAT_SIZE = 600; // km
const TIME_STEP = 1000; // per frame

export const World = () => {
    const globeEl = useRef();
    const [satData, setSatData] = useState();
    const [globeRadius, setGlobeRadius] = useState();
    const [time, setTime] = useState(new Date());



    useEffect(() => {
        // time ticker
        (function frameTicker() {
            requestAnimationFrame(frameTicker);
            setTime(time => new Date(+time + TIME_STEP));
        })();
    }, []);

    useEffect(() => {
        globeEl.current.controls().enableZoom = false;
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 0.25;
    }, []);

    useEffect(() => {
        // Add clouds sphere
        const CLOUDS_IMG_URL = CloudsTextureMap;
        const CLOUDS_ALT = 0.004;
        const CLOUDS_ROTATION_SPEED = -0.01; // deg/frame

        new THREE.TextureLoader().load(CLOUDS_IMG_URL, cloudsTexture => {
            const clouds = new THREE.Mesh(
                new THREE.SphereGeometry(globeEl.current.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
                new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
            );
            globeEl.current.scene().add(clouds);

            (function rotateClouds() {
                clouds.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
                requestAnimationFrame(rotateClouds);
            })();
        });
    }, []);

    useEffect(() => {
        // load satellite data
        fetch(TLEs).then(r => r.text()).then(rawData => {
            const tleData = rawData.replace(/\r/g, '')
                .split(/\n(?=[^12])/)
                .filter(d => d)
                .map(tle => tle.split('\n'));
            const satData = tleData.map(([name, ...tle]) => ({
                satrec: satellite.twoline2satrec(...tle),
                name: name.trim().replace(/^0 /, '')
            }))
                // exclude those that can't be propagated
                .filter(d => !!satellite.propagate(d.satrec, new Date()).position)
                .slice(0, 1500);

            setSatData(satData);
        });
    }, []);

    const objectsData = useMemo(() => {
        if (!satData) return [];

        // Update satellite positions
        const gmst = satellite.gstime(time);
        return satData.map(d => {
            const eci = satellite.propagate(d.satrec, time);
            if (eci.position) {
                const gdPos = satellite.eciToGeodetic(eci.position, gmst);
                const lat = satellite.radiansToDegrees(gdPos.latitude);
                const lng = satellite.radiansToDegrees(gdPos.longitude);
                const alt = gdPos.height / EARTH_RADIUS_KM;
                const color = spacecraftColors[d.name] || 'palegreen';

                return { ...d, lat, lng, alt, color };
            }
            return d;
        });
    }, [satData, time]);

    const satObject = useMemo(() => {
        if (!globeRadius) return undefined;

        const satGeometry = new THREE.IcosahedronGeometry(SAT_SIZE * globeRadius / EARTH_RADIUS_KM / 2, 0);
        const satMaterial = new THREE.MeshLambertMaterial({ color: 'palegreen', transparent: true, opacity: 1 });
        return new THREE.Mesh(satGeometry, satMaterial);
    }, [globeRadius]);

    const handleObjectClick = (obj, event, { lat, lng, altitude }) => {
        // Do stuff
        console.log(obj.name);
    };

    useEffect(() => {
        setGlobeRadius(globeEl.current.getGlobeRadius());
        globeEl.current.pointOfView({ altitude: 3.5 });
    }, []);

    return <div>
        <Globe
            ref={globeEl}
            animateIn={false}
            globeImageUrl={EarthTextureMap}
            objectsData={objectsData}
            objectLabel="name"
            objectLat="lat"
            objectLng="lng"
            objectAltitude="alt"
            objectFacesSurface={false}
            objectThreeObject={satObject}
            onObjectClick={handleObjectClick}
        />
    </div>;
};