
import { useWebhookSubmit } from './useWebhookSubmit';
import { useToast } from '@/components/ui/use-toast';
import { trackEvent } from '@/lib/analytics';

export const useFormSubmission = () => {
  const { submitToWebhook, isLoading, error } = useWebhookSubmit();
  const { toast } = useToast();

  const handleFormSubmit = async (serviceName, formData, onSuccess) => {
    // 1. Track the form submission attempt
    trackEvent('form_submit', { type: serviceName, ...formData });
    
    // 2. Process the webhook submission
    const result = await submitToWebhook(serviceName, formData);

    if (result.success) {
      // 3. Fire generate_lead event ONCE after successful webhook response
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 
        event: 'generate_lead', 
        currency: 'BRL', 
        value: '0',
        service: serviceName
      });
      console.log(`[GTM] Pushed generate_lead event to dataLayer for ${serviceName}`);

      toast({
        title: 'Sucesso',
        description: 'Solicitação recebida com sucesso. Em breve entraremos em contato.',
      });

      if (onSuccess) onSuccess();
    } else {
      toast({
        title: 'Erro ao enviar',
        description: 'Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.',
        variant: 'destructive'
      });
    }

    return result;
  };

  return { handleFormSubmit, isLoading, error };
};
