
# Booking.com Scraper

This repository contains a web scraping tool designed to extract data from Booking.com. It provides functionalities to retrieve accommodations and more from the Booking.com website.

## Features

- **Hotel Data Retrieval**: Fetch detailed information about hotels including name, location, amenities, rooms, images and prices.
- **Search Parameters**: Customize search parameters for location, dates, price range, etc.
- **Review Extraction**: Scrape customer reviews, ratings, and comments for individual hotels.

## Installation

1. Clone the repository:
2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Configure the scraper with your Booking.com credentials or use as a guest (for non-authenticated features).
2. Run the scraper script:

   ```bash
   
   ```

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

3. Follow the prompts to specify the type of data you want to scrape and enter relevant details (hotel name, location, dates, etc.).

## Configuration

The scraper can be configured by modifying the `config.js` file. Here, you can set the default parameters for scraping, including the API endpoints, timeouts, and search criteria.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the scraper's functionality or fix any bugs.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- **[Booking.com](https://www.booking.com/)** - The target website providing data for scraping.
- **[Puppeteer](https://github.com/puppeteer/puppeteer)** - Headless browser used for scraping functionality.

## Disclaimer

This scraper is intended for educational purposes and should be used in compliance with Booking.com's terms of service. The maintainers of this repository are not responsible for any misuse of the scraper.

---

Feel free to adjust and expand this template to include more specific details about the scraper, usage examples, or any other relevant information for users or contributors.