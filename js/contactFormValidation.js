const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EMPTY_STRING = '';

validateForm();

function validateForm() {

    const visitorName = document.getElementById('name');
    const visitorEmail = document.getElementById('email');
    const visitorMessage = document.getElementById('message');
    
    const nameErr = document.getElementById('nameErr');
    const emailErr = document.getElementById('emailErr');
    const messageErr = document.getElementById('messageErr');

    visitorName.addEventListener('input', () => {
        if (0 === visitorName.value.length || null === visitorName.value) {
            nameErr.innerText = '*Please do not leave name section empty*';
        } else if (checkForBlankString(visitorName.value)) {
            nameErr.innerText = '*Please do not leave name section blank*';
        } else {
            nameErr.innerText = EMPTY_STRING;
        }
    })

    visitorEmail.addEventListener('change', () => {
        if (0 === visitorEmail.value.length || null === visitorEmail.value) {
            emailErr.innerText = '*Please do not leave email section empty*';
            return;
        }
        emailErr.innerText = (REGEX_EMAIL.test(visitorEmail.value)) ? EMPTY_STRING : '*Please enter valid email format*';
    })

    visitorMessage.addEventListener('change', () => {
        if (0 === visitorMessage.value.length || null === visitorMessage.value) {
            messageErr.innerText = '*Please do not leave message section empty*';
        } else if (checkForBlankString(visitorMessage.value)) {
            nameErr.innerText = '*Please do not leave message section blank*';
        } else {
            messageErr.innerText = (visitorMessage.value.length < 10) ? '*At least 10 words are required*' : EMPTY_STRING;
        }
    })
}

function checkForBlankString(string) {
    let j = 0;
    const length = string.length;
    for (let i = 0; i < length; i++) {
        if (EMPTY_STRING === string.charAt(i)) {
            j++;
        }
    }
    return length === j;
}