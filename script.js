const quizes = [
    {
        "category": "Film",
        "questions": [
            {
                "question": "Vilken film är detta? </br> &#129409; &#128081;",  
                "answers": {
                    "correct": "Lejonkungen",
                    "wrong": ["Madagaskar", "Djungelboken"]
                }
            },
            {
                "question": "Vilken film är detta? </br> &#128674; &#129482; &#128148;",  
                "answers": {
                    "correct": "Titanic",
                    "wrong": ["Poseidon", "Pirates of the Caribbean"]
                }
            },
            {
                "question": "Vilken film är detta? </br> &#128526; &#128299; &#128311; &#128138;",  
                "answers": {
                    "correct": "The Matrix",
                    "wrong": ["Inception", "Terminator"]
                }
            },
            {
                "question": "Vilken film är detta? </br> &#127993; &#128103; &#128293;",  
                "answers": {
                    "correct": "Hunger Games",
                    "wrong": ["Brave", "Divergent"]
                }
            },
            {
                "question": "Vilken film är detta? </br> &#129415; &#129333; &#127183;",  
                "answers": {
                    "correct": "The Dark Knight", // Fixed spelling of "Knight"
                    "wrong": ["Spider-Man", "Batman Begins"]
                }
            }
        ]
    },
    {
        "category": "Musik",
        "questions": [
            {
                "question": "Vilken låt är detta? </br> &#128103; &#128142; &#128141;",
                "answers": {
                    "correct": "Single Ladies (Beyoncé)",
                    "wrong": ["Girls Just Wanna Have Fun (Cyndi Lauper)", "Diamonds (Rihanna)"]
                }
            },
            {
                "question": "Vilken låt är detta? </br> &#128156; &#9748;",
                "answers": {
                    "correct": "Purple Rain (Prince)",
                    "wrong": ["November Rain (Guns N' Roses)", "Raindrops Keep Fallin' on My Head (B.J. Thomas)"]
                }
            },
            {
                "question": "Vilken låt är detta? </br> &#128064; &#128065; &#128005;",
                "answers": {
                    "correct": "Eye of the Tiger (Survivor)",
                    "wrong": ["Roar (Katy Perry)", "Wild Ones (Flo Rida)"]
                }
            },
            {
                "question": "Vilken låt är detta? </br> &#128081 &#127926; &#128131;",
                "answers": {
                    "correct": "Dancing Queen (ABBA)",
                    "wrong": ["Uptown Funk (Mark Ronson ft. Bruno Mars)", "Billie Jean (Michael Jackson)"]
                }
            },
            {
                "question": "Vilken låt är detta? </br> &#127929;&#127925;&#128293;&#127936;",
                "answers": {
                    "correct": "Great Balls of Fire (Jerry Lee Lewis)",
                    "wrong": ["Ring of Fire (Johnny Cash)", "Light My Fire (The Doors)"]
                }
            }

        ]
    }
   
    
];


let userAnswers = []
let correctAnswers = []
let askedQuestions = []
const mainContainer = document.querySelector("#mainContainer")

const headTitle = document.querySelector("#headTitle")
headTitle.addEventListener("click", function () {
    fillHome()
})

function fillHome() {
    
    mainContainer.innerHTML = "" //empty content before redraw
    quizes.forEach(quiz => {
        const categoryButton = document.createElement("button")
        categoryButton.className = "categoryButton"
        const title = document.createElement("h2")
        title.textContent = quiz.category
        categoryButton.appendChild(title)
        
        categoryButton.addEventListener("click", function () {  
            correctAnswers = []
            quiz.questions.forEach(question => {
                correctAnswers.push(question.answers.correct)
            }) 
            printQuiz(quiz, 0)
        })
        mainContainer.appendChild(categoryButton)
    })
}


function printQuiz(quiz, index) {
    mainContainer.innerHTML = ""
    const currentQuestion = quiz.questions[index]
    askedQuestions.push(currentQuestion.question)
    const container = document.createElement("div")
    container.id = "questionContainer"
    const quizQuestion = document.createElement ("p")
    quizQuestion.innerHTML = currentQuestion.question
    const alternativeContainer = document.createElement("form")
    alternativeContainer.id = "formContainer"
    const answers = [currentQuestion.answers.correct]
    currentQuestion.answers.wrong.forEach(answer => {
        answers.push(answer)
    })
    
    answers.sort(() => Math.random() - 0.5) //mixes the wrong and right answers

    answers.forEach(answer => {
        const radioOptionContainer = document.createElement("div")
        radioOptionContainer.className = "radioOptionContainer"
        const alternativ = document.createElement("input")
        const radioLabel = document.createElement("label")
        radioLabel.textContent = answer
        
        alternativ.type = "radio"
        alternativ.label = answer
        alternativ.name = currentQuestion.question
        alternativ.value = answer
        alternativ.id = answer
        radioLabel.setAttribute("for", answer)
        
        radioOptionContainer.appendChild(alternativ)  
        radioOptionContainer.appendChild(radioLabel)
        alternativeContainer.appendChild(radioOptionContainer)
    })
    
    const nextButton = document.createElement("input")
    nextButton.id = "nextButton"
    nextButton.type = "submit"
    nextButton.value = "Nästa fråga" 

    nextButton.addEventListener("click", function () {
        const radioName = currentQuestion.question
        const selectedRadio = document.querySelector(`input[name="${radioName}"]:checked`)

        if (selectedRadio) {
            userAnswers.push(selectedRadio.value)
            if (index < quiz.questions.length -1) {
                printQuiz(quiz, index + 1)
            } else {
                displayResults()
            }
        } else {
            alert("Du måste välja ett alternativ!")
        }

    })

    container.appendChild(quizQuestion)
    container.appendChild(alternativeContainer)
    container.appendChild(nextButton)
    mainContainer.appendChild(container) 
}

function displayResults() {
    mainContainer.innerHTML = ""
    const resultContainer = document.createElement("div")
    resultContainer.id = "resultContainer"
    const title = document.createElement("h2")
    title.textContent = "Ditt resultat: "
    resultContainer.appendChild(title)

    let score = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
        if (userAnswers[i] === correctAnswers[i]) {
            score++;
        }
    }
    const result = document.createElement("p")
    result.id = "showResult"
    result.textContent = score + " av " + (correctAnswers.length)
    resultContainer.appendChild(result)

    for (let i = 0; i < correctAnswers.length; i++) {
        const resultSection = document.createElement("section")
        const askedQuestion = document.createElement("p")
        askedQuestion.innerHTML = askedQuestions[i]
        const answer = document.createElement("p")
        answer.textContent = "Du svarade: " + userAnswers[i]
        const correctAnswer = document.createElement("p")
        correctAnswer.textContent = "Rätt svar är: " + correctAnswers[i]

        if (userAnswers[i] === correctAnswers[i]) {
            score++;
        }
        resultSection.appendChild(askedQuestion)
        resultSection.appendChild(answer)
        resultSection.appendChild(correctAnswer)
        resultContainer.appendChild(resultSection)
    }
         
    
    const goHomeButton = document.createElement("button")
    goHomeButton.id = "goHomeButton"
    goHomeButton.textContent = "Till startsidan"

    goHomeButton.addEventListener("click", function () {
        userAnswers = []
        correctAnswers = []
        askedQuestions = []
        fillHome()
    })
  
    resultContainer.appendChild(goHomeButton)
    mainContainer.appendChild(resultContainer)
  
}
fillHome() 
