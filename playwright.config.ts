import { defineConfig } from '@playwright/test';
export default defineConfig({
  use: {
    // All requests we send go to this API endpoint.
    baseURL: 'https://jsonplaceholder.typicode.com/',
    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      'Accept': '*/*',
      // Add authorization token to all requests.
      // Assuming personal access token available in the environment.
      'Authorization': `token ${process.env.API_TOKEN}`,
    },
  }
});