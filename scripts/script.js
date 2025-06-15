// Global variables
        let messages = [];
        let isLoading = false;

        // Initialize the app
        document.addEventListener('DOMContentLoaded', function() {
            initializeStars();
            setupEventListeners();
        });

        // Create animated stars background
        function initializeStars() {
            const starsContainer = document.getElementById('stars');
            const numberOfStars = 50;

            for (let i = 0; i < numberOfStars; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                star.style.width = (Math.random() * 2 + 1) + 'px';
                star.style.height = star.style.width;
                starsContainer.appendChild(star);
            }
        }

        // Setup event listeners
        function setupEventListeners() {
            const messageInput = document.getElementById('messageInput');
            const sendButton = document.getElementById('sendButton');

            // Enter key handler
            messageInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });

            // Input change handler
            messageInput.addEventListener('input', function() {
                const hasText = this.value.trim().length > 0;
                sendButton.disabled = !hasText || isLoading;
            });
        }

        // Send message function
        function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            
            if (!message || isLoading) return;

            // Hide welcome screen
            document.getElementById('welcomeScreen').classList.add('hidden');

            // Add user message
            addMessage(message, true);
            
            // Clear input
            input.value = '';
            document.getElementById('sendButton').disabled = true;
            
            // Show loading and get bot response
            showLoading();
            getBotResponse(message);
        }

        // Ask suggested question
        function askQuestion(question) {
            document.getElementById('messageInput').value = question;
            sendMessage();
        }

        // Add message to chat
        function addMessage(text, isUser = false) {
            const chatContainer = document.getElementById('chatContainer');
            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
            
            let messageHTML = `
                <div class="message-bubble">
                    ${!isUser ? `
                        <div class="bot-header">
                            <div class="bot-avatar">
                                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <span class="bot-name">AstroBuddy</span>
                        </div>
                    ` : ''}
                    <div class="message-text">${text}</div>
                    <div class="message-time">${timestamp}</div>
                </div>
            `;
            
            messageDiv.innerHTML = messageHTML;
            chatContainer.appendChild(messageDiv);
            
            // Scroll to bottom
            chatContainer.scrollTop = chatContainer.scrollHeight;
            
            messages.push({ text, isUser, timestamp });
        }

        // Show loading indicator
        function showLoading() {
            const chatContainer = document.getElementById('chatContainer');
            
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'loading-message';
            loadingDiv.id = 'loadingIndicator';
            
            loadingDiv.innerHTML = `
                <div class="loading-bubble">
                    <div class="bot-header">
                        <div class="bot-avatar">
                            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <span class="bot-name">AstroBuddy</span>
                    </div>
                    <div class="loading-content">
                        <div class="loading-dots">
                            <div class="loading-dot"></div>
                            <div class="loading-dot"></div>
                            <div class="loading-dot"></div>
                        </div>
                        <span class="loading-text">Thinking...</span>
                    </div>
                </div>
            `;
            
            chatContainer.appendChild(loadingDiv);
            chatContainer.scrollTop = chatContainer.scrollHeight;
            
            isLoading = true;
            document.getElementById('messageInput').disabled = true;
            document.getElementById('sendButton').disabled = true;
        }

        // Hide loading indicator
        function hideLoading() {
            const loadingIndicator = document.getElementById('loadingIndicator');
            if (loadingIndicator) {
                loadingIndicator.remove();
            }
            
            isLoading = false;
            document.getElementById('messageInput').disabled = false;
            document.getElementById('sendButton').disabled = false;
        }

        // Get bot response (mock API call)
        async function getBotResponse(message) {
            try {
                // TODO: Replace with actual API call to your Flask backend
                // const response = await fetch('/api/ask', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({ message: message })
                // });
                // const data = await response.json();
                // const botResponse = data.response;
                
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Mock responses based on keywords
                const lowerMessage = message.toLowerCase();
                let botResponse = "";
                
                if (lowerMessage.includes('black hole')) {
                    botResponse = "A black hole is a region in space where gravity is so strong that nothing, not even light, can escape once it crosses the event horizon. Think of it like a cosmic vacuum cleaner that's incredibly powerful! 🕳️✨";
                } else if (lowerMessage.includes('star')) {
                    botResponse = "Stars are massive, glowing balls of gas that produce light and heat through nuclear fusion. They're like giant cosmic furnaces that burn hydrogen to create energy! Our Sun is actually a medium-sized star. ⭐";
                } else if (lowerMessage.includes('mars')) {
                    botResponse = "Mars appears red because of iron oxide (rust) on its surface! The planet is covered in rusty dust and rocks, giving it that distinctive reddish color. It's like a giant rusty desert in space! 🔴🪐";
                } else if (lowerMessage.includes('moon')) {
                    botResponse = "A moon is a natural satellite that orbits a planet. Our Moon was likely formed when a Mars-sized object collided with early Earth! It's responsible for our ocean tides and helps stabilize Earth's rotation. 🌙";
                } else if (lowerMessage.includes('planet')) {
                    botResponse = "A planet is a large celestial body that orbits a star and has cleared its orbital path of other objects. Unlike moons, planets orbit stars directly. There are 8 planets in our solar system, each with unique characteristics! 🪐";
                } else {
                    botResponse = "That's a fascinating question about space! The universe is full of amazing phenomena. Each cosmic object and event has its own unique story and scientific explanation. What specific aspect would you like to explore further? 🌌";
                }
                
                hideLoading();
                addMessage(botResponse, false);
                
            } catch (error) {
                console.error('Error calling API:', error);
                hideLoading();
                addMessage("I'm having trouble connecting to my cosmic database right now. Please try again in a moment! 🛸", false);
            }
        }

        // Add some CSS animations dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .message {
                animation: slideIn 0.3s ease-out;
            }
        `;
        document.head.appendChild(style);