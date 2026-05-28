import { useState, useEffect } from "react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState("");

  // Close chat on click outside
  const handleOutsideClick = (e) => {
    if (e.target.id === "chatbot-container") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const addMessage = (message) => {
    setConversation((prev) => [...prev, message]);
  };

  const handleSend = async () => {
    if (!userInput.trim()) return;

    let userMessage = { id: Date.now(), text: userInput, sendby: "user" };
    addMessage(userMessage);
    setUserInput("");

    let prompt = `You are a doctor with 20 years of experience. The patient is asking: "${userInput}". Provide a non-lethal, simple solution, respond like a text message without any text formatting and don't say let me know and no medicines.`;
    const encodedPrompt = encodeURIComponent(prompt);
    const apiUrl = `https://text.pollinations.ai/${encodedPrompt}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("API error");
      const reply = await response.text();

      let botMessage = { id: Date.now(), text: reply, sendby: "bot" };
      addMessage(botMessage);
    } catch (error) {
      console.error("Bot error:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div>
      {/* Floating Chat Bubble */}
      <div
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer"
      >
        💬
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          id="chatbot-container"
          className="fixed bottom-16 right-6 w-80 bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="p-3 bg-blue-600 text-white font-bold flex justify-between items-center">
            Max - Quick Remedy Bot
            {/* Close Button */}
            <button onClick={() => setIsOpen(false)} className="text-white">
              X
            </button>
          </div>
          <div className="p-3 h-60 overflow-y-auto border-b">
            {conversation.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 p-2 rounded relative ${
                  msg.sendby === "user" ? "bg-gray-300" : "bg-green-200"
                }`}
              >
                {msg.text}
                {/* Notch for the user */}
                {msg.sendby === "user" && (
                  <div className="absolute bottom-0 right-4 w-0 h-0 border-l-[10px] border-l-transparent border-b-[10px] border-b-gray-300 border-r-[10px] border-r-transparent" />
                )}
                {/* Notch for the bot */}
                {msg.sendby === "bot" && (
                  <div className="absolute bottom-0 left-4 w-0 h-0 border-l-[10px] border-l-transparent border-b-[10px] border-b-green-200 border-r-[10px] border-r-transparent" />
                )}
              </div>
            ))}
          </div>
          <div className="flex p-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 p-2 border rounded"
              placeholder="Ask Max..."
            />
            <button onClick={handleSend} className="ml-2 bg-blue-600 text-white p-2 rounded">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
