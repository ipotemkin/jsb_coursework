function clearScreen() {
    window.application.root.textContent = '';
    console.log(window.application.root);
}

function renderLoginScreen() {
    clearScreen();
    const screen = templateEngine(LoginPageTemplate());
    app.appendChild(screen);
   
    const loginFormButton = document.querySelector('.login-form__button');
    const nickName = document.querySelector('.login-form__input');
    const gameStatusButton = document.querySelector('.login-form__game-status');

    gameStatusButton.addEventListener('click', () => {
        getGameStatus(window.application.token, (response) => {
            console.log(response);
        });
    });
    
    loginFormButton.addEventListener('click', () => {
        console.log('click');
        
        if (!nickName.value) return;
        
        console.log(nickName.value);
        
        // const url = 'https://skypro-rock-scissors-paper.herokuapp.com/player-status?token=4b18f75d-d6b5-4f47-b986-b7bf884089ef'
        // const url = urlDomain + 'ping';
                        
        requests.login(nickName.value, (response) => {
            console.log(response);

            if (response.status === 'ok') {
                window.application.token = response.token;
                renderLobbyScreen();
            }
            
            console.log(window.application.token);                    
        });
    });
    
}

function renderLobbyScreen() {
    clearScreen();
    const screen = templateEngine(LobbyPageTemplate());
    app.appendChild(screen);
                           
    const lobbyButton = document.querySelector('.lobby__button');
    const lobbyPlayersList = document.querySelector('.lobby__players-list');
    
    requests.getPlayerList(window.application.token, (response) => {
        console.log(response);
        let i = 1;
        for(let player of response.list) {
            const playerElement = document.createElement('p');
            playerElement.textContent = player.login;
            lobbyPlayersList.appendChild(playerElement);
            i++;
            if (i > 3) break;
        }
    });
    
    
    lobbyButton.addEventListener('click', () => {
        console.log('lobby button click');

        requests.startGame(window.application.token, (response) => {
            console.log(response);
            if (response.status !== 'ok') {
                console.log('ошибка');
                // requests.getGameStatus(window.application.token, (response) => {
                // console.log(response);
                // });
                return;
            }
            window.application.gameId = response['player-status'].game.id;
            requests.getGameStatus(window.application.token, window.application.gameId, (response) => {
                console.log(response);
                if (response.status !== 'ok') {
                    console.log(response);
                    return;
                }
                window.application.enemy = response['game-status'].enemy.login;
                renderGameScreen(window.application.enemy);
            });
        });

    });
    
}

function renderGameScreen(enemy) {
    clearScreen();
    const screen = templateEngine(GamePageTemplate(enemy));
    app.appendChild(screen);
                           
    const buttonStone = document.querySelector('.game__button-stone');
    const buttonScissors = document.querySelector('.game__button-scissors');
    const buttonPaper = document.querySelector('.game__button-paper');

    buttonStone.addEventListener('click', () => {
        console.log('stone');
    });

    buttonScissors.addEventListener('click', () => {
        console.log('scissors');
    });

    buttonPaper.addEventListener('click', () => {
        console.log('paper');
    });        
}
