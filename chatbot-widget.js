(function () {
    // 1. Inject Phosphor Icons if not present
    if (!document.querySelector('script[src*="@phosphor-icons/web"]')) {
        const iconScript = document.createElement('script');
        iconScript.src = "https://unpkg.com/@phosphor-icons/web";
        document.head.appendChild(iconScript);
    }

    // 2. Inject CSS Styles
    const cssStyles = `
        /* Ultra 60fps Direct Button-to-Window Morphing Animations */
        @keyframes morphButtonToWindow {
            0% {
                width: 56px;
                height: 56px;
                border-radius: 28px;
            }
            45% {
                width: min(410px, calc(100vw - 48px));
                height: 56px;
                border-radius: 28px;
            }
            100% {
                width: min(410px, calc(100vw - 48px));
                height: min(580px, 82vh);
                border-radius: 28px;
            }
        }

        @keyframes morphWindowToButton {
            0% {
                width: min(410px, calc(100vw - 48px));
                height: min(580px, 82vh);
                border-radius: 28px;
            }
            55% {
                width: min(410px, calc(100vw - 48px));
                height: 56px;
                border-radius: 28px;
            }
            100% {
                width: 56px;
                height: 56px;
                border-radius: 28px;
            }
        }

        @keyframes innerFadeIn {
            0% {
                opacity: 0;
                transform: scale(0.97);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes msgPop {
            from {
                opacity: 0;
                transform: translateY(10px) scale(0.97);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .glass-morph-panel {
            transform-origin: bottom right;
            border-radius: 28px !important;
            overflow: hidden !important;
            will-change: width, height, opacity, filter;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            -webkit-mask-image: -webkit-radial-gradient(white, black);
            width: 56px;
            height: 56px;
            transition: box-shadow 0.3s ease;
        }

        .glass-morph-panel.is-closed {
            width: 56px !important;
            height: 56px !important;
            border-radius: 28px !important;
            cursor: pointer;
        }

        .glass-morph-panel.is-opening {
            animation: morphButtonToWindow 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .glass-morph-panel.is-closing {
            animation: morphWindowToButton 0.88s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .widget-content-wrapper {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            border-radius: 28px !important;
            overflow: hidden !important;
            transition: opacity 0.3s ease;
        }

        .glass-morph-panel.is-opening .widget-content-wrapper {
            animation: innerFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.42s forwards;
            opacity: 0;
            pointer-events: auto !important;
        }

        .glass-morph-panel.is-closing .widget-content-wrapper {
            opacity: 0 !important;
            pointer-events: none !important;
            transition: opacity 0.2s ease;
        }

        .animate-msg {
            animation: msgPop 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .chat-scroll::-webkit-scrollbar {
            width: 5px;
        }

        .chat-scroll::-webkit-scrollbar-track {
            background: transparent;
        }

        .chat-scroll::-webkit-scrollbar-thumb {
            background-color: rgba(148, 163, 184, 0.35);
            border-radius: 10px;
        }

        .chat-scroll::-webkit-scrollbar-thumb:hover {
            background-color: rgba(148, 163, 184, 0.6);
        }

        .typing-indicator span {
            display: inline-block;
            width: 6px;
            height: 6px;
            background-color: #475569;
            border-radius: 50%;
            margin: 0 2px;
            animation: bounce 1.4s infinite ease-in-out both;
        }

        .typing-indicator span:nth-child(1) {
            animation-delay: -0.32s;
        }

        .typing-indicator span:nth-child(2) {
            animation-delay: -0.16s;
        }

        @keyframes bounce {
            0%, 80%, 100% {
                transform: scale(0);
            }
            40% {
                transform: scale(1);
            }
        }

        /* Modern Frosted Glassmorphism Design System */
        .glass-widget {
            backdrop-filter: blur(28px) saturate(210%);
            -webkit-backdrop-filter: blur(28px) saturate(210%);
            border: 1.5px solid rgba(255, 255, 255, 0.6) !important;
            border-radius: 28px !important;
            overflow: hidden !important;
            -webkit-mask-image: -webkit-radial-gradient(white, black);
            box-shadow: 0 30px 70px rgba(0, 0, 0, 0.12), inset 0 1.5px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(255, 255, 255, 0.2) !important;
            transition: background-color 0.6s ease, background 0.6s ease, box-shadow 0.4s ease;
        }

        .glass-morph-panel.is-open {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.2) 100%) !important;
        }

        .glass-header {
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.35);
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%);
        }

        .glass-island-input {
            background: rgba(255, 255, 255, 0.35) !important;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.5) !important;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6) !important;
            transition: all 0.25s ease;
        }

        .glass-island-input:focus-within {
            background: rgba(255, 255, 255, 0.55) !important;
            border-color: rgba(255, 255, 255, 0.85) !important;
            box-shadow: 0 10px 40px rgba(14, 165, 233, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;
        }

        .glass-chip {
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.65);
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
        }

        .glass-chip:hover {
            background: rgba(255, 255, 255, 0.7);
            transform: translateY(-1.5px);
            border-color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }

        .glass-msg-bot {
            background: rgba(255, 255, 255, 0.45) !important;
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border: 1px solid rgba(255, 255, 255, 0.65) !important;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.7) !important;
        }

        .glass-msg-user {
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            box-shadow: 0 8px 25px rgba(14, 165, 233, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5) !important;
            border: 1px solid rgba(255, 255, 255, 0.45) !important;
        }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = cssStyles;
    document.head.appendChild(styleElement);

    // 3. Inject Chatbot DOM markup
    const chatContainer = document.createElement('div');
    chatContainer.id = 'n8n-chat-root';
    chatContainer.style.cssText = "position: fixed; bottom: 24px; right: 24px; z-index: 999999; font-family: 'Inter', sans-serif;";
    chatContainer.innerHTML = `
        <div id="n8n-morph-panel" class="glass-morph-panel glass-widget is-closed flex flex-col overflow-hidden relative cursor-pointer" style="background-color: rgba(1, 78, 113, 0.85);">
            <!-- Launcher Icon (Visible when closed) -->
            <div id="n8n-launcher-icon" class="absolute inset-0 flex items-center justify-center text-white transition-opacity duration-300 pointer-events-none">
                <i class="ph-bold ph-chat-teardrop-dots text-2xl"></i>
            </div>

            <!-- Chat Window Content Wrapper (Visible when open) -->
            <div id="n8n-content-wrapper" class="widget-content-wrapper flex flex-col h-full w-full opacity-0 pointer-events-none">
                <!-- Glass Header -->
                <div class="px-5 py-4 text-white flex justify-between items-center glass-header shrink-0" style="background-color: rgba(1, 78, 113, 0.45);">
                    <div class="flex items-center gap-3">
                        <div class="relative w-9 h-9 rounded-full bg-white/20 border border-white/40 flex items-center justify-center backdrop-blur-md shadow-sm shrink-0">
                            <i class="ph-bold ph-sparkle text-white text-base"></i>
                            <span class="absolute bottom-0 right-0 flex h-2.5 w-2.5">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-white"></span>
                            </span>
                        </div>
                        <div>
                            <h3 class="font-bold text-sm m-0 text-white drop-shadow-sm flex items-center gap-1.5">AI Support Chat</h3>
                            <p class="text-[11px] text-white/90 m-0 drop-shadow-sm font-medium">Online • Webhook Active</p>
                        </div>
                    </div>
                    <button id="n8n-chat-close" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 transition-all flex items-center justify-center text-white/90 hover:text-white cursor-pointer">
                        <i class="ph-bold ph-x text-base"></i>
                    </button>
                </div>

                <!-- Messages Container -->
                <div id="n8n-chat-box" class="flex-1 p-5 overflow-y-auto chat-scroll bg-transparent flex flex-col gap-4">
                    <div class="animate-msg max-w-[85%] rounded-2xl px-4 py-3 text-sm font-medium glass-msg-bot text-slate-800 self-start rounded-tl-xs">
                        Hello! How can I help you today?
                    </div>
                </div>

                <!-- Floating Island Input Area -->
                <div class="p-3 bg-transparent shrink-0">
                    <div class="glass-island-input rounded-2xl p-2 flex items-center gap-2">
                        <input type="text" id="n8n-user-input" class="flex-1 bg-transparent border-0 px-3 py-1.5 text-sm focus:outline-none text-slate-800 placeholder-slate-500 font-medium" placeholder="Type your message...">
                        <button id="n8n-send-btn" class="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all shrink-0 shadow-md hover:scale-105 active:scale-95 cursor-pointer" style="background-color: rgba(1, 78, 113, 0.85);">
                            <i class="ph-bold ph-paper-plane-right text-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    function mountWidget() {
        document.body.appendChild(chatContainer);
        initChatbotLogic();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mountWidget);
    } else {
        mountWidget();
    }

    // 4. Chatbot Functionality
    function initChatbotLogic() {
        const N8N_WEBHOOK_URL = "https://bluegill-sharing-unicorn.ngrok-free.app/webhook/2c0760c8-7997-497b-9fb5-a52a46018355";
        const themeColorHex = "#014e71";

        const morphPanel = document.getElementById("n8n-morph-panel");
        const launcherIcon = document.getElementById("n8n-launcher-icon");
        const contentWrapper = document.getElementById("n8n-content-wrapper");
        const chatBox = document.getElementById("n8n-chat-box");
        const userInput = document.getElementById("n8n-user-input");
        const sendBtn = document.getElementById("n8n-send-btn");
        const closeBtn = document.getElementById("n8n-chat-close");

        let isOpen = false;

        function hexToRgba(hex, alpha = 0.85) {
            let c = hex.replace('#', '');
            if (c.length === 3) c = c.split('').map(x => x + x).join('');
            const num = parseInt(c, 16);
            if (isNaN(num)) return hex;
            return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
        }

        function getSessionId() {
            let sessionId = sessionStorage.getItem("n8n_chat_session_id");
            if (!sessionId) {
                sessionId = "sess-" + Math.random().toString(36).substr(2, 9) + "-" + Date.now();
                sessionStorage.setItem("n8n_chat_session_id", sessionId);
            }
            return sessionId;
        }
        const currentSessionId = getSessionId();

        morphPanel.addEventListener('click', (e) => {
            if (!isOpen && !e.target.closest('#n8n-chat-close')) {
                toggleChat();
            }
        });

        closeBtn.addEventListener('click', (e) => {
            toggleChat(e);
        });

        userInput.addEventListener('keypress', (e) => {
            if (e.key === "Enter") {
                sendN8nMessage();
            }
        });

        sendBtn.addEventListener('click', () => {
            sendN8nMessage();
        });

        function toggleChat(e) {
            if (e) e.stopPropagation();
            isOpen = !isOpen;

            if (isOpen) {
                morphPanel.classList.remove('is-closed', 'is-closing');
                morphPanel.classList.add('is-opening', 'is-open');
                morphPanel.style.backgroundColor = '';
                morphPanel.style.cursor = 'default';
                launcherIcon.style.opacity = '0';
                setTimeout(() => userInput.focus(), 950);
            } else {
                morphPanel.classList.remove('is-opening');
                morphPanel.classList.add('is-closing');
                morphPanel.style.backgroundColor = hexToRgba(themeColorHex, 0.85);
                contentWrapper.style.opacity = '0';
                contentWrapper.style.pointerEvents = 'none';
                setTimeout(() => {
                    morphPanel.classList.add('is-closed');
                    morphPanel.classList.remove('is-opening', 'is-closing', 'is-open');
                    morphPanel.style.cursor = 'pointer';
                    launcherIcon.style.opacity = '1';
                }, 880);
            }
        }

        function appendN8nMessage(text, sender) {
            const messageDiv = document.createElement("div");
            messageDiv.className = `animate-msg max-w-[85%] rounded-2xl px-4 py-3 text-sm font-medium ${
                sender === "user" 
                    ? "glass-msg-user text-white self-end rounded-tr-xs" 
                    : "glass-msg-bot text-slate-800 self-start rounded-tl-xs"
            }`;
            if (sender === "user") {
                messageDiv.style.backgroundColor = hexToRgba(themeColorHex, 0.75);
            }
            messageDiv.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');

            chatBox.appendChild(messageDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        function showTypingIndicator() {
            const indicator = document.createElement('div');
            indicator.id = 'n8n-typing-indicator';
            indicator.className = 'animate-msg glass-msg-bot self-start rounded-2xl rounded-tl-xs px-4 py-3 typing-indicator flex items-center h-[42px]';
            indicator.innerHTML = `<span></span><span></span><span></span>`;
            chatBox.appendChild(indicator);
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        function hideTypingIndicator() {
            const indicator = chatBox.querySelector('#n8n-typing-indicator');
            if (indicator) indicator.remove();
        }

        // Detect source attribute from the script tag (e.g., source="arkonec.com" or data-source="arkonec.com")
        const currentScript = document.currentScript || document.querySelector('script[src*="chatbot-widget.js"]');
        const widgetSource = currentScript
            ? (currentScript.getAttribute('source') || currentScript.getAttribute('data-source') || "arkonec.com")
            : "arkonec.com";

        async function sendN8nMessage() {
            const message = userInput.value.trim();
            if (!message) return;

            appendN8nMessage(message, "user");
            userInput.value = "";
            userInput.disabled = true;
            sendBtn.disabled = true;

            showTypingIndicator();

            try {
                const response = await fetch(N8N_WEBHOOK_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true"
                    },
                    body: JSON.stringify({
                        chatInput: message,
                        sessionId: currentSessionId,
                        source: widgetSource
                    })
                });

                hideTypingIndicator();

                if (!response.ok) {
                    throw new Error(`Server returned status: ${response.status}`);
                }

                const rawText = await response.text();

                let data;
                try {
                    data = JSON.parse(rawText);
                } catch (parseError) {
                    console.error("🚨 n8n sent invalid JSON. Raw response was:", rawText);
                    appendN8nMessage("Error: The server sent a broken response.", "ai");
                    return;
                }

                if (data.output) {
                    appendN8nMessage(data.output, "ai");
                } else if (typeof data === 'string') {
                    appendN8nMessage(data, "ai");
                } else {
                    console.warn("n8n response didn't contain an 'output' key:", data);
                    appendN8nMessage("Received a response, but couldn't find the message.", "ai");
                }

            } catch (error) {
                hideTypingIndicator();
                console.error("Error:", error);
                appendN8nMessage("Sorry, I couldn't connect to the server.", "ai");
            } finally {
                userInput.disabled = false;
                sendBtn.disabled = false;
                if (isOpen) userInput.focus();
            }
        }
    }
})();
