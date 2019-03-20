const DataHandler = function () {

    let
        rawTemplate,
        template,
        clickCount,
        next,
        prev,
        slider,
        slideList,
        dataLength;

    const _init = function () {
        rawTemplate = document.getElementById('template').innerHTML;
        template = Handlebars.compile(rawTemplate);
        slider = document.querySelector('.slider');
        slideList = document.querySelector('.slider__list');
        next = document.querySelector('.slider__nav--next');
        prev = document.querySelector('.slider__nav--prev');
        clickCount = 0;
        dataLength = 0;

        slider.classList.add('is-loading');
        _addEventHandlers();
        _setActiveNav();
        _getData();
    }

    const _addEventHandlers = function () {
        next.addEventListener('click', _getNext, false);
        prev.addEventListener('click', _getPrev, false);
        window.addEventListener('fetch', () => {
            console.log('fetch')
        }, false)
    }

    const _getData = function () {
        fetch("https://api.petfinder.com/v2/oauth2/token", {
                body: "grant_type=client_credentials&client_id=7vPkOzV32lbGFsqbixmd6GU4C5fy4YZfzoeQIssKaQqWeRz7ze&client_secret=PrtarLPlKWCLgUiEITq7EuiC2BmNnm8GOOmNb9d2",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST"
            }).then(async function (response) {
                let a = await response.json()
                console.log(a.access_token)

                const petUrl = 'https://api.petfinder.com/v2/animals?type=dog&location=07097';
                fetch( petUrl, {
                        headers: {
                            Authorization: `Bearer  ${a.access_token}`
                        }
                    }).then(response => {
                        return response.json()
                    })
                    .then(json => {
                        dataLength = json.length;
                        _populateTemplate(json);
                        _setActiveNav();
                    })

            })
            .catch(ex => {
                console.log('parsing failed', ex)
            })
    };

    const _setActiveNav = function () {

        if (clickCount > 0) {
            prev.classList.add('is-active');
            prev.classList.remove('is-inActive');
        } else {
            prev.classList.remove('is-active');
            prev.classList.add('is-inActive');
        }
    }

    const _getNext = function () {
        clickCount++;
        if (clickCount >= dataLength) {
            clickCount = 0;
        }
        _isLoading();
        setTimeout(() => {
            _getData();
        }, 300);
    }

    const _getPrev = function () {
        if (clickCount > 0) {
            clickCount--;
            _isLoading();
            setTimeout(() => {
                _getData();
            }, 300);
        }
    }

    const _populateTemplate = function (data) {
        var html = template(data.animals[clickCount]);
        slideList.innerHTML = '';
        slideList.innerHTML += html;
        console.log(template);
        setTimeout(() => {
            slider.classList.remove('is-loading')
            const currentCard = document.querySelectorAll('.slider__card')[0];
            currentCard.classList.add('is-active');
        }, 300);
    }

    const _isLoading = function () {
        slider.classList.add('is-loading')
        const currentCard = document.querySelectorAll('.slider__card')[0];
        currentCard.classList.remove('is-active');
        currentCard.classList.add('is-loading');
    }

    return {
        init: _init
    }
}();

DataHandler.init();