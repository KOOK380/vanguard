import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { phoneBar } from "@/content/site";
import { getSiteSettings } from "@/lib/cms/data";

/**
 * Floating WhatsApp button for screens 768 px and wider (decision 289); phones have WhatsApp in the
 * action bar instead. It opens a chat with the pre-filled message, and appears only once a WhatsApp
 * number is set (open fact 69). It sits at the bottom end corner, clear of the cookie banner, which
 * sits at the bottom start corner.
 */
export async function FloatingWhatsApp() {
  const { whatsappHref } = await getSiteSettings();
  if (!whatsappHref) return null;
  return (
    <div data-track-area="floating" className="fixed end-6 bottom-6 z-30 hidden md:block">
      <Button href={whatsappHref} variant="secondary" leadingIcon={<MessageCircle aria-hidden="true" size={20} strokeWidth={1.5} />} className="shadow-md" target="_blank" rel="noopener">
        {phoneBar.whatsapp}
      </Button>
    </div>
  );
}
