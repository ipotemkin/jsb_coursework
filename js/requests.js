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
        const url = `${this.urlDomain}login?login=${loginName}`;
        httpRequest({url, onSuccess: callback});
    }

    loginCallback = response => {
        if (isErrorIn(response)) return;
        window.application.token = response.token;
        this.getPlayerStatus();
    }

    getPlayerList = callback => {
        const { token } = window.application;
        const url = `${this.urlDomain}player-list?token=${token}`;
        httpRequest({url, onSuccess: callback});
    }

    getPlayerStatus = (callback=this.getPlayerStatusCallback) => {
        const { token } = window.application;
        const url = `${this.urlDomain}player-status?token=${token}`;
        httpRequest({url, onSuccess: callback});
    }

    getPlayerStatusCallback = response => {
        if (isErrorIn(response)) return;
        if (response['player-status'].status === 'lobby') renderLobbyScreen();
        else {
            window.application.gameId = response['player-status'].game.id;
            this.getGameStatus(window.application.gameId);
        }
    }

    startGame = (token, callback=this.startGameCallback) => {
        const url = `${this.urlDomain}start?token=${token}`;
        httpRequest({url, onSuccess: callback});
    }

    startGameCallback = response => {
        if (isErrorIn(response)) return;
        
        window.application.gameId = response['player-status'].game.id;
        this.getGameStatus();
    }
    
    getGameStatus = (callback=this.gameStatusCallback) => {
        const { token, gameId } = window.application;
        const url =  `${this.urlDomain}game-status?token=${token}&id=${gameId}`;
        httpRequest({url, onSuccess: callback});
    }
    
    gameStatusCallback = response => {
        if (isErrorIn(response)) return;
        
        const { timer, enemy } = window.application;
        
        // checking statuses if response.status == ok
        const { status } = response['game-status']
        
        switch (status) {
            case 'waiting-for-start':
                // to render the screen only once while waiting
                if (!timer) renderWaitingScreenNoEnemy();
                break;

            case 'waiting-for-enemy-move':
                // to render the screen only once while waiting
                if (!timer) renderWaitingScreen(enemy, '???????????????? ???????? ??????????????????');
                break;

            default:
                // clearing timer for periodical checking the game status
                if (timer) {
                    clearInterval(window.application.timer);
                    window.application.timer = undefined;
                }
                if (!this.winOrLose(status)) {
                    window.application.enemy = response['game-status'].enemy.login;
                    renderGameScreen();    
                }              
        }        
    }
        
    play = (move, callback=this.playCallback) => {
        const { token, gameId } = window.application;
        const url = `${this.urlDomain}play?token=${token}&id=${gameId}&move=${move}`;
        httpRequest({url, onSuccess: callback});
    }
    
    playCallback = response => {
        if (isErrorIn(response)) return;
        
        const { status } = response['game-status'];
        if (!this.winOrLose(status)) this.getGameStatus();
    }

    winOrLose = (status) => {
        let result = true;
        
        if (status === 'win') renderFinalScreen('???? ????????????????!');
        else if (status === 'lose') renderFinalScreen('???? ??????????????????!');
        else result = false;
        
        return result;
    }
}
