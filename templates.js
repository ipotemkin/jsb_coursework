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

function GamePageTemplate() {
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
                content: 'Вы против <Игрок 2>',
            },
            // {
            //     tag: 'input',
            //     content: 'input text',
            //     attrs: {
            //         placeholder: 'You nickname'
            //     }
            // },
            {
                tag: 'button',
                content: 'Камень'
            },
            {
                tag: 'button',
                content: 'Ножницы'
            },
            {
                tag: 'button',
                content: 'Бумага'
            }
        ]
    }
}

function WaitingPageTemplate(rival, message) {
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
