function clearScreen() {
    window.application.root.textContent = '';
    // console.log(window.application.root);
}

function renderLoginScreen() {
    clearScreen();
    const screen = templateEngine(LoginPageTemplate());
    app.appendChild(screen);
   
    const loginFormButton = document.querySelector('.login-form__button');
    const nickName = document.querySelector('.login-form__input');
    
    loginFormButton.addEventListener('click', () => {
        
        if (!nickName.value) return;
                                
        window.application.nickName = nickName.value;
        requests.login(nickName.value);
    });
    
}

function renderLobbyScreen() {

    function _updatePlayerList() {
        requests.getPlayerList(window.application.token, (response) => {
            // console.log(response);
            
            lobbyPlayersList.textContent = '';
            let i = 1;
            for(let player of response.list) {
                const playerElement = document.createElement('p');
                playerElement.textContent = player.login;
                lobbyPlayersList.appendChild(playerElement);
                i++;
                if (i > 5) break;
            }
            screen.style.display = '';  // to render the screen without delay (step 2)
        });    
    }

    clearScreen();
    const screen = templateEngine(LobbyPageTemplate());
    screen.style.display = 'none';  // to render the screen without delay (step 1)
    app.appendChild(screen);
                           
    const lobbyButtonStartGame = document.querySelector('.lobby__button');
    const lobbyButtonLogout = document.querySelector('.lobby__button-logout');
    const lobbyPlayersList = document.querySelector('.lobby__players-list');
    
    _updatePlayerList();
    
    if (window.application.timerLobby) {
        // console.log('lobby screen: deleting timer');
        clearInterval(window.application.timer);
    }
    window.application.timerLobby = setInterval(_updatePlayerList, 3000);
        
    lobbyButtonStartGame.addEventListener('click', () => {
        // console.log('lobby button click');
        if (window.application.timerLobby) {
            // console.log('lobby screen start-game-button: deleting timer');
            clearInterval(window.application.timerLobby);
        }
        requests.startGame(window.application.token);
    });

    lobbyButtonLogout.addEventListener('click', () => {
        if (window.application.timerLobby) clearInterval(window.application.timerLobby);
        renderLoginScreen();
    });
    
}

function renderGameScreen(enemy) {
    clearScreen();
    const screen = templateEngine(GamePageTemplate(enemy));
    app.appendChild(screen);
                           
    const buttonRock = document.querySelector('.game__button-rock');
    const buttonScissors = document.querySelector('.game__button-scissors');
    const buttonPaper = document.querySelector('.game__button-paper');

    buttonRock.addEventListener('click', () => {
        // console.log('rock');
        requests.play(window.application.token, window.application.gameId, 'rock');
    });

    buttonScissors.addEventListener('click', () => {
        // console.log('scissors');
        requests.play(window.application.token, window.application.gameId, 'scissors');
    });

    buttonPaper.addEventListener('click', () => {
        // console.log('paper');
        requests.play(window.application.token, window.application.gameId, 'paper');
    });
}

function renderWaitingScreenNoEnemy() {
    renderWaitingScreen('NoEnemyYet', 'Ожидаем подключение соперника...');
}

function renderWaitingScreen(enemy, message) {
    clearScreen();
    const screen = templateEngine(WaitingPageTemplate(enemy, message));
    app.appendChild(screen);
    if (window.application.timer) {
        // console.log('waiting screen: deleting timer');
        clearInterval(window.application.timer);
    }
    window.application.timer = setInterval(requests.checkGameStatus, 3000);
}

function renderFinalScreen(message) {
    clearScreen();
    const screen = templateEngine(FinalPageTemplate(window.application.enemy, message));
    app.appendChild(screen);

    const buttonPlayAgain = document.querySelector('.final__button-play-again');
    const buttonLobby = document.querySelector('.final__button-lobby');

    buttonPlayAgain.addEventListener('click', () => {
        requests.startGame(window.application.token);
    });

    buttonLobby.addEventListener('click', () => {
        renderLobbyScreen();
    });
}
