function renderScreen(template) {
    window.application.root.textContent = '';
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
                           
    // const lobbyButtonStartGame = screen.querySelector('.lobby__button');
    // const lobbyButtonLogout = screen.querySelector('.lobby__button-logout');
    const lobbyPlayersList = screen.querySelector('.lobby__players-list');
    
    _updatePlayerList();
    
    if (window.application.timerLobby) clearInterval(window.application.timer);
    window.application.timerLobby = setInterval(_updatePlayerList, window.application.timerInterval);
        
    // lobbyButtonStartGame.addEventListener('click', () => {
    //     if (window.application.timerLobby) clearInterval(window.application.timerLobby);
    //     requests.startGame(window.application.token);
    // });

    // lobbyButtonLogout.addEventListener('click', () => {
    //     if (window.application.timerLobby) clearInterval(window.application.timerLobby);
    //     renderLoginScreen();
    // });
    
    setHandlers(screen);
}

function renderGameScreen() {
    const screen = renderScreen(GamePageTemplate(window.application.enemy));
                           
    // const buttonRock = screen.querySelector('.game__button-rock');
    // const buttonScissors = screen.querySelector('.game__button-scissors');
    // const buttonPaper = screen.querySelector('.game__button-paper');

    // buttonRock.addEventListener('click', () => {requests.play('rock');});
    // buttonScissors.addEventListener('click', () => {requests.play('scissors');});
    // buttonPaper.addEventListener('click', () => {requests.play('paper');});
    
    setHandlers(screen);
}

function renderWaitingScreenNoEnemy() {
    renderWaitingScreen('NoEnemyYet', 'Ожидаем подключение соперника...');
}

function renderWaitingScreen(enemy, message) {
    renderScreen(WaitingPageTemplate(enemy, message));
    if (window.application.timer) clearInterval(window.application.timer);
    window.application.timer = setInterval(requests.getGameStatus, window.application.timerInterval);
}

function renderFinalScreen(message) {
    const screen = renderScreen(FinalPageTemplate(window.application.enemy, message, 'Игра окончена'));

    // const buttonPlayAgain = screen.querySelector('.final__button-play-again');
    // const buttonLobby = screen.querySelector('.final__button-lobby');

    // buttonPlayAgain.addEventListener('click', () => {requests.startGame(window.application.token);});
    // buttonLobby.addEventListener('click', () => {renderLobbyScreen();});
    
    setHandlers(screen);
}

function setHandlers(screen) {
    for(let child of screen.children) {
        setHandlers(child);
        const className = child.classList[0];
        const handler = getHandler(className);
        if (handler) child.addEventListener('click', handler);
    }
}

function getHandler(handlerName) {
    if (handlerName in window.application.handlers) return window.application.handlers[handlerName];
    return undefined;
}
