function renderScreen(template) {
    window.application.root.textContent = '';
    if (window.application.nickName) {
        const title = document.querySelector('title');
        title.textContent = `Игра: <${window.application.nickName}>`;
    }
    const screen = templateEngine(template);
    window.application.root.appendChild(screen);
    return screen;
}

function onClickStartGame() {
    if (window.application.timerLobby) clearInterval(window.application.timerLobby);
    requests.startGame(window.application.token);
}

function renderLoginScreen() {
    const screen = renderScreen(LoginPageTemplate());
   
    const loginFormButton = screen.querySelector('.login-form__button');
    const nickName = screen.querySelector('.login-form__input');
    
    loginFormButton.addEventListener('click', (event) => {
        
        if (!nickName.value) return;  // do nothing if nothing entered
                                
        window.application.nickName = nickName.value;
        event.preventDefault();
        requests.login(nickName.value);
    });    
}

function renderLobbyScreen() {
    function _updatePlayerList() {
        requests.getPlayerList(window.application.token, (response) => {
            
            lobbyPlayersList.textContent = '';
            let i = 1;
            for(let player of response.list) {
                const playerElement = document.createElement('p');
                playerElement.textContent = player.login;
                lobbyPlayersList.appendChild(playerElement);
                i++;
                if (i > 5) break;  // to show 5 players
            }
            screen.style.display = '';  // to render the screen without delay (step 2)
        });    
    }

    const screen = renderScreen(LobbyPageTemplate());
    screen.style.display = 'none';  // to render the screen without delay (step 1)
                           
    const lobbyPlayersList = screen.querySelector('.lobby__players-list');
    
    _updatePlayerList();
    
    // sets an interval to check players in the lobby
    if (window.application.timerLobby) clearInterval(window.application.timer);
    window.application.timerLobby = setInterval(_updatePlayerList, window.application.timerInterval);

    setHandlers(screen);
}

function renderGameScreen() {
    const screen = renderScreen(GamePageTemplate(window.application.enemy));    
    setHandlers(screen);
}

function renderWaitingScreenNoEnemy() {
    renderWaitingScreen('NoEnemyYet', 'Ожидаем подключение соперника...');
}

function renderWaitingScreen(enemy, message) {
    renderScreen(WaitingPageTemplate(enemy, message));
    
    // sets an interval to wait for the enemy to connect or make a move
    if (window.application.timer) clearInterval(window.application.timer);
    window.application.timer = setInterval(requests.getGameStatus, window.application.timerInterval);
}

function renderFinalScreen(message) {
    const screen = renderScreen(FinalPageTemplate(window.application.enemy, message, 'Игра окончена'));    
    setHandlers(screen);
}

// sets event listeners to buttons
// identification on the first class in the element's classList !!!
function setHandlers(screen) {
    for(let child of screen.children) {
        setHandlers(child);
        const className = child.classList[0];
        const handler = getHandler(className);
        if (handler) child.addEventListener('click', handler);
    }
}

// return the handler function
function getHandler(handlerName) {
    if (handlerName in window.application.handlers) return window.application.handlers[handlerName];
    return undefined;
}
