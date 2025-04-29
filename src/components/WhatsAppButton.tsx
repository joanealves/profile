import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phone = "5531985201743"; 
  const message = "Olá, gostaria de mais informações!";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="backdrop-blur-md bg-white/30 hover:bg-white/40 text-black shadow-lg p-4 rounded-full transition-all duration-300 cursor-pointer">
        <MessageCircle className="w-6 h-6" />
      </div>
    </a>
  );
};

export default WhatsAppButton;
