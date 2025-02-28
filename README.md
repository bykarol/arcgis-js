# Overview

Website that generates a map using  ArcGIS, a mapping library like Google Maps. The map includes markers showing useful information about the cities I've visited.

The website currently utilizes a JSON file to initialize with approximately 23 markers on the first layer. New cities added are stored in localStorage and displayed on a separate layer. I plan to migrate this website to Next.js to facilitate updating the city data via a REST API.

>> ArcGIS is a comprehensive geospatial platform for professionals and organizations. It is the leading geographic information system (GIS) technology. Built by Esri, ArcGIS integrates and connects data through the context of geography. It provides world-leading capabilities for creating, managing, analyzing, mapping, and sharing all types of data.

>> Geocoding is the process of converting text to an address and a location.

[Software Demo Video](https://www.youtube.com/watch?v=ME2drUWKm8U)

# Development Environment

* VS Code
* ArcGIS JS API
* Geocoding Service
* HTML
* CSS - Bootstrap
* JavaScript
* JSON and LocalStorage
* Git / GitHub


# Useful Websites

* [ArcGIS - official page](https://www.esri.com/en-us/arcgis/geospatial-platform/overview)
* [Mapping - tutorial](https://developers.arcgis.com/documentation/mapping-and-location-services/tutorials/)
* [Geocoding](https://developers.arcgis.com/documentation/mapping-and-location-services/geocoding/)
* [How to build a geocoding app](https://developers.arcgis.com/documentation/mapping-and-location-services/geocoding/how-to-build-a-geocoding-app/)

# Future Work

* Migration to NextJS
* Implement NoSQL database to store the info about the cities.
* UI/UX enhancements (responsive)