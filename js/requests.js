// error checker and handler
function isErrorIn(response) {
    if (response.status === 'ok') return false;
    
    console.log(response);
    renderLoginScreen();  // if an error go to the login screen
    return true;
}


class Requests {
    constructor(urlDomain) {
        this.urlDomain = urlDomain;
    }

    login = (loginName, callback=this.loginCallback) => {
        const url = this.urlDomain + `login?login=${loginName}`;
        httpRequest({url, onSuccess: callback});
    }

    loginCallback = response => {
        if (isErrorIn(response)) return;
        window.application.token = response.token;
        const { token } = window.application;
        this.getPlayerStatus(token, (response) => {
            if (isErrorIn(response)) return;
            if (response['player-status'].status === 'lobby') renderLobbyScreen();
            else {
                window.application.gameId = response['player-status'].game.id;
                this.getGameStatus(token, window.application.gameId);
            }
        });
    }

    getPlayerList = (token, callback) => {
        const url = this.urlDomain + `player-list?token=${token}`;
        httpRequest({url, onSuccess: callback});
    }

    getPlayerStatus = (token, callback) => {
        const url = this.urlDomain + `player-status?token=${token}`;
        httpRequest({url, onSuccess: callback});
    }

    startGame = (token, callback=this.startGameCallback) => {
        const url = this.urlDomain + `start?token=${token}`;
        httpRequest({url, onSuccess: callback});
    }

    startGameCallback = response => {
        if (isErrorIn(response)) return;
        
        window.application.gameId = response['player-status'].game.id;
        this.getGameStatus();
    }
    
    getGameStatus = (callback=this.gameStatusCallback) => {
        const { token, gameId } = window.application;
        const url = this.urlDomain + `game-status?token=${token}&id=${gameId}`;
        httpRequest({url, onSuccess: callback});
    }
    
    gameStatusCallback = response => {
        if (isErrorIn(response)) return;
        
        const { timer } = window.application;
        
        // checking statuses if response.status == ok
        const status = response['game-status'].status
        if (status === 'waiting-for-start') {
            
            // to render the screen only once while waiting
            if (!timer) renderWaitingScreenNoEnemy();

        } else if (status === 'waiting-for-enemy-move') {
            
            // to render the screen only once while waiting
            if (!timer) renderWaitingScreen(window.application.enemy, 'Ожидание хода соперника');

        } else {
            
            // clearing timer for periodical checking the game status
            if (timer) {
                clearInterval(window.application.timer);
                window.application.timer = undefined;
            }
            
            if (status === 'win') renderFinalScreen('Вы выиграли!');
            else if (status === 'lose') renderFinalScreen('Вы проиграли!');
            else {                
                window.application.enemy = response['game-status'].enemy.login;
                renderGameScreen();    
            }
        }                
    }
        
    play = (move, callback=this.playCallback) => {
        const { token, gameId } = window.application;
        const url = this.urlDomain + `play?token=${token}&id=${gameId}&move=${move}`;
        httpRequest({url, onSuccess: callback});
    }
    
    playCallback = response => {
        if (isErrorIn(response)) return;
        
        const status = response['game-status'].status;
        if (status === 'win') renderFinalScreen('Вы выиграли!');
        else if (status === 'lose') renderFinalScreen('Вы проиграли!');
        else this.getGameStatus();
    }
}
