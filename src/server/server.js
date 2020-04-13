// Import the asset handling module
import { fetchAsset, renderAssetTemplate } from './assets';

// Import the resource handling module
import { resources } from './resources';

// Add the event listener
addEventListener('fetch', async(event) => {

  // IMPORANT - connect the client source code for build
  const client = () => import('../client/client');

  // Attempt to fetch a resource
  try {
    
    // Handle a request
    event.respondWith(handleRequest(event));

  // Handle an error
  } catch (error) {

    // Log out the error
    console.log(error);

    // Fetch the 500 page
    const asset = await renderAssetTemplate(event, `main`, {
      title: `500`,
      message: `An internal error has occurred`
    });
    
    // Send the 500 response
    event.respondWith(asset.toResponse({ status: 500 }));
  }
});

// Add the request handler
async function handleRequest(event) {

  // Extract the current URL
  const url = new URL(event.request.url);

  // Extract the path from the URL
  const path = (url.pathname == `index.html`) ? '/' : url.pathname;

  // Find a resource
  const resource = resources[path];

  // Return the resource response if there is one
  if (resource) return resource(event);

  // Attempt to find an asset
  return fetchAsset(event);
}