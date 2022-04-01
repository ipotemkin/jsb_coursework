function LoginPageTemplate() {
    return {
        tag: 'div',
        cls: 'app',
        content: [
            {
                tag: 'h2',
                content: 'Камень-ножницы-бумага'
            },
            {
                tag: 'h3',
                content: 'Экран входа',
            },
            {
                tag: 'input',
                cls: 'login-form__input',
                content: 'input text',
                attrs: {
                    placeholder: 'You nickname'
                }
            },
            {
                tag: 'button',
                cls: 'login-form__button',
                content: 'Войти'
            },
            {
                tag: 'button',
                cls: 'login-form__game-status',
                content: 'Статус игры'
            }
        ]
    }
}

function LobbyPageTemplate() {
    return {
        tag: 'div',
        cls: 'app',
        content: [
            {
                tag: 'h2',
                content: 'Лобби'
            },
            {
                tag: 'div',
                cls: 'lobby__players-list',
            },
            // // {
            // //     tag: 'h3',
            // //     content: 'Экран входа',
            // // },
            // {
            //     tag: 'input',
            //     content: 'input text',
            //     attrs: {
            //         placeholder: 'You nickname'
            //     }
            // },
            {
                tag: 'button',
                cls: 'lobby__button',
                content: 'Играть!'
            }
        ]
    }
}

function GamePageTemplate(enemy) {
    return {
        tag: 'div',
        cls: 'app',
        content: [
            {
                tag: 'h2',
                content: 'Игра'
            },
            {
                tag: 'h3',
                content: `Вы против <${enemy}>`,
            },
            {
                tag: 'button',
                cls: 'game__button-stone',
                content: 'Камень'
            },
            {
                tag: 'button',
                cls: 'game__button-scissors',
                content: 'Ножницы'
            },
            {
                tag: 'button',
                cls: 'game__button-paper',
                content: 'Бумага'
            }
        ]
    }
}

function WaitingPageTemplate(rival, message) {
    const rival_str = rival === 'NoEnemyYet' ? '' : `Вы против <${rival}>`
    return {
        tag: 'div',
        cls: 'app',
        content: [
            {
                tag: 'h2',
                content: 'Игра'
            },
            {
                tag: 'h3',
                content: rival_str,
            },
            {
                tag: 'h2',
                content: message,
            },
        ]
    }
}

function FinalPageTemplate(rival, message) {
    return {
        tag: 'div',
        cls: 'app',
        content: [
            {
                tag: 'h2',
                content: 'Игра'
            },
            {
                tag: 'h3',
                content: `Вы против <${rival}>`,
            },
            {
                tag: 'h2',
                content: message,
            },
            {
                tag: 'button',
                content: 'Играть еще!'
            },
            {
                tag: 'button',
                content: 'В лобби'
            },

        ]
    }
}



function beerEngineTemplate(beer) {
    return {
        tag: 'div',
        cls: 'beer',
        content: [{
            tag: 'div',
            cls: 'beer__image-container',
            attrs: {
                style: `background-image: url(${beer.image_url});`,
            }
        },
        {
            tag: 'div',
            cls: 'beer__info',
            content: [
                {
                    tag: 'div',
                    cls: 'beer__info-top',
                    content: [
                        {
                            tag: 'div',
                            cls: 'beer__beer-name',
                            content: trunc(beer.name, 40)
                        },
                        {
                            tag: 'div',
                            cls: 'beer__beer-tagline',
                            content: trunc(beer.tagline, 62)
                        },
                        {
                            tag: 'div',
                            cls: 'beer__beer-description',
                            content: trunc(beer.description, 150)
                        }
                    ]
                },
                {
                    tag: 'div',
                    cls: 'beer__beer-abv',
                    content: `alc/vol: ${beer.abv}%`
                }
            ]
        }]
    }
}
