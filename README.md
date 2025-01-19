# Country Search Application

A React-based application that allows users to search for countries using the [Rest Countries API](https://restcountries.com/). The application includes a custom hook for fetching data and displays suggestions based on the user's input.

## Features

- **Dynamic Country Search**:
  - Search for countries by typing their names.
  - Shows suggestions limited to 5 results.
- **Debounced API Calls**:
  - Reduces API requests by delaying them until the user stops typing.
- **Custom Hook**:
  - Fetching logic is encapsulated in a reusable custom hook (`useCountrySearch`).
- **Navigation**:
  - Clicking a country navigates to the country details page.
