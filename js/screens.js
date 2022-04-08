function renderScreen(template) {
    const { root } =  window.application;
    root.textContent = '';
    
    const title = document.querySelector('title');
    
    const { nickName } = window.application;
    title.textContent = nickName ? `Игра: <${nickName}>` : 'Игра';
    
    const screen = templateEngine(template);    
    root.appendChild(screen);
    return screen;
}

function onClickStartGame() {
    const { timerLobby, token } = window.application;
    if (timerLobby) clearInterval(timerLobby);
    requests.startGame(token);
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
    const { timerLobby, timerInterval } = window.application;
    if (timerLobby) clearInterval(timerLobby);
    window.application.timerLobby = setInterval(_updatePlayerList, timerInterval);

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
    const { timer, timerInterval } = window.application;
    if (timer) clearInterval(timer);
    window.application.timer = setInterval(requests.getGameStatus, timerInterval);
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
    const { handlers } = window.application;
    if (handlerName in handlers) return handlers[handlerName];
    return undefined;
}
