document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
);

// localStorage.removeItem('theme')
function toggleMenu(state) {
    let sidebar = document.getElementById("sidebar");
    let openBtn = document.getElementById("open-btn");
    let closeBtn = document.getElementById("close-btn");

    if (state === "open") {
        document.body.style.overflowY = "hidden";
        sidebar.classList.remove("hidden");
        sidebar.classList.add("flex");
        openBtn.classList.remove("animate-rotate-right");
        closeBtn.classList.remove("animate-rotate-right");
        openBtn.classList.add("animate-rotate-left");
        closeBtn.classList.add("animate-rotate-left");
        sidebar.classList.add("animate-slide-in");
    } else {
        document.body.style.overflowY = "";
        sidebar.classList.add("animate-slide-out");
        openBtn.classList.remove("animate-rotate-left");
        closeBtn.classList.remove("animate-rotate-left");
        setTimeout(() => {
            openBtn.classList.add("animate-rotate-right");
            closeBtn.classList.add("animate-rotate-right");
            sidebar.classList.add("hidden");
            sidebar.classList.remove("flex");
            sidebar.classList.remove("animate-slide-out");
        }, 300);
    }
}

const scrollers = document.querySelectorAll(".scroller");

addAnimation();

function addAnimation() {
    scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}

const getChartOptions = () => {
    return {
        series: [52.8, 26.8, 20.4],
        colors: ["#1C64F2", "#16BDCA", "#9061F9"],
        chart: {
            height: 420,
            width: "100%",
            type: "pie",
        },
        stroke: {
            colors: ["white"],
            lineCap: "",
        },
        plotOptions: {
            pie: {
                labels: {
                    show: true,
                },
                size: "100%",
                dataLabels: {
                    offset: -25,
                },
            },
        },
        labels: ["Java", "php", "JavaScript"],
        dataLabels: {
            enabled: true,
            style: {
                fontFamily: "Inter, sans-serif",
            },
        },
        legend: {
            position: "bottom",
            fontFamily: "Inter, sans-serif",
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value + "%";
                },
            },
        },
        xaxis: {
            labels: {
                formatter: function (value) {
                    return value + "%";
                },
            },
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
        },
    };
};

if (typeof ApexCharts !== "undefined") {
    const chartElement = document.getElementById("pie-chart");

    if (chartElement) {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const chart = new ApexCharts(chartElement, getChartOptions());
                        chart.render();

                        observer.unobserve(chartElement);
                    }
                });
            },
            {threshold: 1}
        );

        observer.observe(chartElement);
    }
}

// const cursorSmallDot = document.getElementById("cursor-small-dot");
// const cursorBigDot = document.getElementById("cursor-big-dot");
//
// let smallDotPosition = { x: 0, y: 0 };
// let bigDotPosition = { x: 0, y: 0 };
//
// const translate3d = (x, y) => `translate3d(${x}px, ${y}px, 0)`;
//
// const handleMouseMove = (e) => {
//   smallDotPosition.x = e.clientX;
//   smallDotPosition.y = e.clientY;
//
//   bigDotPosition.x = e.clientX - 4;
//   bigDotPosition.y = e.clientY - 8;
//
//   cursorSmallDot.style.transform = translate3d(
//     smallDotPosition.x,
//     smallDotPosition.y
//   );
//   cursorBigDot.style.transform = translate3d(
//     bigDotPosition.x,
//     bigDotPosition.y
//   );
// };
//
// let timeout;
// const mouseMoveHandler = (e) => {
//   cursorSmallDot.classList.remove("hidden");
//   cursorBigDot.classList.remove("hidden");
//
//   window.requestAnimationFrame(() => handleMouseMove(e));
//
//   clearTimeout(timeout);
//
//   timeout = setTimeout(() => {
//     cursorSmallDot.classList.add("hidden");
//     cursorBigDot.classList.add("hidden");
//   }, 1000);
// };
// window.addEventListener("mousemove", mouseMoveHandler);


// GLOBE
const spacecraftDatabase = {
    "EARTHCARE": {
        name: "EarthCARE",
        description: "It is part of ESA's Earth Explorer Programme. The main goal of the mission is the observation and characterization of clouds and aerosols as well as measuring the reflected solar radiation and the infrared radiation emitted from Earth's surface and atmosphere.",
        myContribution: "I am currently an Operations Engineer on its Flight Control Team at ESA. I participated to OPS prep, Launch and commissioning phases. Now I take care of its routine operations.",
        operator: "ESA",
        operatorLogo: "assets/images/spacecrafts/agencies/ESA.png",
        partnerLogos: [
            {name: "Jaxa", logo: "assets/images/spacecrafts/agencies/Jaxa.png"},
        ],
        launcher: "Falcon 9 Block 5",
        launchDate: "28 May 2024",
        apogee: "393 km",
        period: "92.5 min",
        inclination: "97.1°",
        moreInfo: "https://www.esa.int/Applications/Observing_the_Earth/FutureEO/EarthCARE",
        imageUrl: "assets/images/spacecrafts/satellite/EARTHCARE.png"
    },
    "METOP-A": {
        name: "MetOp A",
        description: "It is a polar-orbiting satellite, part of the EUMETSAT Polar System, that provides global observations for weather forecasts and climate monitoring. MetOp-A was retired on 30 Nov 2021.",
        myContribution: "I was a Mission Controller, monitoring the spacecraft's and ground segment health 24/7 while reacting and solving any anomalies.",
        operator: "ESA",
        operatorLogo: "assets/images/spacecrafts/agencies/EUMETSAT.png",
        partnerLogos: [
            {name: "ESA", logo: "assets/images/spacecrafts/agencies/ESA.png"},
            {name: "NOAA", logo: "assets/images/spacecrafts/agencies/NOAA.png"},
        ],
        launcher: "Sojuz 2",
        launchDate: "19 Oct 2006",
        apogee: "817 km",
        period: "101 min",
        inclination: "98.7°",
        moreInfo: "https://www.eumetsat.int/metop",
        imageUrl: "assets/images/spacecrafts/satellite/METOP.png"
    },
    "METOP-B": {
        name: "MetOp B",
        description: "It is a polar-orbiting satellite, part of the EUMETSAT Polar System, that provides global observations for weather forecasts and climate monitoring.",
        myContribution: "I was a Mission Controller, monitoring the spacecraft's and ground segment health 24/7 while reacting and solving any anomalies.",
        operator: "ESA",
        operatorLogo: "assets/images/spacecrafts/agencies/EUMETSAT.png",
        partnerLogos: [
            {name: "ESA", logo: "assets/images/spacecrafts/agencies/ESA.png"},
            {name: "NOAA", logo: "assets/images/spacecrafts/agencies/NOAA.png"},
        ],
        launcher: "Sojuz 2",
        launchDate: "17 Sep 2012",
        apogee: "817 km",
        period: "101 min",
        inclination: "98.7°",
        moreInfo: "https://www.eumetsat.int/metop",
        imageUrl: "assets/images/spacecrafts/satellite/METOP.png"
    },
    "METOP-C": {
        name: "MetOp C",
        description: "It is a polar-orbiting satellite, part of the EUMETSAT Polar System, that provides global observations for weather forecasts and climate monitoring.",
        myContribution: "I was a Mission Controller, monitoring the spacecraft's and ground segment health 24/7 while reacting and solving any anomalies.",
        operator: "ESA",
        operatorLogo: "assets/images/spacecrafts/agencies/EUMETSAT.png",
        partnerLogos: [
            {name: "ESA", logo: "assets/images/spacecrafts/agencies/ESA.png"},
            {name: "NOAA", logo: "assets/images/spacecrafts/agencies/NOAA.png"},
        ],
        launcher: "Sojuz 2",
        launchDate: "7 Nov 2018",
        apogee: "817 km",
        period: "101 min",
        inclination: "98.7°",
        moreInfo: "https://www.eumetsat.int/metop",
        imageUrl: "assets/images/spacecrafts/satellite/METOP.png"
    },
};

function showSatelliteDetails(newDetailsHTML) {
    const defaultInfo = document.getElementById('default-satellite-info');
    const satelliteDetails = document.getElementById('satellite-details');

    // If satellite details are already showing, animate them out first
    if (!satelliteDetails.classList.contains('hidden')) {
        satelliteDetails.classList.add('info-exit');

        setTimeout(() => {
            // Update content
            satelliteDetails.innerHTML = newDetailsHTML;

            // Trigger new animation
            satelliteDetails.classList.remove('info-exit');
            satelliteDetails.classList.add('info-enter');

            setTimeout(() => {
                satelliteDetails.classList.remove('info-enter');
            }, 300);
        }, 300);
    } else {
        // Original behavior when coming from default info
        defaultInfo.classList.add('info-exit');

        setTimeout(() => {
            defaultInfo.classList.add('hidden');
            defaultInfo.classList.remove('info-exit');

            // Update content and show satellite details
            satelliteDetails.innerHTML = newDetailsHTML;
            satelliteDetails.classList.remove('hidden');
            satelliteDetails.classList.add('info-enter');

            setTimeout(() => {
                satelliteDetails.classList.remove('info-enter');
            }, 300);
        }, 300);
    }
}

function closeSatelliteDetails() {
    const defaultInfo = document.getElementById('default-satellite-info');
    const satelliteDetails = document.getElementById('satellite-details');

    // Hide satellite details with animation
    satelliteDetails.classList.add('info-exit');

    setTimeout(() => {
        satelliteDetails.classList.add('hidden');
        satelliteDetails.classList.remove('info-exit');

        // Show default info with animation
        defaultInfo.classList.remove('hidden');
        defaultInfo.classList.add('info-enter');

        setTimeout(() => {
            defaultInfo.classList.remove('info-enter');
        }, 300);
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    const EARTH_RADIUS_KM = 6371;
    const TIME_STEP = 2000;

    const timeLogger = document.getElementById('time-log');
    const satelliteCount = document.getElementById('satellite-count');
    const globeContainer = document.getElementById('globeViz');

    // Set initial dimensions
    const containerWidth = globeContainer.clientWidth;
    const containerHeight = globeContainer.clientHeight;

    const myGlobe = new Globe(globeContainer)
        // .width(containerWidth)
        // .height(containerHeight)
        .width(Math.min(containerWidth, 500)) // Limit initial width
        .height(Math.min(containerWidth * 0.75, 375)) // Maintain 4:3 aspect ratio with max height
        .globeImageUrl('./assets/images/earth_neon_bw_dark.png')
        .globeMaterial(new THREE.MeshPhongMaterial({
            shininess: 0.3,
            opacity: 1,
            reflectivity: 1,
            refractionRatio: 1,
            transparent: false,
            emissive: new THREE.Color(0x000000),
            emissiveIntensity: 0
        }))
        .backgroundColor('#00000000')
        .atmosphereColor('#9061fa')
        .showAtmosphere(true)
        .objectThreeObject(d => {
            // Create a simple satellite geometry
            const sat_geometry = new THREE.IcosahedronGeometry(5, 0);
            const sat_material = new THREE.MeshStandardMaterial({
                color: '#9061fa',
                metalness: 0.9,
                roughness: 0.1,
                emissive: '#3a0f96',
                emissiveIntensity: 0.7
            });
            const mesh = new THREE.Mesh(sat_geometry, sat_material);

            // Generate random rotation speeds for each axis
            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.05,
                    y: (Math.random() - 0.5) * 0.05,
                    z: (Math.random() - 0.5) * 0.05
                }
            };

            // Add an update function to handle rotation
            mesh.onBeforeRender = () => {
                mesh.rotation.x += mesh.userData.rotationSpeed.x;
                mesh.rotation.y += mesh.userData.rotationSpeed.y;
                mesh.rotation.z += mesh.userData.rotationSpeed.z;
            };

            return mesh;
        })
        .objectLat(d => d.lat)
        .objectLng(d => d.lng)
        .objectAltitude(d => d.alt)
        .objectLabel(d => d.name)
        .objectFacesSurface(false) // Don't rotate objects to face the surface
        .onObjectClick((obj, event, coords) => {

            const defaultInfo = document.getElementById('default-satellite-info');
            const satelliteDetails = document.getElementById('satellite-details');

            //defaultInfo.classList.add('hidden');
            //satelliteDetails.classList.remove('hidden');

            const spacecraft = spacecraftDatabase[obj.name] || {
                description: "Spacecraft details not available",
                operator: "Unknown",
                operatorLogo: "assets/logos/default-logo.png",
                type: "Unknown",
                contribution: "No contribution information available",
                launchDate: "Unknown",
                moreInfo: "#",
                imageUrl: "assets/images/default-spacecraft.jpg"
            };

            // Update the HTML with spacecraft information
            const detailsHTML = `
                <div class="spacecraft-details p-4">
                
                    <!-- Close button -->
                    <div class="flex justify-end" style="margin-bottom: -30px">
                        <button onclick="closeSatelliteDetails()" 
                                class="text-gray-500 hover:text-gray-700 transition-colors"
                                aria-label="Close details">
                            <i class="fa-solid fa-times"></i>
                        </button>
                    </div>
                
                    <div class=" flex gap-2 text-base md:text-xl xl:text-2xl font-poppins-semibold items-center mb-2">
                        <h2>${spacecraft.name}</h2>
                    </div>
                    
                    <!-- Top Section: Logos -->
                    <div class="flex justify-between mb-4">
                        <!-- Left: Mission Logo -->
                        <div class="mr-2 bg-white p-2 rounded-lg" style="padding: 2px">
                            <img src="${spacecraft.imageUrl}" alt="${obj.name}" 
                                 style="height: 64px; width: auto;" class="object-contain">
                        </div>
                        
                        <!-- Right: Operator and Partners -->
                        <div class="bg-white p-2 rounded-lg" style="padding: 2px">
                            <!-- Top: Operator Logo -->
                            <div class="flex justify-end mb-1">
                                <img src="${spacecraft.operatorLogo}" alt="${spacecraft.operator}" 
                                     style="height: 32px; width: auto;" class="object-contain">
                            </div>
                            <!-- Bottom: Partner Logos -->
                            <div class="flex justify-start gap-2">
                                ${spacecraft.partnerLogos ? spacecraft.partnerLogos.map(partner =>
                                    `<img src="${partner.logo}" alt="${partner.name}" 
                                          style="height: 28px; width: auto;" class="object-contain">`
                                ).join('') : ''}
                            </div>
                        </div>
                    </div>
            
                    <div class="flex text-sm mb-2">
                        <div class="whitespace-nowrap mr-10">
                            <span class="text-gray-500">Launched on: </span>
                            <span class="font-semibold ml-1">${spacecraft.launchDate}</span>
                        </div>
                        <div class="whitespace-nowrap mr-10">
                            <span class="text-gray-500">Launcher: </span>
                            <span class="font-semibold ml-1">${spacecraft.launcher || 'Unknown'}</span>
                        </div>
                    </div>
            
                    <div class="flex mb-1 text-sm">
                        <div class="whitespace-nowrap mr-10">
                            <span class="text-gray-500">Altitude: </span>
                            <span class="font-semibold ml-1">${spacecraft.apogee || 'N/A'}</span>
                        </div>
                        <div class="whitespace-nowrap mr-10">
                            <span class="text-gray-500">Period: </span>
                            <span class="font-semibold ml-1">${spacecraft.period || 'N/A'}</span>
                        </div>
                        <div class="whitespace-nowrap mr-10">
                            <span class="text-gray-500">Inclination: </span>
                            <span class="font-semibold ml-1">${spacecraft.inclination || 'N/A'}</span>
                        </div>
                    </div>
            
                    <div class="mb-1 text-sm border-b border-gray-200 dark:border-gray-700 py-2">
                        <span class="text-gray-500">Description: </span>
                        <p class="mt-1">${spacecraft.description || 'N/A'}</p>
                    </div>
            
                    <div class="mb-1 text-sm border-b border-gray-200 dark:border-gray-700 py-2">
                        <span class="text-gray-500">My contribution: </span>
                        <p class="mt-1">${spacecraft.myContribution || 'N/A'}</p>
                    </div>
            
                    <div class="flex justify-end pt-2" style="color: #9061fa">
                        <a href="${spacecraft.moreInfo}" 
                           target="_blank" 
                           class="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1">
                           Learn More <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            `;

            showSatelliteDetails(detailsHTML);

            // Update orbital parameters
            const altitudeKm = Math.round(obj.alt * 6371);
            const mu = 398600.4418;
            const semiMajorAxis = 6371 + altitudeKm;
            const period = Math.round((2 * Math.PI * Math.sqrt(Math.pow(semiMajorAxis, 3) / mu)) / 60);

        });

    // Disable zoom and set auto-rotation
    myGlobe.controls().enableZoom = false;
    myGlobe.controls().autoRotate = true;
    myGlobe.controls().autoRotateSpeed = 0.7;
    // Create purple ambient light
    const ambientLight = new THREE.AmbientLight(0x9061fa, 3); // Using your purple hex code
    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(1, 1, 1);
    myGlobe.lights([ambientLight, directionalLight]);

    // Add click handler for globe background to reset info display
    globeContainer.addEventListener('click', (event) => {
        // Check if click was on the globe background (not on a satellite)
        if (event.target === globeContainer) {
            document.getElementById('default-satellite-info').classList.remove('hidden');
            document.getElementById('satellite-details').classList.add('hidden');
        }
    });

    // Adjust initial view
    myGlobe.pointOfView({altitude: 1.5});
    setTimeout(() => myGlobe.pointOfView({altitude: 2}));

    fetch('./assets/datasets/spacecrafts.tle').then(r => r.text()).then(rawData => {
        const tleData = rawData.replace(/\r/g, '')
            .split(/\n(?=[^12])/)
            .filter(d => d)
            .map(tle => tle.split('\n'));

        const satData = tleData.map(([name, ...tle]) => ({
            satrec: satellite.twoline2satrec(...tle),
            name: name.trim().replace(/^0 /, ''),
            path: [] // Store the complete path as single array
        }))
            .filter(d => !!satellite.propagate(d.satrec, new Date()).position);

        satelliteCount.innerText = satData.length;

        let time = new Date();
        (function frameTicker() {
            requestAnimationFrame(frameTicker);

            time = new Date(+time + TIME_STEP);
            timeLogger.innerText = time.toString();

            const gmst = satellite.gstime(time);

            satData.forEach(d => {
                const eci = satellite.propagate(d.satrec, time);
                if (eci.position) {
                    const gdPos = satellite.eciToGeodetic(eci.position, gmst);
                    d.lat = satellite.radiansToDegrees(gdPos.latitude);
                    d.lng = satellite.radiansToDegrees(gdPos.longitude);
                    d.alt = gdPos.height / EARTH_RADIUS_KM;

                }
            });

            myGlobe
                .objectsData(satData.filter(d => !isNaN(d.lat) && !isNaN(d.lng) && !isNaN(d.alt)));
        })();

        window.closeSatelliteDetails = closeSatelliteDetails;
    });

    // Responsive handling
    function updateGlobeSize() {
        const newWidth = globeContainer.clientWidth;
        const newHeight = globeContainer.clientHeight;
        myGlobe
            // .width(newWidth)
            // .height(newHeight)
            .width(Math.min(containerWidth, 500)) // Limit initial width
            .height(Math.min(containerWidth * 0.75, 375)); // Maintain 4:3 aspect ratio with max height
    }

    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            if (entry.target === globeContainer) {
                updateGlobeSize();
            }
        }
    });

    resizeObserver.observe(globeContainer);
    window.addEventListener('resize', updateGlobeSize);
});