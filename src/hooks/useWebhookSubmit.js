
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getStoredUtms } from '@/lib/analytics';

const WEBHOOK_URL = 'https://grafo-painel.pages.dev/api/lead-intake?token=grf_live_TDe25P69evVzRMmPckjKPAHdppP8IKug';
const FORM_NAME = 'gestao-risco';

export const useWebhookSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const submitToWebhook = async (serviceName, formData) => {
    setIsLoading(true);
    setError(null);

    const phone = formData?.telefone || formData?.whatsapp || '';

    const payload = {
      nome: formData?.nome || '',
      telefone: phone,
      produto: 'gestao_risco',
      ...formData,
      servico: serviceName,
      form_name: FORM_NAME,
      'form-name': FORM_NAME,
      pagina: location.pathname,
      timestamp: new Date().toISOString(),
      ...getStoredUtms()
    };

    console.log(`[Webhook] Preparing to send payload for ${serviceName}:`, payload);

    try {
      const response = await fetch(WEBHOOK_URL, {
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
