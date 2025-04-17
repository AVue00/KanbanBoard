import { UserLogin } from "../interfaces/UserLogin";


  // POST request to the login route
const login = async (userInfo: UserLogin) => {
  try {
    // Sending POST request to the server with user login data in JSON format
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    // If the response is not okay, throw an error
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response as JSON
      throw new Error(`Error: ${errorData.message}`);
    }

    // If the response is okay, extract the JSON data
    const data = await response.json();
    return data; // Return the data received from the server
  } catch (error) {
    console.log(error); // Log any errors during fetch request
    return Promise.reject('Could not fetch user data'); // Return an error
  }
}



export { login };
