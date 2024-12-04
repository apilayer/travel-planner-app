# Travel Planner App

![Travel Planner App Screenshot](/travel.png)

A web application that displays available flights from desired origin to destination and current weather status of destination.

Built with React.js, [Aviation Stack API](https://aviationstack.com/), and [Weather Stack API](https://weatherstack.com/), it shows the available flights from one origin to destination.

## Features

- 📍 Display available flights between to places using Aviation Stack API
- 📰 Shows the curent weather using Weather Stack API
- 🌐 Support for countries worldwide

## Installation

To set up the Travel Planner App project locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/apilayer/travel-planner-app.git
   ```

2. Navigate to the project directory:

   ```
   cd travel-planner-app
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Create a `.env.local` file in the root directory and add your API keys:

   ```
   VITE_AVIATION_STACK_API_KEY=your_aviation_stack_api_key_here
   VITE_WEATHER_STACK_API_KEY=your_weather_stack_api_key_here
   ```

5. Run the development server:

   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Select your desired origin and destination countries along with the departure date.
2. Once your location is determined, the app will show the available flights using the Aviation Stack API.
3. With the help of Weather Stack API, the app will also show the current weather status of destination country.

## Technologies Used

- [React](https://reactjs.org/)
- [Aviation Stack API](aviationstack.com/) to fetch flights
- [Weather Stack API](weatherstack.com) for weather status

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.
