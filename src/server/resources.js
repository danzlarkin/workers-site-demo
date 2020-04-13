// Import the dynamic resources
import { welcome } from './resources/welcome';
import { update } from './resources/update';

// Define all dynamic resources
export const resources = {

  // Add the index page
  '/': welcome,

  // Add the update endpoint
  '/update': update
}
