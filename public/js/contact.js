const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EMPTY_STRING = '';

const visitorName = document.getElementById('name');
const visitorEmail = document.getElementById('email');
const visitorMessage = document.getElementById('message');

const nameErr = document.getElementById('nameErr');
const emailErr = document.getElementById('emailErr');
const messageErr = document.getElementById('messageErr');

const modal = document.getElementById('messageBackground');
const span = document.getElementById('close-msg');

const waiting = document.getElementById('waitingBackground');
const closeWaiting = document.getElementById('close-waiting');

let nameValid = false, emailValid = false, msgValid = false;

const closeNotification = () => {
    span.addEventListener('click', () => {modal.style.display = 'none';});
    window.addEventListener('click', event => {if (event.target === modal) {modal.style.display = 'none';}});
};

const closeWaitingNotification = () => {
    closeWaiting.addEventListener('click', () => {waiting.style.display = 'none'});
    window.addEventListener('click', event => {if (event.target === waiting) {waiting.style.display = 'none';}});
};

const checkForBlankString = (string) => {
    let j = 0;
    const length = string.length;
    for (let i = 0; i < length; i++) {
        if (EMPTY_STRING === string.charAt(i)) {
            j++;
        }
    }
    return length === j;
};

const validateForm = () => {

    visitorName.addEventListener('input', () => {
        if (undefined === visitorName.value || visitorName.value.length === 0 || visitorName.value === null) {
            nameErr.innerText = '*Please do not leave name section empty*';
            nameValid = false;
        } else if (checkForBlankString(visitorName.value)) {
            nameErr.innerText = '*Please do not leave name section blank*';
            nameValid = false;
        } else {
            nameErr.innerText = EMPTY_STRING;
            nameValid = true;
        }
    });

    visitorEmail.addEventListener('change', () => {
        if (undefined === visitorEmail.value || visitorEmail.value.length === 0 || visitorEmail.value === null) {
            emailErr.innerText = '*Please do not leave email section empty*';
            emailValid = false;
            return;
        }
        if (REGEX_EMAIL.test(visitorEmail.value)) {
            emailErr.innerText = EMPTY_STRING;
            emailValid = true;
        } else {
            emailErr.innerText = '*Please enter valid email format*';
            emailValid = false;
        }
    });

    visitorMessage.addEventListener('change', () => {
        if (undefined === visitorMessage.value || visitorMessage.value.length === 0 || visitorMessage.value === null) {
            messageErr.innerText = '*Please do not leave message section empty*';
            msgValid = false;
        } else if (checkForBlankString(visitorMessage.value)) {
            messageErr.innerText = '*Please do not leave message section blank*';
            msgValid = false;
        } else {
            if (visitorMessage.value.length < 10) {
                messageErr.innerText = '*At least 10 words are required*';
                msgValid = false;
            } else {
                messageErr.innerText = EMPTY_STRING;
                msgValid = true;
            }
        }
    });
};

const submit = () => {
    document.getElementById('my-contact-form').addEventListener('submit', async (e) => {
        if (nameValid && msgValid && emailValid) {
            e.preventDefault();

            waiting.style.display = 'flex';

            const name = visitorName.value;
            const email = visitorEmail.value;
            const message = visitorMessage.value;
            const data = {name,email,message};
            const option = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                referrer: 'no-referrer',
                body: JSON.stringify(data)
            };

            const response = await fetch('/contact', option);
            const responseData = await response.json();
            await displayMsg(responseData);
        }
    });
};

const displayMsg = async (responseData) => {
    if (responseData.status === 'success') {
        visitorName.value = '';
        visitorEmail.value = '';
        visitorMessage.value = '';
        waiting.style.display = 'none';
        modal.style.display = 'flex';
    } else if (responseData.status === 'fail') {
        alert('I am sorry to inform you that there\'s an error in sending email. Please write an email to gervinfungdaxuen@gmail.com through your email service provider. Thank you');
    } else if (responseData.status === 'input') {
        nameErr.innerText = responseData.nameErr;
        emailErr.innerText = responseData.emailErr;
        messageErr.innerText = responseData.messageErr;
    }
};

validateForm();
submit();
closeNotification();
closeWaitingNotification();
