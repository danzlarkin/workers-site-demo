
// Import the cloudflare asset loader
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

// Import the template renderer module
import { renderTemplate } from '../shared/render';

// Fetch an asset
export const fetchAsset = async(event) => {
  
  // Attempt to fetch an asset
  try {
    
    // Return the asset from KV
    return await getAssetFromKV(event);

  // Catch an error
  } catch(e) {
    
    // Attempt to fetch the 404 page
    try {

      // Fetch the 404 page
      const asset = await renderAssetTemplate(event, `main`, {
        title: `404`,
        message: `We've lost that webpage - sorry`
      });
      
      // Return the 404 response
      return asset.toResponse({ status: 404 });
    
    // Cannot find page so throw a 500
    } catch (e) {

      // Return the 500
      return new Response('500: Internal Error', { status: 500 });
    }
  }
}

// Fetch and render an asset from a template
export const renderAssetTemplate = async(event, template, data) => {

  // Request the template
  const page = await getAssetFromKV(event, {

    // Define the template 
    mapRequestToAsset(request) {
      
      // Generate the URL for the template
      const url = `${new URL(request.url).origin}/templates/${template}.html`;

      // Return a new request using the URL
      return new Request(url, request);
    }
  });

  // Read the asset body
  const body = await page.text();

  // Render the asset
  const asset = renderTemplate(body, data);

  // Define the headers
  const headers = {
    'Content-Type': page.headers.get('Content-Type')
  }

  // Return the functions
  return {

    // Return the data as text
    text: () => Promise.resolve(asset),

    // Convert the asset to a response
    toResponse: (options) => new Response(asset, { 
      headers: { ...headers, ...options.headers },
      ...options
    })
  }
}