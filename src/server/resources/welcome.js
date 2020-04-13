// Import the asset module
import { renderAssetTemplate } from '../assets';

// Define the welcome page
export const welcome = async(event) => {

  // Fetch the main page
  const asset = await renderAssetTemplate(event, `main`, {
    title: `Hello World`,
    message: `Welcome to this webpage`
  });

  // Return the response
  return asset.toResponse({ status: 200 });
}