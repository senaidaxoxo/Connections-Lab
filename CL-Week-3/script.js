// Fetch the JSON file
fetch('iphone.json')
    .then(response => response.json())  // Parse the JSON data
    .then(data => {
        console.log('JSON data loaded:', data);

        // Add event listeners for the hotspots
        const infoBox = document.getElementById('info-box');

        // Function to handle mouseover and display the data
        const handleMouseOver = (event) => {
            const component = event.target.getAttribute('data-component');
            const componentData = data[component];

            if (componentData) {
                // Populate the info box with JSON data
                infoBox.innerHTML = `
                    <strong>${component}</strong><br>
                    REEs: ${componentData.REEs.join(', ')}<br>
                    Location Found: ${componentData['Location Found'].join(', ')}<br>
                    Labor Cost: ${componentData['Labor Cost']}<br>
                    Environmental Cost: ${componentData['Environmental Cost']}<br>
                    Greenhouse Gas Emissions: ${componentData['Greenhouse Gas Emissions']}<br>
                    Financial Cost: ${componentData['Financial Cost']}
                `;

                // Position and show the info box
                infoBox.style.top = `${event.clientY - 10}px`;
                infoBox.style.left = `${event.clientX - 10}px`;
                infoBox.style.display = 'block';
            }
        };

        // Function to hide the info box
        const handleMouseOut = () => {
            infoBox.style.display = 'none';
        };

        // Adding event listeners for the battery hotspot
        const batteryHotspot = document.querySelector('.hotspot.battery');
        batteryHotspot.addEventListener('mouseover', handleMouseOver);
        batteryHotspot.addEventListener('mouseout', handleMouseOut);

        // Adding event listeners for the camera hotspot
        const cameraHotspot = document.querySelector('.hotspot.camera');
        cameraHotspot.addEventListener('mouseover', handleMouseOver);
        cameraHotspot.addEventListener('mouseout', handleMouseOut);

        const circuitHotspot = document.querySelector('.hotspot.circuit');
        circuitHotspot.addEventListener('mouseover', handleMouseOver);
        circuitHotspot.addEventListener('mouseout', handleMouseOut);

        // Example of toggling the image when the body is clicked
        document.body.addEventListener('click', function() {
            const image = document.getElementById('phone-image');
            if (image.src.includes('iphone-teardown.png')) {
                image.src = 'iphone.png';
            } else {
                image.src = 'iphone-teardown.png';
            }
        });

    })
    .catch(error => {
        console.error('Error loading the JSON file:', error);
    });
