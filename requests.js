class Requests {
    constructor(urlDomain) {
        this.urlDomain = urlDomain;

        this.login = this.login.bind(this);
        this.loginCallback = this.loginCallback.bind(this);

        this.getPlayerStatus = this.getPlayerStatus.bind(this);

        this.getPlayerList = this.getPlayerList.bind(this);
        
        this.getGameStatus = this.getGameStatus.bind(this);
        this.checkGameStatus = this.checkGameStatus.bind(this);

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
        // console.log(response);
        if (response.status !== 'ok') {
            console.log(response);
            renderLoginScreen();  // if an error go to the login screen
            return;
        }
        window.application.gameId = response['player-status'].game.id;
        this.getGameStatus(window.application.token, window.application.gameId);
    }
    
    getGameStatus(token, gameId, callback=this.gameStatusCallback) {
        const url = this.urlDomain + `game-status?token=${token}&id=${gameId}`;
        httpRequest({url, onSuccess: callback});
    }
    
    gameStatusCallback(response) {
        // console.log(response);
        if (response.status !== 'ok') {
            console.log(response);
            return;
        }
        
        // checking statuses if response.status == ok
        const status = response['game-status'].status
        if (status === 'waiting-for-start') {
            // console.log('no enemy yet');
            
            if (window.application.timer) {
                // console.log(window.application.counter++);
            } else renderWaitingScreenNoEnemy();

        } else if (status === 'waiting-for-enemy-move') {
            
            if (window.application.timer) {
                // console.log(window.application.counter++);
            } else {
                renderWaitingScreen(window.application.enemy, 'Ожидание хода соперника');
            }

        } else {
            // clearing timer for periodical checking the game status
            if (window.application.timer) {
                // console.log('deleting timer');
                // console.log(window.application);
                clearInterval(window.application.timer);
                window.application.timer = undefined;
                // window.application.counter = 0;
            }
            
            if (status === 'win') {
                renderFinalScreen('Вы выиграли!');
            
            } else if (status === 'lose') {
                renderFinalScreen('Вы проиграли!');
            
            } else {
                
                // console.log('render game screen');
                // console.log(`window.application.timer: ${window.application.timer}`);
                // console.log(`game-status: ${status}`)
                window.application.enemy = response['game-status'].enemy.login;
                renderGameScreen(window.application.enemy);    
            }
        }                
    }
    
    // to check game-status with a timer
    checkGameStatus() {
        this.getGameStatus(window.application.token, window.application.gameId);
    }
    
    play(token, gameId, move, callback=this.playCallback) {
        const url = this.urlDomain + `play?token=${token}&id=${gameId}&move=${move}`;
        httpRequest({url, onSuccess: callback});
    }
    
    playCallback(response) {
        // console.log(response);
        
        if (response.status === 'error') {
            console.log(response);
            return;
        }
        
        const status = response['game-status'].status;
        if (status === 'win') renderFinalScreen('Вы выиграли!');
        else if (status === 'lose') renderFinalScreen('Вы проиграли!');
        else this.getGameStatus(window.application.token, window.application.gameId);
    }
}
