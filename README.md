# Aircheck

Aircheck is a web application utilizing geolocation services to identify the nearest air quality monitoring station. It fetches data from the selected station, displaying key pollutant levels such as PM2.5, PM10, ozone, sulfur dioxide, nitrogen dioxide, and carbon monoxide. The interface provides a summary of air quality conditions and may offer recommendations based on the severity of pollution levels.

[Project site](https://aircheck.zbrogd.pl/)

The project was developed with the primary goal of learning web communication with API servers.

Data comes from [GIOŚ](https://powietrze.gios.gov.pl/)

## Technologies

* Angular 16
* RxJS 7

## To do

- Ability to choose a station other than the nearest one.
- Popup warning regarding the inability to use the application if you do not consent to check the location.

## Requirements

Node.js is required for the development environment, with a minimum supported version of 18.10.0. This version is necessary due to Angular requirements.

Running [aircheck-server](https://github.com/mofcpl/aircheck-server) is required for this project to work.

## Installation

### Clone this repository
```bash
git clone https://github.com/mofcpl/aircheck-client.git
```

### Install dependencies
```bash
npm install
```

### Run development server
```bash
ng serve
```

## Contributing

1. Clone the repository and make a new branch from develop.
2. Make changes.
3. Open a Pull Request with a comprehensive description of changes.

This project uses Git Flow branching model for development.

## Notes

Aircheck is a continuation of the earlier project, [Airtest](https://github.com/mofcpl/air-test), which was developed in a different technology stack.



