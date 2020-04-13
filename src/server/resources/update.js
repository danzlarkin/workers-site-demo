// Define the update endpoint
export const update = (event) => {

  // Get the current time
  const time = new Date();

  // Extract the hours minutes and seconds
  let [ hours, minutes, seconds ] = [
    (time.getHours() + 1),
    ((time.getMinutes() < 10) ? `0${time.getMinutes()}` : time.getMinutes()),
    ((time.getSeconds() < 10) ? `0${time.getSeconds()}` : time.getSeconds()),
  ];

  // Define the body payload
  const body = JSON.stringify({
    title: `Hello World`,
    message: `Last Updated: ${hours}:${minutes}:${seconds}`
  });
  
  // Return the response
  return new Response(body, {
    headers: {
      'Content-Type': `application/json`
    }
  })
}