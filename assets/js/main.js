function notify(text, type, time=3000) {
    this.notification = document.createElement("div");
    this.notification.classList.add("notification");
    if(type === "success")
        this.notification.classList.add("notification-success");
    else if(type === "error")
        this.notification.classList.add("notification-error");
    this.notification.innerText = text;
    document.body.appendChild(this.notification);
    setTimeout(() => {
        document.body.removeChild(this.notification);
    },time);
}

// Validation Functions
validateName = (name) => /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name);
validatePhone = (phone) => /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);
validateEmail = (email) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase());

testimonialCarousel = new Carousel('testimonials-carousel',7000);

jsModal = new Modal('tech-js-modal');
phpModal = new Modal('tech-php-modal');
mlModal = new Modal('tech-ml&ai-modal');
androidModal = new Modal('tech-android-modal');

contactForm = {
    name: "",
    email: "",
    phone: "",
    message: "",
    errors: [],
    ele: {
        "form": document.getElementById("contact-form"),
        "name": document.getElementById("name"),
        "email": document.getElementById("email"),
        "phone": document.getElementById("phone"),
        "message": document.getElementById("message"),
        "err": {
            "name": document.getElementById("name-err"),
            "email": document.getElementById("email-err"),
            "phone": document.getElementById("phone-err"),
            "message": document.getElementById("message-err")
        }
    },
    readForm: () => {
        contactForm.name = contactForm.ele.name.value;
        contactForm.email = contactForm.ele.email.value;
        contactForm.phone = contactForm.ele.phone.value;
        contactForm.message = contactForm.ele.message.value;
    },
    validate: () => {
        contactForm.errors = [];
        if(!validateName(contactForm.name)) contactForm.errors.push(101);
        if(!validateEmail(contactForm.email)) contactForm.errors.push(102);
        if(!validatePhone(contactForm.phone)) contactForm.errors.push(103);
        return (contactForm.errors.length === 0);
    },
    submit: () => {
        contactForm.hideErrors();
        contactForm.readForm();
        if(contactForm.validate()) {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/contact", true);
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")

            let req = "";
            req += "name=" + contactForm.name + "&";
            req += "email=" + contactForm.email + "&";
            req += "phone=" + contactForm.phone + "&";
            req += "message=" + contactForm.message;

            xhr.onload = () => {
                const res = JSON.parse(xhr.responseText);
                notify(res.notification, res.success ? "success" : "error", 4000);
                if(res.success) contactForm.clear();
            };

            xhr.send(req);
            return xhr.responseText;
        } else contactForm.showErrors();
    },
    showErrors: () => {
        for(let i=0; i<contactForm.errors.length; i++)
            contactForm.error(contactForm.errors[i]);
    },
    hideErrors: () => {
        contactForm.ele.err.name.style.opacity = "0";
        contactForm.ele.err.email.style.opacity = "0";
        contactForm.ele.err.phone.style.opacity = "0";
    },
    error: (errCode) => {
        switch (errCode) {
            case 101:
                contactForm.ele.err.name.style.opacity = "1";
                break;
            case 102:
                contactForm.ele.err.email.style.opacity = "1";
                break;
            case 103:
                contactForm.ele.err.phone.style.opacity = "1";
                break;
        }
    },
    clear: () => {
        contactForm.ele.name.value = "";
        contactForm.ele.email.value = "";
        contactForm.ele.phone.value = "";
        contactForm.ele.message.value = "";
    }
};


navbar = {
    topNav: document.getElementById("topNav"),
    toggle: () => {
        if(navbar.topNav.style.display === "none")
            navbar.topNav.style.display = "block";
        else
            navbar.topNav.style.display = "none";
    },
    performClick: () => {if(innerWidth<650) navbar.toggle();}
};
