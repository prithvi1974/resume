const express = require("express");
const hbs = require("express-handlebars");
const bp = require("body-parser");
const fs = require("fs");
const app = express();
const fetch = require("node-fetch");

// Middleware
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use('/assets', express.static("assets"));

// View Engine Config
const eng = hbs.create({
    extname: 'hbs',
    defaultLayout: 'wrapper_html',
    layoutsDir: __dirname + '/views/layouts',
    helpers: {
        "if_even": (itr,opt) => {
            return (itr%2===0) ? opt.fn(this) : opt.inverse(this);
        }
    }
});

app.engine("hbs", eng.engine);
app.set("view engine", "hbs");

// Index route
app.get('/', (req,res) => {
    // fetch('https://api.myjson.com/bins/rqepk')
    //     .then(res => res.json())
    //     .then(json => {
    //          processData(json);
    //          res.render('index', json);
    //     });

    processData(val);
    res.render('index', val);
});

app.post("/contact", (req,res) => {
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let message = req.body.message;

    if(name && email && phone) {
        if(validateEmail(email)) {
            if(validatePhone(phone)) {
                const form = {
                    timestamp: Date(),
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    message: req.body.message
                };
                fs.appendFile("logs/contact.log", JSON.stringify(form), (err) => {
                    (!err) ? res.json({success: true, notification: "We'll get in touch shortly, "+name.toString()}) : res.json({success: false, notification: "Server Error"});
                });
            } else res.json({success: false, notification: "Invalid Phone"})
        } else res.json({success: false, notification: "Invalid Email"})
    } else res.json({success: false, notification: "Fill all the fields"})

});

PORT = 3000;
app.listen(PORT, console.log(`Server Started on port ${PORT}`));

function processData(val) {
    let img = val.sections.gallery.images;
    val.sections.gallery.col1 = [];
    val.sections.gallery.col2 = [];
    val.sections.gallery.col3 = [];
    for(let i=0; i<img.length; i++) {
        switch(i%3) {
            case 0:
                val.sections.gallery.col1.push(img[i]);
                break;
            case 1:
                val.sections.gallery.col2.push(img[i]);
                break;
            case 2:
                val.sections.gallery.col3.push(img[i]);
                break;
        }
    }
}

// Validation Functions
validateName = (name) => /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name);
validatePhone = (phone) => /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);
validateEmail = (email) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase());

val = {
    "info": {
        "name": "Prithvi Anand",
        "resumeURL": "/assets/pdf/resume.pdf"
    },
    "sections": {
        "name": [
            {
                "link": "home",
                "val": "Home"
            },
            {
                "link": "about",
                "val": "About"
            },
            {
                "link": "technologies",
                "val": "Technologies"
            },
            {
                "link": "projects",
                "val": "Projects"
            },
            {
                "link": "testimonials",
                "val": "Testimonials"
            },
            {
                "link": "gallery",
                "val": "Gallery"
            },
            {
                "link": "contact",
                "val": "Contact"
            }
        ],
        "banner": {
            "head": "Prithvi Anand",
            "desc": "Intern at Housing.com"
        },
        "about": {
            "head": "<i class=\"fas fa-hand-peace\"></i> It's me, Prithvi!",
            "desc": "<p class=\"m-0 py-1\">Define | Design | Develop | Deploy</p><p>I am a final year B.Tech undergrad currently working as a tech intern at <a target=\"_blank\" href=\"https://housing.com/\" class=\"link-bold\">HOUSING.COM</a>. To design & develop websites, apps and software is fun.</p><p>Besides development I love physics and the crazy math that goes with it <span style=\"font-size: larger\">🙃</span></p><p><strong>Seamless tech and creative design can craft beautiful experiences.</strong><br>Believe so? Let's connect!</p>",
            "followItems": [
                {
                    "link": "https://www.github.com/prithvi1972/",
                    "icon": "fab fa-github"
                },
                {
                    "link": "https://www.linkedin.com/in/prithvi-anand/",
                    "icon": "fab fa-linkedin"
                },
                {
                    "link": "#contact",
                    "icon": "fas fa-phone"
                }
            ]
        },
        "technologies": {
            "tech": [
                {
                    "id": "tech-js",
                    "img": "/assets/img/tech/js.jpg",
                    "name": "Javascript",
                    "brief": "Learning Vanilla JS, React JS & Node JS",
                    "modal": {
                        "name": "jsModal",
                        "head": "Javascript",
                        "desc": "<p>I started using Javascript pretty early. Actually in my 7th or 8th grade when we were taught HTML at school. BUt without actually knowing what it is or how it operates.</p><p>I actually came to know about JS while working with a friend on a college project where we had to send an AJAX request. It was then that I sa the async beauty of JS. It was just a matter of 2 months that I sat for the interview of Housing.com and realised what JS actually is...</p>",
                        "foot": "Footer"
                    }
                },
                {
                    "id": "tech-php",
                    "img": "/assets/img/tech/php.jpg",
                    "name": "PHP",
                    "brief": "Created custom MVC backend framework",
                    "modal": {
                        "name": "phpModal",
                        "head": "PHP",
                        "desc": "<p>I learnt using PHP, because one of my friends was a startup enthusiast and asked me to join along with him. It was Headfirst PHP, I remember the PDF...</p><p>Slowly I paced up with PHP and applied for GSOC at drupal.org for fixing their PHP core. I did that for 2 months.</p><p>I then developed the backend for two websites one for a startup and one for college project. Now I have a self made framework ready to serve...</p>",
                        "foot": "Footer"
                    }
                },
                {
                    "id": "tech-ml&ai",
                    "img": "/assets/img/tech/ml.jpg",
                    "name": "ML & AI",
                    "brief": "NLP and Deep Learning problems",
                    "modal": {
                        "name": "mlModal",
                        "head": "ML | AI | NLP",
                        "desc": "<p>I chose machine learning as an elective subject at college. It was my interest in NLP that took me to building my first little thing: Text Summarizer. </p><p>Slowly I learnt some more stuff and worked with tf-idf matrices to design a Movie Recommender. As a college project, I also worked on a spell checker... </p><p>Besides, I also learnt about the working of deep neural networks, CNN, RNN. I was also fascinated by JS. The mixture lead to a small script inspired by Brain.JS</p>",
                        "foot": "Footer"
                    }
                },
                {
                    "id": "tech-android",
                    "img": "/assets/img/tech/android.jpg",
                    "name": "Android",
                    "brief": "Android App for Password Manager",
                    "modal": {
                        "name": "androidModal",
                        "head": "Android",
                        "desc": "<p>The least that I played with, yet one of the most interesting things is Java. Android taught me about the importance of scope, access modifiers. And I have to agree, Java is made for development.</p><p>I worked on an android app named IoKi. It was a college project. It was a password managing tool that could autofill into apps and list nearby locks and unlock them.</p>",
                        "foot": "Footer"
                    }
                }
            ]
        },
        "projects": [
            {
                "title": "IoKi",
                "year": "Oct 2018",
                "desc": "<h3 style='padding: 5px 0;'>Website & Android App</h3>IoKi is an IoT based password managing system. Project involves development of android app and website. Contributed vanilla JS web front-end, Java android front-end and PHP back-end for the product."
            },
            {
                "title": "Talk it out!",
                "year": "May 2018",
                "desc": "<h3 style='padding: 5px 0;'>Website</h3>Developing website for health-based startup. The product involves development of a chat client with added call functionality and session booking system."
            },
            {
                "title": "Movie Recommender",
                "year": "Jan 2018",
                "desc": "<h3 style='padding: 5px 0;'>Python Script</h3>Developed a movie recommendation script based on document clustering using movie synopses. It is implemented using python. The clusters IDs generated are to be stored in a database for further recommendation."
            },
            {
                "title": "Drupal",
                "year": "Jan 2018",
                "desc": "<h3 style='padding: 5px 0;'>Bug Fixing</h3>Resolved issues for Drupal core module working under a mentor for two months. The issues involved correction of code PHP snippets to make the core functionalities working."
            }
        ],
        "testimonials": {
            "carousel": {
                "id": "testimonials-carousel",
                "slides": [
                    {
                        "person": "Manan Chawla",
                        "designation": "Startup Enthusiast",
                        "img": "/assets/img/testimonials/manan.jpg",
                        "desc": "“ Lorel Ipsum Dolor sit amet. Lorel Ipsum Dolor sit amet. Lorel Ipsum Dolor sit amet. Lorel Ipsum Dolor sit amet. ”"
                    },
                    {
                        "person": "Dibyajyoti Panda",
                        "designation": "Mentor, Drupal.org",
                        "img": "/assets/img/testimonials/dbj.jpg",
                        "desc": "“ Lorel Ipsum Dolor sit amet. Lorel Ipsum Dolor sit amet. Lorel Ipsum Dolor sit amet. Lorel Ipsum Dolor sit amet. ”"
                    },
                    {
                        "person": "Dr. Maninder Singh",
                        "designation": "HOD, Computer Science, TIET",
                        "img": "/assets/img/testimonials/hod.jpg",
                        "desc": "“ Lorel Ipsum Dolor sit amet. Lorel Ipsum Dolor sit amet. Lorel Ipsum Dolor sit amet. Lorel Ipsum Dolor sit amet. ”"
                    },
                    {
                        "person": "Dr. P.S. Rana",
                        "designation": "Professor, TIET",
                        "img": "/assets/img/testimonials/rana.jpg",
                        "desc": "“ Lorel Ipsum Dolor sit amet. Lorel Ipsum Dolor sit amet. Lorel Ipsum Dolor sit amet. Lorel Ipsum Dolor sit amet. ”"
                    }
                ]
            }
        },
        "gallery": {
            "images": [
                "/assets/img/gallery/1.jpeg",
                "/assets/img/gallery/2.jpeg",
                "/assets/img/gallery/3.jpeg",
                "/assets/img/gallery/4.jpeg",
                "/assets/img/gallery/5.jpeg",
                "/assets/img/gallery/6.jpeg",
                "/assets/img/gallery/7.jpeg",
                "/assets/img/gallery/8.jpeg",
                "/assets/img/gallery/9.jpeg"
            ]
        }
    }
}
