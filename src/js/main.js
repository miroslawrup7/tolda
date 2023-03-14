// contact form validation

const formLoc = document.querySelector("#contact-form");
const successSendingMessageLoc = document.querySelector(".successSendingMessage");

const nameLoc = document.querySelector("#name");
const surnameLoc = document.querySelector("#surname");
const telLoc = document.querySelector("#tel");
const tentLoc = document.querySelector("#tent");
const dateLoc = document.querySelector("#date");
const messageLoc = document.querySelector("#message");

const sendingInfoLoc = document.querySelector(".sending-info");
const buttonLoc = document.querySelector("form button");

let validationPass;

const validateEmpty = (input, turnOnErrorShow) => {
    if (!input.value.length) {
        if (turnOnErrorShow) {
            input.nextElementSibling.innerText = "To pole jest wymagane.";
            input.classList.add("error");
            validationPass = false;
        }
    } else if (input.nextElementSibling.innerText === "To pole jest wymagane.") {
        input.nextElementSibling.innerText = "";
        input.classList.remove("error");
    }
}

const validateEmail = (input, turnOnErrorShow) => {
    if (input.value.length) {
        if (!String(input.value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            if (turnOnErrorShow) {
                input.nextElementSibling.innerText = "Nieprawidłowy adres e-mail.";
                input.classList.add("error");
                validationPass = false;
            }
        } else if (input.nextElementSibling.innerText === "Nieprawidłowy adres e-mail.") {
            input.nextElementSibling.innerText = "";
            input.classList.remove("error");
        }
    } else if (input.nextElementSibling.innerText === "Nieprawidłowy adres e-mail.") {
        input.nextElementSibling.innerText = "";
        input.classList.remove("error");
    }
}

nameLoc.addEventListener("keyup", (e) => {
    validateEmpty(e.target, false); 
});

surnameLoc.addEventListener("keyup", (e) => {
    validateEmpty(e.target, false); 
});

telLoc.addEventListener("keyup", (e) => {
    validateEmpty(e.target, false); 
});

tentLoc.addEventListener("keyup", (e) => {
    validateEmpty(e.target, false); 
});

dateLoc.addEventListener("keyup", (e) => {
    validateEmpty(e.target, false); 
});



buttonLoc.addEventListener("click", (e) => {
    e.preventDefault();

    sendingInfoLoc.innerText = "";
    sendingInfoLoc.classList.remove("success-info");
    sendingInfoLoc.classList.remove("error-info");

    validationPass = true;
    validateEmpty(nameLoc, true); 
    validateEmpty(surnameLoc, true); 
    validateEmpty(telLoc, true); 
    validateEmpty(tentLoc, true); 
    validateEmpty(dateLoc, true); 
    

    if (validationPass) {
        console.log("Walidacja prawidłowa! :)");

        buttonLoc.classList.add("loading");
        buttonLoc.disabled = true;
        
        const formData = new FormData(formLoc);
        const url = formLoc.getAttribute("action");
        const method = formLoc.getAttribute("method");
        
        fetch(url, {
            method: method.toUpperCase(),
            body: formData
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.errors) { 
                console.log("Niektóre pola formularza są niepoprawnie wypełnione.");
                sendingInfoLoc.innerText = "Niektóre pola formularza są niepoprawnie wypełnione.";
                sendingInfoLoc.classList.add("error-info");
                buttonLoc.classList.remove("loading");
                buttonLoc.disabled = false;
            } else { 
                if (res.status === "ok") {
                    console.log("Wiadomość wysłana pomyślnie.");
                    // sendingInfoLoc.innerText = "Wiadomość wysłana pomyślnie.";
                    // sendingInfoLoc.classList.add("success-info");
                    buttonLoc.classList.remove("loading");
                    buttonLoc.disabled = false;
                    // wyświetla wiadomość
                    formLoc.style.opacity = "0";
                    successSendingMessageLoc.style.opacity = "1";
                    successSendingMessageLoc.style.visibility = "visible";
                    formLoc.reset();
                    setTimeout(() => {
                        formLoc.style.opacity = "1";
                        successSendingMessageLoc.style.opacity = "0";
                        successSendingMessageLoc.style.visibility = "hidden";
                    }, 4000);
                }
                if (res.status === "error") {
                    console.log("Wiadomości nie wysłano.");
                    sendingInfoLoc.innerText = "Wiadomości nie wysłano.";
                    sendingInfoLoc.classList.add("error-info");
                    buttonLoc.classList.remove("loading");
                    buttonLoc.disabled = false;
                }
            }
        })
        .catch((err) => {
            buttonLoc.classList.remove("loading");
            buttonLoc.disabled = false;
            console.log(err)
        })
        .finally(() => {
            buttonLoc.classList.remove("loading");
            buttonLoc.disabled = false;
            
        })
    } else {
        console.log("Walidacja nieprawidłowa! :(");
    }
});

const markActivedInput = (input) => {
    input.classList.add("active");
}

const unmarkActivedInput = (input) => {
    input.classList.remove("active");
}

nameLoc.addEventListener("focus", (e) => {
    markActivedInput(e.target); 
});
nameLoc.addEventListener("blur", (e) => {
    unmarkActivedInput(e.target); 
});

surnameLoc.addEventListener("focus", (e) => {
    markActivedInput(e.target); 
});
surnameLoc.addEventListener("blur", (e) => {
    unmarkActivedInput(e.target); 
});

telLoc.addEventListener("focus", (e) => {
    markActivedInput(e.target); 
});
telLoc.addEventListener("blur", (e) => {
    unmarkActivedInput(e.target); 
});

tentLoc.addEventListener("focus", (e) => {
    markActivedInput(e.target); 
});
tentLoc.addEventListener("blur", (e) => {
    unmarkActivedInput(e.target); 
});

dateLoc.addEventListener("focus", (e) => {
    markActivedInput(e.target); 
});
dateLoc.addEventListener("blur", (e) => {
    unmarkActivedInput(e.target); 
});

messageLoc.addEventListener("focus", (e) => {
    markActivedInput(e.target); 
});
messageLoc.addEventListener("blur", (e) => {
    unmarkActivedInput(e.target); 
});

dateLoc.addEventListener("focus", (e) => {
    markActivedInput(e.target); 
});
dateLoc.addEventListener("blur", (e) => {
    unmarkActivedInput(e.target); 
});


// mobile menu

const hamburgerLoc = document.querySelector(".hamburger");
const mobileMenuLoc = document.querySelector("header nav > ul");
const hamburgerBarsLoc = document.querySelector(".hamburger .bars");

hamburgerLoc.addEventListener("click", () => {
    mobileMenuLoc.classList.toggle("show");
    hamburgerBarsLoc.classList.toggle("ham");

    const mobileMenuElemLoc = document.querySelectorAll("header nav ul.show li a");
 
    mobileMenuElemLoc.forEach(elem => {
        elem.addEventListener("click", () => {
            mobileMenuLoc.classList.remove("show");
            hamburgerBarsLoc.classList.add("ham");
        });
    });
});


    
    



