
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getStoredUtms } from '@/lib/analytics';

export const useWebhookSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const submitToWebhook = async (serviceName, formData) => {
    setIsLoading(true);
    setError(null);

    const payload = {
      ...formData,
      servico: serviceName,
      pagina: location.pathname,
      timestamp: new Date().toISOString(),
      ...getStoredUtms() // Inject stored UTMs
    };

    console.log(`[Webhook] Preparing to send payload for ${serviceName}:`, payload);

    try {
      // Updated Webhook URL as per Task 1
      const response = await fetch('https://hook.us2.make.com/uueoh0uenix8tbvstomh9kvnnb2rwv3v', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook responded with status: ${response.status}`);
      }

      // Check if response is JSON, sometimes webhooks return plain text "Accepted"
      let responseData = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      console.log(`[Webhook] Successfully sent payload. Response:`, responseData);

      setIsLoading(false);
      return { success: true, data: responseData };
    } catch (err) {
      console.error('[Webhook] Error sending data:', err);
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  return { submitToWebhook, isLoading, error };
};
