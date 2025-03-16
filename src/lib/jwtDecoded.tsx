export const decodeJWT = (token: string) => {
    try {
      const [, payload, ] = token.split('.');
      const base64Payload = payload.replace(/-/g, '+').replace(/_/g, '/'); 
      const decodedPayload = JSON.parse(atob(base64Payload)); 
  
      return decodedPayload; 
    } catch (error) {
      console.error("Error decoding the token:", error);
      return null; 
    }
  };
  