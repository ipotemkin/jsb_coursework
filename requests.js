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

        this.login = this.login.bind(this);
        this.loginCallback = this.loginCallback.bind(this);

        this.getPlayerStatus = this.getPlayerStatus.bind(this);

        this.getPlayerList = this.getPlayerList.bind(this);
        
        this.getGameStatus = this.getGameStatus.bind(this);

        this.play = this.play.bind(this);
        this.playCallback = this.playCallback.bind(this);
        
        this.startGame = this.startGame.bind(this);
        this.startGameCallback = this.startGameCallback.bind(this);
    }
    login(loginName, callback=this.loginCallback) {
        const url = this.urlDomain + `login?login=${loginName}`;
        httpRequest({url, onSuccess: callback});
    }
    loginCallback(response) {
        // console.log(response);

        if (response.status === 'ok') {
            window.application.token = response.token;
            this.getPlayerStatus(window.application.token, (response) => {
                // console.log(response);
                if (response.status !== 'ok') {
                    console.log(response);
                    return;
                }
                if (response['player-status'].status === 'lobby') renderLobbyScreen();
                else {
                    window.application.gameId = response['player-status'].game.id;
                    this.getGameStatus(window.application.token, window.application.gameId);
                }
                // console.log(window.application.token);                    
            });
        }
    }
    getPlayerList(token, callback) {
        const url = this.urlDomain + `player-list?token=${token}`;
        httpRequest({url, onSuccess: callback});
    }
    getPlayerStatus(token, callback) {
        const url = this.urlDomain + `player-status?token=${token}`;
        httpRequest({url, onSuccess: callback});
    }
    startGame(token, callback=this.startGameCallback) {
        const url = this.urlDomain + `start?token=${token}`;
        httpRequest({url, onSuccess: callback});
    }
    startGameCallback(response) {
        if (isErrorIn(response)) return;
        
        window.application.gameId = response['player-status'].game.id;
        this.getGameStatus();
    }
    
    getGameStatus(callback=this.gameStatusCallback) {
        const url = this.urlDomain + `game-status?token=${window.application.token}&id=${window.application.gameId}`;
        httpRequest({url, onSuccess: callback});
    }
    
    gameStatusCallback(response) {
        if (isErrorIn(response)) return;
        
        // checking statuses if response.status == ok
        const status = response['game-status'].status
        if (status === 'waiting-for-start') {
            
            // to render the screen only once while waiting
            if (!window.application.timer) renderWaitingScreenNoEnemy();

        } else if (status === 'waiting-for-enemy-move') {
            
            // to render the screen only once while waiting
            if (!window.application.timer) renderWaitingScreen(window.application.enemy, 'Ожидание хода соперника');

        } else {
            
            // clearing timer for periodical checking the game status
            if (window.application.timer) {
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
        
    play(move, callback=this.playCallback) {
        const url = this.urlDomain + `play?token=${window.application.token}&id=${window.application.gameId}&move=${move}`;
        httpRequest({url, onSuccess: callback});
    }
    
    playCallback(response) {
        if (isErrorIn(response)) return;
        
        const status = response['game-status'].status;
        if (status === 'win') renderFinalScreen('Вы выиграли!');
        else if (status === 'lose') renderFinalScreen('Вы проиграли!');
        else this.getGameStatus();
    }
}
