
# Booking.com Scraper

This repository contains a web scraping tool designed to extract data from Booking.com. It provides functionalities to retrieve accommodations and more from the Booking.com website.

## Features

- **Hotel Data Retrieval**: Fetch detailed information about hotels including name, location, amenities, rooms, images and prices.
- **Search Parameters**: Customize search parameters for location, dates, price range, etc.

## Installation

1. Clone the repository:
2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Configure the scraper at ```.env```
   ```bash
    QUERY=French #query key, city or country
    CHUNKSIZE=40 
    AD_CSS_SELECT=.b9720ed41e.cdf0a9297c #selector for disable popup ad
    START_DATE=2024-03-01 #checkin date
    END_DATE=2024-03-02 #checkout date
   ```
2. Run the scraper script:

    Get links based on params defined in .env, store at : */dist/${QUERY}/links.json*
    ```bash
      npm run get:link
    ```
    Get accommodation detail with links generate with ***get:link***
    ```bash
      npm run get:accommodation
    ```
    All in one
    ```bash
      npm start
    ```
    Accommodation prototype:
      ```typescript
      interface Facility {
        icon: string;
        name: string;
      }

      interface SubFeature {
        icon: string;
        name: string;
        additional_charge: boolean;
      }


      interface Room {
        name: string;
        roomType: string;
        basePrice: number;
        description: string;
        noGuests: number;
      }

      interface Accommodation {
        title: string;
        description: string;
        address: string;
        lat: string;
        lng: string;
        facilities: Facility[];
        id: string;
        url: string;
        features: {
          [key: string]: {
            icon: string;
            features: SubFeature[];
            note: string;
          };
        };
        rooms: Room[];
        images: string[];
      }

      ```

## Contributing
 Feel free to open issues or submit pull requests to improve/update the scraper's functionality or fix any bugs.

## Disclaimer

This scraper is intended for educational purposes and should be used in compliance with Booking.com's terms of service. The maintainers of this repository are not responsible for any misuse of the scraper.
