import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import Button from '../ui/Button';

const AICounsellingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial welcome message
  const welcomeMessage = {
    id: 1,
    text: "Hello! 👋 I'm your AI Career Counsellor. How can I help today?",
    sender: 'bot',
    timestamp: new Date()
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) {
      setMessages([welcomeMessage]);
      return;
    }

    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (!error && data.length) {
      const formatted = data.map(m => ({
        id: m.id,
        text: m.message,
        sender: m.sender,
        timestamp: new Date(m.created_at)
      }));
      setMessages(formatted);
    } else {
      setMessages([welcomeMessage]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const getBotResponse = () => {
    const responses = [
      "That’s an interesting question! Tell me more.",
      "Career decisions take time — what are your interests?",
      "I can help with courses, stress, or college guidance.",
      "You're not alone — many students face this."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const saveMessage = async (message, sender) => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) return;

    await supabase.from("chat_messages").insert([
      {
        user_id: user.id,
        message,
        sender
      }
    ]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    saveMessage(inputMessage, "user");

    setInputMessage('');
    setIsTyping(true);

    setTimeout(async () => {
      const botText = getBotResponse();

      const botMsg = {
        id: Date.now() + 1,
        text: botText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
      saveMessage(botText, "bot");

      setIsTyping(false);
    }, 1200);
  };

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full"
      >
        💬
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-xl shadow-xl flex flex-col">
          {/* Header */}
          <div className="bg-indigo-600 text-white p-4 rounded-t-xl">
            AI Career Counsellor
            <button
              onClick={() => setIsOpen(false)}
              className="float-right"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(m => (
              <div
                key={m.id}
                className={`flex ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="bg-gray-100 px-3 py-2 rounded-lg max-w-xs">
                  <p>{m.text}</p>
                  <small>{formatTime(m.timestamp)}</small>
                </div>
              </div>
            ))}

            {isTyping && <p>Bot typing...</p>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t flex gap-2">
            <input
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyPress={e => e.key === "Enter" && handleSendMessage()}
              className="flex-1 border rounded px-3 py-2"
              placeholder="Type your question..."
            />

            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AICounsellingChatbot;
