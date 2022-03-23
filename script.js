const showSignUp = document.getElementById('signUp');
const showSignIn = document.getElementById('signIn');
const container = document.getElementById('container');
const modal = document.getElementById("myModal");
const selectionModal = document.getElementById("selectionModal");
const span = document.getElementsByClassName("close")[0];
const participate = document.querySelector('.participate');
let completedSummary;
let surveyCatergories;
let surveyListContainer;
let ctx;


if (showSignUp != null) {
    showSignUp.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });
}
if (showSignIn != null) {
    showSignIn.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
}


if (participate != null) {
    participate.addEventListener('click', () => {
        modal.style.visibility = "visible";
    })
}

// When the user clicks on <span> (x), close the modal
if (span != null) {
    span.onclick = function () {
        modal.style.visibility = "hidden";
        selectionModal.style.visibility = "hidden";
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.visibility = "hidden";
    }
    if (event.target == selectionModal) {
        selectionModal.style.visibility = "hidden";
    }
}

// creating selection bubbles

const surveyTypes = ['Fashion', 'Social', 'Survival', 'Funny']
const bubbleSection = document.querySelector('#selectionContainer');
let createElement;
let favoritesArray = [];

function createBubble() {
    createElement = document.createElement('span');
    var size = Math.random() * 60;

    createElement.classList.add('bubble');
    createElement.style.width = 200 + size + 'px';
    createElement.style.height = 200 + size + 'px';
    if (bubbleSection != null) {
        bubbleSection.appendChild(createElement);
    }
}


for (let i = 0; i < 4; i++) {
    createBubble();
    createElement.innerHTML = `<p>${surveyTypes[i]}</p>`;
}

const getStartedBtn = document.createElement('button');
const invalidNumber = document.createElement('p');
invalidNumber.id = 'invalidNumber';
getStartedBtn.innerText = `Let's surveyyyyy!`;
if (bubbleSection != null) {
    bubbleSection.appendChild(getStartedBtn);
    bubbleSection.appendChild(invalidNumber);
}

const bubbles = document.querySelectorAll('.bubble');

bubbles.forEach(bubble => {
    bubble.addEventListener('click', () => {
        bubble.style.animation = 'pop 0.50s cubic-bezier(0.16, 0.87, 0.48, 0.99) forwards';
        favoritesArray.push(bubble.lastElementChild.textContent);
    })
})

// users

let userTemplate = {
    Name: '',
    Email: '',
    Password: '',
    IsAdmin: 0,
    Favorites: '',
}

function populateUserTemplate(name, email, password, isAdmin, favorites) {
    userTemplate.Name = name;
    userTemplate.Email = email;
    userTemplate.Password = password;
    userTemplate.IsAdmin = isAdmin;
    userTemplate.Favorites = favorites;
}

const getUsers = async () => {
    try {
        const users = await fetch('http://localhost:4000/users', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        return users.json()
    } catch (e) {
        console.log(e)
    }
}

const getReport = async () => {
    try {
        const users = await fetch('http://localhost:4000/reports', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        return users.json()
    } catch (e) {
        console.log(e)
    }
}

const getUsersById = async (id) => {
    try {
        const users = await fetch(`http://localhost:4000/users/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        return users.json()
    } catch (e) {
        console.log(e)
    }
}

const addUser = async (userTemplate) => {
    try {
        const response = await fetch('http://localhost:4000/users', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userTemplate)
        })
        return response.json();
    } catch (err) {
        console.log(err)
    }
}

const updateUser = async (id, userTemplate) => {
    try {
        const response = await fetch(`http://localhost:4000/users/${id}`, {
            method: 'PUT',
            cache: "no-cache",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userTemplate)
        })
        return response.json();
    } catch (err) {
        console.log(err)
    }
}

const deleteUser = async (id) => {
    try {
        const response = await fetch(`http://localhost:4000/users/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
        return response.json();
    } catch (err) {
        console.log(err)
    }
}

getUsers().then(res => console.log('users', res))


// surveys
const getSurveys = async () => {
    try {
        const users = await fetch('http://localhost:4000/surveys', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        return users.json()
    } catch (e) {
        console.log(e)
    }
}

const addSurveys = async (surveyTemplate) => {
    try {
        const response = await fetch('http://localhost:4000/surveys', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(surveyTemplate)
        })
        return response.json();
    } catch (err) {
        console.log(err)
    }
}

const updateSurvey = async (id, surveyTemplate) => {
    try {
        const response = await fetch(`http://localhost:4000/surveys/${id}`, {
            method: 'PUT',
            cache: "no-cache",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(surveyTemplate)
        })
        return response.json();
    } catch (err) {
        console.log(err)
    }
}

const deleteSurvey = async (id) => {
    try {
        const response = await fetch(`http://localhost:4000/surveys/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
        return response.json();
    } catch (err) {
        console.log(err)
    }
}

getSurveys().then(res => console.log('surveys', res));

// questions
const getQuestions = async () => {
    try {
        const users = await fetch('http://localhost:4000/questions', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        return users.json()
    } catch (e) {
        console.log(e)
    }
}

const addQuestions = async (questionTemplate) => {
    try {
        const response = await fetch('http://localhost:4000/questions', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(questionTemplate)
        })
        return response.json();
    } catch (err) {
        console.log(err)
    }
}

const updateQuestion = async (id, questionTemplate) => {
    try {
        const response = await fetch(`http://localhost:4000/questions/${id}`, {
            method: 'PUT',
            cache: "no-cache",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(questionTemplate)
        })
        return response.json();
    } catch (err) {
        console.log(err)
    }
}

const deleteQuestion = async (id) => {
    try {
        const response = await fetch(`http://localhost:4000/questions/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
        return response.json();
    } catch (err) {
        console.log(err)
    }
}

getQuestions().then(res => console.log('questions', res));

// answers
const getResponses = async () => {
    try {
        const users = await fetch('http://localhost:4000/responses', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        return users.json()
    } catch (e) {
        console.log(e)
    }
}

const addResponses = async (responseTemplate) => {
    try {
        const response = await fetch('http://localhost:4000/responses', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(responseTemplate)
        })
        return response.json();
    } catch (err) {
        console.log(err)
    }
}

const updateResponse = async (id, responseTemplate) => {
    try {
        const response = await fetch(`http://localhost:4000/responses/${id}`, {
            method: 'PUT',
            cache: "no-cache",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(responseTemplate)
        })
        return response.json();
    } catch (err) {
        console.log(err)
    }
}

const deleteResponse = async (id) => {
    try {
        const response = await fetch(`http://localhost:4000/responses/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
        return response.json();
    } catch (err) {
        console.log(err)
    }
}

getResponses().then(res => console.log('responses', res));

// answers
const getAnswers = async () => {
    try {
        const users = await fetch('http://localhost:4000/answers', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        return users.json()
    } catch (e) {
        console.log(e)
    }
}

const addAnswers = async (answerTemplate) => {
    try {
        const response = await fetch('http://localhost:4000/answers', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(answerTemplate)
        })
        return response.json();
    } catch (err) {
        console.log(err)
    }
}

const updateAnswer = async (id, answerTemplate) => {
    try {
        const response = await fetch(`http://localhost:4000/answers/${id}`, {
            method: 'PUT',
            cache: "no-cache",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(answerTemplate)
        })
        return response.json();
    } catch (err) {
        console.log(err)
    }
}

const deleteAnswer = async (id) => {
    try {
        const response = await fetch(`http://localhost:4000/answers/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
        return response.json();
    } catch (err) {
        console.log(err)
    }
}

getAnswers().then(res => console.log('answers', res));



const login = async (email, password) => {
    try {
        const response = await fetch('http://localhost:4000/accounts', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                Email: email,
                Password: password
            })
        })
        return response.json();
    } catch (err) {
        console.log(err)
    }
}

// login for both user and admin
const signInBtn = document.querySelector('.signIn');

if (signInBtn != null) {
    signInBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let signInEmail = document.querySelector('#signInName').value;
        let signInPassword = document.querySelector('#signInPassword').value;
        let signInOptions = document.getElementsByName('login');
        let typeOfUser;
        for (let i of signInOptions) {
            if (i.checked) {
                typeOfUser = parseInt(i.id);
            }
            if (typeOfUser > 0) {
                typeOfUser = true;
            } else {
                typeOfUser = false;
            }
        }

        console.log(typeOfUser)
        login(signInEmail, signInPassword).then(user => {
            console.log(user)
            if (Object.values(user).includes(typeOfUser)) {
                if (typeOfUser == 0) {
                    window.location.assign('userPortal.html');
                } else {
                    window.location.assign('adminPortal.html');
                }
                sessionStorage.setItem('user', JSON.stringify({
                    name: user.Name,
                    id: user.Id
                }))
            } else {
                document.getElementById('incorrectPassword').innerHTML = 'Incorrect username / password';
            }
        })
    })
}

// signUp for user
const signUpBtn = document.querySelector('.signUp');

if (signUpBtn != null) {
    signUpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const signUpName = document.querySelector('#signUpName').value;
        const signUpPassword = document.querySelector('#signUpPassword').value;
        const confirmPassword = document.querySelector('#confirmSignUpPassword').value;
        const signUpEmail = document.querySelector('#signUpEmail').value;
        const isAdmin = 0;
        if (signUpPassword == '' || confirmPassword == '') {
            document.getElementById('passwordNotMatch').innerHTML = 'Please enter a password';
        } else if (signUpPassword == confirmPassword) {
            sessionStorage.setItem('user', signUpName);
            modal.style.visibility = 'hidden';
            selectionModal.style.visibility = "visible";
            getStartedBtn.addEventListener('click', () => {
                if (favoritesArray.length < 2) {
                    invalidNumber.innerHTML = 'Please select one more survey favorite.'
                } else {
                    populateUserTemplate(signUpName, signUpEmail, signUpPassword, isAdmin, favoritesArray.join(','));
                    invalidNumber.innerHTML = '';
                    addUser(userTemplate).then(async added => {
                        if (!Object.keys(added).includes('message')) {
                            console.log('User added', added);
                            sessionStorage.setItem('user', JSON.stringify({
                                name: added.Name,
                                id: added.Id
                            }))
                            window.location.assign('userPortal.html');
                        } else {
                            invalidNumber.innerHTML = 'Account already exists';
                        }
                        const gettingUsers = await getUsers().then(users => {
                            console.log('All users', users);
                        })
                    })
                }
            })
        } else {
            document.getElementById('passwordNotMatch').innerHTML = 'Passwords do not match';
        }
    })
}

// user portal
const header = document.querySelector('.header');
const userSignedIn = document.createElement('div');

userSignedIn.classList.add('userSignedIn');

userSignedIn.innerHTML = `<h1>${JSON.parse(sessionStorage.getItem('user')).name}</h1>
                        <i class="fa fa-user-o" aria-hidden="true"></i>
`;

if (header != null) {
    header.appendChild(userSignedIn);
}

let userDetailsPopup = document.createElement('div');
userDetailsPopup.classList.add('userDetails');
userDetailsPopup.innerHTML = ` <div id="userDetails-content">
                                    <p class='signout'>Sign Out <i class="fa fa-sign-out"></i></p>
                                    <button>Close</button>
                               </div>
`
const userPortal = document.querySelector('.userPortal');
const adminPortal = document.querySelector('.adminPortal');




if (userPortal != null) {
    userPortal.appendChild(userDetailsPopup);
}

if (adminPortal != null) {
    adminPortal.appendChild(userDetailsPopup);
}

userSignedIn.querySelector('.fa').addEventListener('click', () => {
    userDetailsPopup.style.display = 'block';
    let logout = userDetailsPopup.querySelector('i');
    logout.addEventListener('click', () => {
        window.location.assign('index.html')
    })
})

userDetailsPopup.querySelector('button').addEventListener('click', () => {
    userDetailsPopup.style.display = 'none';
})

let userWelcome = document.createElement('div');

userWelcome.classList.add('userWelcome');

userWelcome.innerHTML = `<img src="./images/userWelcome.png" alt='welcome'/>
                        <div>
                        <h2>Welcome</h>
                        <h1>${JSON.parse(sessionStorage.getItem('user')).name},</h1>
                        <p>go check the surveys panel to check if some of your favorites have been added!
                        </div>`

if (userPortal != null) {
    userPortal.appendChild(userWelcome)
}

let dataInformation = document.createElement('div');
dataInformation.classList.add('dataInformation');
dataInformation.innerHTML = `<h1>Data Information</h1>`


if (userPortal != null) {
    userPortal.appendChild(dataInformation)
}

const summary = document.createElement('div');

const getSummary = async () => {
    getUsersById(JSON.parse(sessionStorage.getItem('user')).id).then(users => {
        users.forEach(user => {
            console.log('summary', users);
            let countAvailableSurveys = 0;
            getSurveys().then(surveys => {
                surveys.forEach(survey => {
                    for (i = 0; i < user.Favorites.split(',').length; i++) {
                        if (survey.Category == user.Favorites.split(',')[i]) {
                            countAvailableSurveys++
                        }
                    }
                })
                let counter = 0;

                getResponses().then(responses => {
                    responses.forEach(response => {
                        if (Object.values(response).includes(JSON.parse(sessionStorage.getItem('user')).id)) {
                            console.log(response)
                            counter++;
                            console.log(counter)
                        }
                    })
                    completedSummary = document.createElement('div');
                    completedSummary.classList.add('completedSummary');
                    completedSummary.innerHTML = `<h1>Completed Surveys</h1>
                                         <p>${counter}/${countAvailableSurveys}</p>`
                    if (userPortal != null) {
                        userPortal.appendChild(completedSummary)
                    }
                })
            })
        })
    })
}

getSummary(JSON.parse(sessionStorage.getItem('user')).id)


function displayAvailableSurveys() {
    surveyCatergories = document.createElement('div');
    surveyCatergories.innerHTML = '<h1>Available surveys</h1>'
    surveyCatergories.classList.add('surveyCatergories');
    getUsersById(JSON.parse(sessionStorage.getItem('user')).id).then(users => {
        users.forEach(user => {
            getSurveys().then(surveys => {
                surveys.forEach(survey => {
                    for (i = 0; i < user.Favorites.split(',').length; i++) {
                        if (survey.Category == user.Favorites.split(',')[i]) {
                            let pickedCategory = document.createElement('h3');
                            pickedCategory.innerHTML = `${survey.Category}`;
                            surveyCatergories.appendChild(pickedCategory);
                            let surveyInCategory = document.createElement('p');
                            surveyInCategory.classList.add('surveyInCategory');
                            surveyInCategory.innerHTML = `${survey.Name}`;
                            surveyCatergories.appendChild(surveyInCategory);
                            surveyInCategory.addEventListener('click', () => {
                                console.log(surveyInCategory.innerHTML);
                                let surveyModal = document.createElement('div');
                                surveyModal.classList.add('surveyModal');
                                let surveyContent = document.createElement('div');
                                surveyContent.classList.add('surveyContent');
                                let slideshowContainer = document.createElement('div');
                                slideshowContainer.classList.add('slideshow-container');
                                let prev = document.createElement('a');
                                prev.classList.add('prev');
                                prev.setAttribute('onclick', 'plusSlides(-1)');
                                prev.innerHTML = `&#10094;`;
                                let next = document.createElement('a');
                                next.classList.add('next');
                                next.setAttribute('onclick', 'plusSlides(1)');
                                next.innerHTML = `&#10095;`;
                                let dotContainer = document.createElement('div');
                                dotContainer.classList.add('dot-container');
                                let counter = 0;
                                let mySlides;
                                let mySlidesHolder = '';
                                getQuestions().then(questions => {
                                    questions.forEach(question => {
                                        if (Object.values(question).includes(survey.Id)) {
                                            counter++;
                                            slideshowContainer.innerHTML = `<button>Submit</button>
                                                                            <h1>${survey.Name}</h1>`;

                                            let myAnswers = ''

                                            for (let j = 0; j < question.PossibleAnswers.split('.,').length; j++) {
                                                if (question.PossibleAnswers != '') {
                                                    myAnswers += `<p>${question.PossibleAnswers.split('.,')[j]}</p>`;
                                                } else {
                                                    myAnswers = `<input type="text" placeholder="Type in your answer"/>`
                                                }
                                            }

                                            mySlidesHolder += `<div class="mySlides">
                                                                <h2>${question.Text}</h2>
                                                                    ${myAnswers}
                                           
                                                            </div>`

                                            mySlides = document.createElement('div');
                                            mySlides.classList.add('mySlides');
                                            mySlides.innerHTML = `<h2>${question.Text}</h2>`


                                            surveyModal.appendChild(surveyContent);
                                            slideshowContainer.innerHTML += mySlidesHolder;

                                            surveyContent.appendChild(slideshowContainer);

                                            surveyContent.appendChild(prev);
                                            surveyContent.appendChild(next);

                                            let span = document.createElement('span');
                                            span.classList.add('dot');
                                            span.setAttribute('onclick', `currentSlide(${counter})`);

                                            dotContainer.appendChild(span);

                                            surveyModal.appendChild(dotContainer)

                                            let numberOfQuestions = dotContainer.querySelectorAll('span');


                                            let enteredAnswers = slideshowContainer.querySelectorAll('p');

                                            let userAnswers = [];
                                            enteredAnswers.forEach(answer => {
                                                answer.addEventListener('click', () => {
                                                    getQuestions().then(questions1 => {
                                                        questions1.forEach(question1 => {
                                                            if (Object.values(question).includes(survey.Id)) {
                                                                if (question1.PossibleAnswers.split('.,').includes(answer.textContent)) {
                                                                    answer.style.backgroundColor = 'gray';
                                                                    console.log(answer.textContent, question1.Text);
                                                                    userAnswers.push({
                                                                        QuestionId: question1.Id,
                                                                        Answer: answer.textContent,
                                                                    })
                                                                }
                                                            }
                                                        })
                                                    })
                                                })
                                            })
                                            let submitAnswers = slideshowContainer.querySelector('button');

                                            submitAnswers.addEventListener('click', () => {
                                                if (userAnswers.length < numberOfQuestions.length) {
                                                    console.log(userAnswers.length, numberOfQuestions.length)
                                                    alert('Please complete the survey before submitting!');
                                                } else {
                                                    addResponses({ SurveyId: survey.Id, UserId: JSON.parse(sessionStorage.getItem('user')).id, Status: 1 }).then(addedResponse => {
                                                        console.log(addedResponse)
                                                        let newArr = userAnswers.map(v => ({ ResponseId: addedResponse.Id, ...v }))
                                                        console.log(newArr)
                                                        addAnswers(newArr).then(addedAnswer => console.log('added answer', addedAnswer))
                                                    })
                                                    alert('Thank you for completing the survey!');
                                                    surveyModal.style.visibility = "hidden";
                                                }
                                            })
                                            console.log('questions for', survey.Name, question)
                                            console.log(question.PossibleAnswers.split('.,'))
                                            console.log(counter)
                                        }
                                    })
                                    userPortal.appendChild(surveyModal);
                                })
                                window.addEventListener('click', (event) => {
                                    if (event.target == surveyModal) {
                                        surveyModal.style.visibility = "hidden";
                                    }
                                })
                            })
                        }
                    }
                })
            })
        })
    })
    if (userPortal != null) {
        userPortal.appendChild(surveyCatergories)
    }
}

displayAvailableSurveys()
let userNavigation;

if (userPortal != null) {
    userNavigation = userPortal.querySelectorAll('li');
}

if (adminPortal != null) {
    userNavigation = adminPortal.querySelectorAll('li');
}

userNavigation.forEach(nav => {
    nav.addEventListener("click", function () {
        if (userPortal != null) {
            var current = userPortal.querySelector(".active");
            current.className = current.className.replace("active", "");
        }
        this.firstElementChild.classList.add("active");
    });
    nav.addEventListener('click', () => {
        if (nav.textContent == 'Dashboard') {
            userWelcome.style.visibility = 'visible';
            dataInformation.style.visibility = 'visible';
            completedSummary.style.visibility = 'visible';
            surveyCatergories.style.display = 'none';
        }
        if (nav.textContent == 'Surveys') {
            userWelcome.style.visibility = 'hidden';
            dataInformation.style.visibility = 'hidden';
            completedSummary.style.visibility = 'hidden';
            surveyCatergories.style.display = 'block';
        }
    })
})


var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");

    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slides[slideIndex - 1] != null) {
        slides[slideIndex - 1].style.display = "block";
    }
    if (dots[slideIndex - 1] != null) {
        dots[slideIndex - 1].className += " active";
    }
}

var displaySurveyQuestions = [];
var removeSurvey = [];

async function displayAllSurveys() {
    let mySurveys = '';
    surveyListContainer = document.createElement("div");
    surveyListContainer.classList.add("surveyListContainer");
    getSurveys().then(async surveys => {
        surveys.forEach(survey => {
            getUsers().then(users => {
                mySurveys += `<tr>
                <td>${survey.Name}</td>
                <td>${survey.Category}</td>
                <td>${users.find(u => u.Id == survey.CreatedBy).Name}</td>
                <td id='${survey.Name}' class='view'><i class="fa fa-eye"></i></td>
             </tr>`

                surveyListContainer.innerHTML = `
                <h1>Survey List</h1>
                <table>
                    <tr>
                        <th>Survey Name</th>
                        <th>Survey Category</th>
                        <th>Created By</th>
                    </tr>
                    ${mySurveys}
                </table>

                <button>Create New Survey</button>
            `
            })
        })
    })
    if (adminPortal != null) {
        adminPortal.appendChild(surveyListContainer)
    }
    setTimeout(() => {
        displaySurveyQuestions = surveyListContainer.querySelectorAll('.view');
        console.log(displaySurveyQuestions)
        displaySurveyQuestions.forEach(surveyClicked => {
            surveyClicked.addEventListener('click', () => {
                console.log(surveyClicked.parentElement.firstElementChild.textContent)
                let questionsModal = document.createElement('div');
                questionsModal.classList.add('questionsModal');
                let questionsContent = document.createElement('div');
                questionsContent.classList.add('questionsContent');
                questionsContent.innerHTML = `<h1>${surveyClicked.parentElement.firstElementChild.textContent}</h1>`
                getSurveys().then(surveys => {
                    surveys.forEach(survey => {
                        if (Object.values(survey).includes(surveyClicked.parentElement.firstElementChild.textContent)) {
                            getQuestions().then(questions => {
                                questions.forEach(question => {
                                    if (Object.values(question).includes(survey.Id)) {
                                        let questionText = document.createElement('p');
                                        questionText.innerText = `${question.Text}`;
                                        questionsContent.appendChild(questionText)
                                        console.log(question)
                                    }
                                })
                            })
                        }
                    })
                })
                let viewResponseButton = document.createElement('button');
                viewResponseButton.classList.add('viewResponseButton')
                viewResponseButton.innerText = `View responses`
                viewResponseButton.addEventListener('click', () => {
                    console.log('clicked', viewResponseButton.parentElement.firstElementChild.textContent);
                    let answersModal = document.createElement('div');
                    answersModal.classList.add('answersModal');
                    let answersContent = document.createElement('div');
                    answersContent.classList.add('answersContent');
                    let reportChart = document.createElement('canvas');

                    let labels = [];
                    let label = '';
                    let data = [];

                    getReport().then(reports => {
                        reports.forEach(report => {
                            if (Object.values(report).includes(viewResponseButton.parentElement.firstElementChild.textContent)) {
                                console.log(report);
                                labels.push(report.Answer);
                                label = report.Name;
                                data.push(report.Counting);
                            }
                        })
                    })
                    setTimeout(() => {
                        console.log(labels, label, data)
                        reportChart.id = "myReportChart"
                        const myChart = new Chart(reportChart, {
                            type: "bar",
                            data: {
                                labels: labels,
                                datasets: [
                                    {
                                        label: label,
                                        data: data,
                                        backgroundColor: [
                                            "rgba(6, 88, 88, 0.205)",
                                            "rgba(6, 88, 88, 0.836)",
                                        ],
                                        borderWidth: 1,
                                    },
                                ],
                            },
                        });

                        answersContent.appendChild(reportChart)

                    }, 500)

                    answersModal.appendChild(answersContent);
                    adminPortal.appendChild(answersModal);
                    window.addEventListener('click', (event) => {
                        if (event.target == answersModal) {
                            answersModal.style.visibility = "hidden";
                        }
                    })

                })


                questionsContent.appendChild(viewResponseButton)
                questionsModal.appendChild(questionsContent);
                adminPortal.appendChild(questionsModal);
                window.addEventListener('click', (event) => {
                    if (event.target == questionsModal) {
                        questionsModal.style.visibility = "hidden";
                    }
                })
            })
        })
        let createBtn = surveyListContainer.querySelector('button');
        let createModal = document.createElement('div');
        createModal.classList.add('createModal');
        let createContent = document.createElement('div');
        createContent.classList.add('createContent');
        createContent.innerHTML = `<h1>Create A Survey</h1>
                                   <p>Enter Survey Name</p>
                                   <input type="text" name="survey"/>
                                   <p>Enter Survey Category</p>

                                   <select name="category" id="categorySelectEdit" form="categoryForm">
                                        <option value="Funny">Funny</option>
                                        <option value="Social">Social</option>
                                        <option value="Survival">Survival</option>
                                        <option value="Fashion">Fashion</option>
                                    </select>
                                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
        `;

        let createQuestionsModal = document.createElement('div');
        createQuestionsModal.classList.add('createQuestionsModal');
        let createQuestionsContent = document.createElement('div');
        createQuestionsContent.classList.add('createQuestionsContent');
        createQuestionsContent.innerHTML = `<p>Enter Question</p>
                                            <input type="text" name="question" class="question" placeholder="Enter Question"/>
                                            <p>Enter Possible Answers (Max 5)</p>
                                            <input type="text" name="answer1" class='answer' placeholder="Enter Answer"/>
                                            <input type="text" name="answer1" class='answer' placeholder="Enter Answer"/>
                                            <input type="text" name="answer1" class='answer' placeholder="Enter Answer"/>
                                            <input type="text" name="answer1" class='answer' placeholder="Enter Answer"/>
                                            <input type="text" name="answer1" class='answer' placeholder="Enter Answer"/>
                                            <button>Create Next Question</button>
                                            <i class="fa fa-check" aria-hidden="true"></i>
            `

        createBtn.addEventListener('click', () => {
            ;
            createModal.appendChild(createContent);
            adminPortal.appendChild(createModal);
            createModal.style.visibility = "visible";
            window.addEventListener('click', (event) => {
                if (event.target == createModal) {
                    createModal.style.visibility = "hidden";
                }
            })
        })

        let surveyEntered = createContent.querySelector('i')
        console.log(surveyEntered)
        let surveyIdToUse;
        surveyEntered.addEventListener('click', () => {
            let surveyTemplate = {
                Name: createContent.querySelector('input').value,
                CreatedBy: JSON.parse(sessionStorage.getItem('user')).id,
                Category: createContent.querySelector('select').value,
            }
            addSurveys(surveyTemplate).then(survey => {
                console.log('added survey', survey)
                surveyIdToUse = survey.Id;

            })
            // console.log(surveyTemplate)
            createModal.style.visibility = "hidden";
            createQuestionsModal.appendChild(createQuestionsContent);
            adminPortal.appendChild(createQuestionsModal);
            createQuestionsModal.style.visibility = "visible";
            window.addEventListener('click', (event) => {
                if (event.target == createQuestionsModal) {
                    createQuestionsModal.style.visibility = "hidden";
                }
            })

        })


        let createNextQuestion = createQuestionsContent.querySelector('button');
        createNextQuestion.addEventListener('click', () => {
            let answerArr = [];
            let enteredAnswers = createQuestionsContent.querySelectorAll('.answer');
            enteredAnswers.forEach(answer => {
                if (answer.value != '') {
                    answerArr.push(answer.value);
                }
            })

            let questionTemplate = {
                SurveyId: surveyIdToUse,
                Text: createQuestionsContent.querySelector('.question').value,
                PossibleAnswers: answerArr.join('.,')
            }

            addQuestions(questionTemplate).then(question => {
                console.log('added question', question);
            })
            console.log(questionTemplate)
            createQuestionsContent.querySelectorAll('input').forEach(input => {
                input.value = '';
            })
        })

        let doneCreating = createQuestionsContent.querySelector('i');
        doneCreating.addEventListener('click', () => {
            createQuestionsModal.style.visibility = "hidden";
            location.reload();
        })

    }, 1000);



}

displayAllSurveys()


function barGraph() {
    // let userCount = 0;
    let countAvailableSurveys = 0;
    let counter = 0;

    getUsers().then(users => {
        userCount = users.length;
        users.forEach(user => {
            getSurveys().then(surveys => {
                surveys.forEach(survey => {
                    for (i = 0; i < user.Favorites.split(',').length; i++) {
                        if (survey.Category == user.Favorites.split(',')[i]) {
                            countAvailableSurveys++
                        }
                    }
                })

                getResponses().then(responses => {
                    responses.forEach(response => {
                        if (Object.values(response).includes(user.Id)) {
                            counter++;
                        }
                    })
                })
            })

        })

    })
    ctx = document.getElementById("myChart")


    setTimeout(() => {
        console.log(counter, countAvailableSurveys)
        const myChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ['Available Surveys', 'Survey Responses'],
                datasets: [
                    {
                        label: `Survey Response Tracking`,
                        data: [countAvailableSurveys, counter],
                        backgroundColor: [
                            "rgba(6, 88, 88, 0.205)",
                            "rgba(6, 88, 88, 0.836)",
                        ],
                        borderWidth: 1,
                    },
                ],
            },
        });
    }, 2000)
}
barGraph()




adminPortal.querySelector('.viewUsers').addEventListener('click', ()=> {
    console.log('clicked')
    let usersModal = document.createElement('div');
    usersModal.classList.add('usersModal');
    let usersContent = document.createElement('div');
    usersContent.classList.add('usersContent');

    let myUsers = '';
    getUsers().then(users => {
        users.forEach(user => {
            myUsers += `<tr>
            <td class="test">${user.Name}</td>
            <td class="test">${user.Email}</td>
            <td class="test">${user.Favorites}</td>
         </tr>`
    
         usersContent.innerHTML = `
            <h1>User Information</h1>
            <table>
                <tr>
                    <th class="test">User Name</th>
                    <th class="test">User Email</th>
                    <th class="test">User Favorites</th>
                </tr>
                ${myUsers}
            </table>
        `
        })
    })

    usersModal.appendChild(usersContent);
    adminPortal.appendChild(usersModal);
    window.addEventListener('click', (event) => {
        if (event.target == usersModal) {
            usersModal.style.visibility = "hidden";
        }
    })



})

userNavigation.forEach(nav => {
    nav.addEventListener("click", function () {
        if (adminPortal != null) {
            var current = adminPortal.querySelector(".active");
            current.className = current.className.replace("active", "");
        }
        this.firstElementChild.classList.add("active");
        console.log(adminPortal.querySelector('.tracking'))
    });
    nav.addEventListener('click', () => {
        if (nav.textContent == 'Dashboard') {
            surveyListContainer.style.visibility = "hidden";
            ctx.style.display = "block";
            adminPortal.querySelector('.tracking').style.visibility = "visible";
            adminPortal.querySelector('.viewUsers').style.visibility = "visible";
        }
        if (nav.textContent == 'Create Survey') {
            surveyListContainer.style.visibility = "visible";
            ctx.style.display = "none";
            adminPortal.querySelector('.tracking').style.visibility = "hidden";
            adminPortal.querySelector('.viewUsers').style.visibility = "hidden";
        }
    })
})
