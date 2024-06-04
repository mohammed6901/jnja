// Get a reference to the audio element
const backgroundAudio = document.getElementById('background-audio');
const correctAnswerSound = document.getElementById('correct-answer-sound');
const loseSound = document.getElementById('lose-sound');
const rAnswerSound = document.getElementById('r_answer'); // Define the r_answer audio element
const upLevelSound = document.getElementById('up-level-sound');
const fiftyFiftyButton = document.getElementById('50-50-button');
const callFriendButton = document.getElementById('call-friend-button');
const hintButton = document.getElementById('hint-button');
const waitingAudio = document.getElementById('waiting-audio');


let audioPaused = false; // Variable to track if audio is paused
let audioCurrentTime = 0; // Variable to store the current time of the audio


// Function to play the waiting audio
function playWaitingAudio() {
    const waitingAudio = document.getElementById('waiting-audio');
    waitingAudio.play().catch(error => {
        console.error('Error playing waiting audio:', error);
    });
}


// Function to stop the waiting audio and reset its time to 0
function stopWaitingAudio() {
    const waitingAudio = document.getElementById('waiting-audio');
    waitingAudio.pause();
    waitingAudio.currentTime = 0;
}


// Function to stop background audio
function stopBackgroundAudio() {
    backgroundAudio.pause();
    backgroundAudio.currentTime = 0; // Reset audio playback to the beginning
}


// Function to stop all sounds
function stopAllSounds() {
    // Pause the background audio and reset its time to 0
    backgroundAudio.pause();
    backgroundAudio.currentTime = 0;

    // Pause the correct answer sound and reset its time to 0
    correctAnswerSound.pause();
    correctAnswerSound.currentTime = 0;

    // Pause the lose sound and reset its time to 0
    loseSound.pause();
    loseSound.currentTime = 0;

    // Pause the r_answer sound and reset its time to 0
    rAnswerSound.pause();
    rAnswerSound.currentTime = 0;
}


function resetGameState() {
    currentStep = 0; // Reset the current step to 0
    selectedQuestions = []; // Clear the selected questions array
    answeredQuestions.clear(); // Clear the answered questions set

}


// Function to handle wrong answer selected
function handleWrongAnswer() {
    // Reset the game state
    resetGameState();
    // Reload the page
    location.reload();
}



function playUpLevelSound() {
    upLevelSound.play().catch(error => {
        console.error('Error playing up_level sound:', error);
    });
}


// Function to play the correct answer sound
function playCorrectAnswerSound() {
    stopAllSounds(); // Stop all sounds before playing a new one
    correctAnswerSound.play().catch(error => {
        console.error('Error playing correct answer sound:', error);
    });
}


// Function to play sound when fifty-fifty button is pressed
function playFiftySound() {
    const fiftySound = document.getElementById('fifty-sound');
    fiftySound.play().catch(error => {
        console.error('Error playing fifty sound:', error);
    });
}


// Function to play sound when phone button is pressed
function playPhoneSound() {
    const phoneSound = document.getElementById('phone-sound');
    phoneSound.play().catch(error => {
        console.error('Error playing phone sound:', error);
    });
}


// Function to play the guess sound when the call button is pressed
function playGuessSound() {
    const guessSound = document.getElementById('guess-sound');
    guessSound.play();
}


// Function to play a sound with specified duration
function playSoundWithDuration(soundElement, durationInSeconds) {
    soundElement.play(); // Start playing the sound

    // Stop the sound after the specified duration
    setTimeout(() => {
        soundElement.pause(); // Pause the sound
        soundElement.currentTime = 0; // Rewind the audio to the beginning
    }, durationInSeconds * 1000); // Convert seconds to milliseconds
}


// Function to play the call sound for a specific duration
function playCallSoundWithDuration(durationInSeconds) {
    const callSound = document.getElementById('call-sound');
    playSoundWithDuration(callSound, durationInSeconds);
}


function playRAnswerSound() {
    stopAllSounds(); // Stop all sounds before playing a new one
    rAnswerSound.play().catch(error => {
        console.error('Error playing r_answer sound:', error);
    });
}


function playLoseSound() {
    stopAllSounds(); // Stop all sounds before playing a new one
    loseSound.play().catch(error => {
        console.error('Error playing lose sound:', error);
    });
}


// Function to play background audio
function playBackgroundAudio() {
    stopAllSounds(); // Stop all sounds before playing a new one
    backgroundAudio.play().catch(error => {
        console.error('Error playing background audio:', error);
    });
}


// Function to pause background audio
function pauseBackgroundAudio() {
    backgroundAudio.pause();
    audioPaused = true;
    audioCurrentTime = backgroundAudio.currentTime; // Store the current time
}


// Function to resume background audio
function resumeBackgroundAudio() {
    backgroundAudio.play().then(() => {
        // Check if the audio was paused before
        if (audioPaused) {
            // Resume from the last paused position
            backgroundAudio.currentTime = audioCurrentTime;
            audioPaused = false;
        }
    }).catch(error => {
        console.error('Error playing background audio:', error);
    });
}



let currentStep = 0;
const maxSteps = 15;
let selectedQuestions = [];
let answeredQuestions = new Set();

const rewards = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000]; // Dummy rewards array

const rewardsList = document.getElementById('rewards-list'); // Define rewardsList

// Populate the rewards list
for (let i = rewards.length - 1; i >= 0; i--) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span class="number reward-number-${i + 1}">${i + 1}/</span>${rewards[i].toLocaleString('en-us')}`;
    listItem.id = `reward-${i + 1}`;
    rewardsList.appendChild(listItem);
}


const questionElement = document.querySelector('.question');
const answersContainer = document.querySelector('.answers-container');
// Get a reference to the audio element

function initializeGame() {
    
    playWaitingAudio();
    // Display the welcome container
    document.getElementById('welcome-message-container').style.display = 'block';    

    // Add event listener to the start button
    document.getElementById('start-btn').addEventListener('click', () => {
    // Stop the waiting audio when the game starts
        stopWaitingAudio();
        // Hide the welcome container
        document.getElementById('welcome-message-container').style.display = 'none';
        // Show the question container
        document.getElementById('question-container').classList.remove('initial-hidden');
        // Show the rewards container
        document.getElementById('rewards-container').style.display = 'block';
         // Show the circle buttons
        document.getElementById('circle-buttons-container').style.display = 'flex';
        // Start playing background audio
        playBackgroundAudio();
        // Start initializing the game
        selectQuestions();
        displayQuestion();
        highlightRewards(); // Highlight the initial level (100) immediately upon initialization
    });

}


// Modify the highlightRewards function to highlight the current level based on currentStep
function highlightRewards() {
    // Remove existing highlight classes from all rewards
    rewardsList.querySelectorAll('li').forEach(item => {
        item.classList.remove('current-question');
        item.style.backgroundColor = ''; // Remove any background color
    });

    // Highlight the current level based on currentStep
    const rewardIndex = currentStep >= maxSteps ? maxSteps - 1 : currentStep; // Highlight the last reward if currentStep exceeds maxSteps
    const rewardItem = document.getElementById(`reward-${rewardIndex + 1}`);
    if (rewardItem) {
        rewardItem.classList.add('current-question');
    }
}




// Call the initializeGame function when the page is loaded
document.addEventListener('DOMContentLoaded', initializeGame);

// Function to select questions
function selectQuestions() {
    // Filter out questions that have already been answered
    const unansweredQuestions = allQuestions.filter(question => !answeredQuestions.has(question.question));
    // Shuffle the unanswered questions
    const shuffledQuestions = shuffleArray(unansweredQuestions);
    // Select the first `maxSteps` number of questions
    selectedQuestions = shuffledQuestions.slice(0, maxSteps);
    // Initialize currentQuestion
    currentQuestion = selectedQuestions[0];
}


let correctAnswerIndex; // Variable to store the index of the correct answer

function displayQuestion() {
    // Set currentQuestion
    currentQuestion = selectedQuestions.pop();
    // Fade out the question container
    document.querySelector('.question-container').style.opacity = '0';

    // Display the current question after a short delay
    setTimeout(() => {
        if (currentQuestion) { // Check if there is a current question to display
            questionElement.textContent = currentQuestion.question;
            answersContainer.innerHTML = ""; // Clear previous answers

            // Shuffle the answers
            const shuffledAnswers = shuffleArray(currentQuestion.answers);
            correctAnswerIndex = shuffledAnswers.findIndex(answer => answer === currentQuestion.correctAnswer); // Store the index of the correct answer

            // Display shuffled answers
            shuffledAnswers.forEach(answer => {
                const button = document.createElement('button');
                button.textContent = answer;
                button.classList.add('answer');
                button.addEventListener('click', () => selectAnswer(answer, currentQuestion));
                answersContainer.appendChild(button);
            });

            // Fade in the question container
            document.querySelector('.question-container').style.opacity = '1';
        } else {
            // Handle case when there are no more questions to display
            console.log("No more questions remaining.");
        }
    }, 500); // Adjust the delay time as needed (e.g., 500 milliseconds for 0.5 seconds)
}


// Add event listener to the 50:50 button
fiftyFiftyButton.addEventListener('click', () => {
    playFiftySound();
    // Add a class to the button when clicked
    fiftyFiftyButton.classList.add('clicked');

    fiftyFiftyButton.disabled = true;

    fiftyFiftyButton.textContent = "☓";
    fiftyFiftyButton.classList.add('disabled'); // Add the 'disabled' class

    // Get all answer buttons
    const answerButtons = document.querySelectorAll('.answer');

    // Initialize count for hidden incorrect buttons
    let hiddenCount = 0;

    // Iterate over the answer buttons
    answerButtons.forEach((button, index) => {
        // If the button's index matches the correct answer's index, skip
        if (index === correctAnswerIndex) {
            return;
        }

        // If the button is already hidden or the count of hidden incorrect buttons is already 1, skip
        if (button.style.visibility === 'hidden' || hiddenCount === 2) {
            return;
        }

        // Hide the button
        button.style.visibility = 'hidden';

        // Increment the count of hidden incorrect buttons
        hiddenCount++;
    });
});


// Function to flash the call friend button and change its border color
function flashCallFriendButton() {
    const callFriendButton = document.getElementById('call-friend-button');
    const originalColor = callFriendButton.style.backgroundColor || ''; // Store the original background color
    const originalBorderColor = callFriendButton.style.borderColor || ''; // Store the original border color

    // Change the border color to green
    callFriendButton.style.borderColor = 'green';

    // Flash the button's background color at a regular interval
    const interval = setInterval(() => {
        callFriendButton.style.backgroundColor = callFriendButton.style.backgroundColor === 'gold' ? originalColor : 'gold';
    }, 500); // Flash every 500 milliseconds (half a second)

    // Stop flashing and restore the original styles after 8 seconds
    setTimeout(() => {
        clearInterval(interval); // Stop the flashing
        callFriendButton.style.backgroundColor = originalColor; // Restore the original background color
        callFriendButton.style.borderColor = originalBorderColor; // Restore the original border color
    }, 17000); // Flash for 8 seconds
}


// Function to show the hint container with the correct answer text
function showHint(correctAnswerIndex) {
    const answers = document.querySelectorAll('.answer');
    const correctAnswerText = answers[correctAnswerIndex].textContent;

    const hintContainer = document.getElementById('hint-container');
    const hintText = document.getElementById('hint-text');
    hintText.textContent =  "🗣️ " + correctAnswerText; // Inserting the emoji before the answer text
    hintContainer.style.display = 'block';
}


// Event listener for the call friend button
callFriendButton.addEventListener('click', () => {
    callFriendButton.classList.add('clicked');
    callFriendButton.textContent = "📲";
    // Disable the call friend button
    callFriendButton.disabled = true;
    // Play the flash effect when the button is clicked
    flashCallFriendButton();
    // Pause the background audio
    pauseBackgroundAudio();

    // Play the phone sound
    playPhoneSound();
     // Play the call sound
    playCallSoundWithDuration(15); // Play the call sound for 3 seconds
    // Resume the background audio after 1 second
    setTimeout(() => {
        // Add the 'clicked' class to the call friend button
        callFriendButton.classList.add('clicked');
        // Add the 'disabled' class to the call friend button
        callFriendButton.classList.add('disabled');
        // Change the text content to '☓'
        callFriendButton.textContent = "☓";
        // Pass the correct answer index to the showHint function
        // Play the guess sound
        playGuessSound();
        showHint(correctAnswerIndex);
        setTimeout(() => {
            resumeBackgroundAudio();
        }, 1000);
    }, 17000);
});


function selectAnswer(answer, question) {
    // Check if the selected answer is correct
    const isCorrect = answer === question.correctAnswer;

    if (isCorrect) {
        // Mark the question as answered
        answeredQuestions.add(question.question);
        stopBackgroundAudio();
        playRAnswerSound();
        setTimeout(() => {
        playCorrectAnswerSound();
        }, 1000);

        // Highlight the button with green background color
        event.target.style.backgroundColor = 'green';

        // Get the correct answer button
        const correctButton = [...answersContainer.children].find(button => button.textContent === question.correctAnswer);
        const originalTextContent = correctButton.textContent;
        const originalColor = correctButton.style.color || ''; // Store the original text color
        const originalShadow = correctButton.style.textShadow || ''; // Store the original text shadow

        // Hide the text content and shadow of the correct answer
        correctButton.textContent = '';
        correctButton.style.textShadow = 'none';

        // Flash the correct answer text and shadow after a delay
        setTimeout(() => {
            // Flash the correct answer text and shadow at regular intervals
            const flashInterval = setInterval(() => {
                if (correctButton.textContent === '') {
                    correctButton.textContent = originalTextContent;
                    correctButton.style.color = originalColor;
                    correctButton.style.textShadow = originalShadow;
                } else {
                    correctButton.textContent = '';
                    correctButton.style.color = 'transparent';
                    correctButton.style.textShadow = 'none';
                }
            }, 400); // Flash every 200 milliseconds

            // Stop flashing after 2 seconds (adjust as needed)
            setTimeout(() => {
                clearInterval(flashInterval); // Stop the flashing
                correctButton.textContent = originalTextContent; // Restore the original text content
                correctButton.style.color = originalColor; // Restore the original text color
                correctButton.style.textShadow = originalShadow; // Restore the original text shadow
            }, 3000); // Flash for 2 seconds (adjust as needed)
        }, 100); // Delay before starting the flashing (adjust as needed)

        // Check if the current question is the last one and if all questions have been answered
        if (selectedQuestions.length === 0 && answeredQuestions.size === maxSteps) {
            // Wait for 4 seconds before reloading the page
            setTimeout(() => {
                location.reload();
            }, 4000);
            return; // Exit the function to prevent further execution
        }


        // Disable all answer buttons after selecting an answer
        document.querySelectorAll('.answer').forEach(button => {
            button.disabled = true;
        });

        // Automatically proceed to the next question after a delay
        setTimeout(() => {
            nextQuestion(); // Call the function to display the next question
        }, 3000); // Adjust the delay time as needed (e.g., 3000 milliseconds for 3 seconds)

    } else {
        stopAllSounds(); // Stop all sounds before playing a new one
        // Play lose sound effect
        playLoseSound();
        // Highlight the selected button with orange background color
        event.target.style.backgroundColor = 'orange';

        // Find and highlight the button with the correct answer
        const correctButton = [...answersContainer.children].find(button => button.textContent === question.correctAnswer);
        if (correctButton) {
            // Flash the correct answer button for 3 seconds
            const flashInterval = setInterval(() => {
                correctButton.style.backgroundColor = correctButton.style.backgroundColor === 'green' ? '' : 'green';
            }, 200); // Change color every 500 milliseconds

            // Stop flashing after 3 seconds
            setTimeout(() => {
                clearInterval(flashInterval);
                correctButton.style.backgroundColor = 'green'; // Ensure the correct answer button remains green
            }, 3000);
        }

        // Disable all answer buttons after selecting an answer
        document.querySelectorAll('.answer').forEach(button => {
            button.disabled = true;
        });

        // Show the welcome message container again after a delay
        setTimeout(() => {
            // Reset the game state
            handleWrongAnswer();
        }, 4000);
    }

    // Call highlightRewards to update the highlighting
    highlightRewards(answeredQuestions.size);
}


function nextQuestion() {
    console.log("Next question button clicked!"); // Add this line to check if the function is being called
    // Hide the hint container
    const hintContainer = document.getElementById('hint-container');
    hintContainer.style.display = 'none';

    // Check if the user has reached the maximum steps or went to the welcome page
    if (currentStep >= maxSteps) {
        // Redirect to the win page when the user wins
        window.location.href = "/win";
        // Reset the game state by setting the currentStep to 0
        currentStep = 0;
        // Clear the answeredQuestions Set
        answeredQuestions.clear();
        return; // Exit the function to prevent further execution
    }

    // Increment currentStep
    currentStep++;

    // Display the next question only if the user hasn't reached the maximum steps
    if (currentStep < maxSteps) {
        // Set a delay before displaying the next question
        setTimeout(() => {
            // Call the function to play the "up_level" sound
            playUpLevelSound();

            displayQuestion();
            setTimeout(() => {
            stopAllSounds();
            playBackgroundAudio();
            }, 600);

            // Call highlightRewards to update the highlighting
            highlightRewards(answeredQuestions.size);
            // Call the function to play the "up_level" sound
            playUpLevelSound();
        }, 1000); // Adjust the delay time as needed (e.g., 2000 milliseconds for 2 seconds)
    }
}


function getRandomQuestions(allQuestions, count) {
    // Function to randomly select 'count' number of questions from 'allQuestions'
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}


// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// Sample questions
const allQuestions = [
    {
        question: "What is the largest mammal in the world?",
        answers: ["Blue Whale", "Elephant", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "What is the currency of Brazil?",
        answers: ["Brazilian Real", "Euro", "Dollar", "Peso"],
        correctAnswer: "Brazilian Real"
    },
    {
        question: "Who was the first person to step on the moon?",
        answers: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"],
        correctAnswer: "Neil Armstrong"
    },
    {
        question: "What is the capital of Australia?",
        answers: ["Canberra", "Sydney", "Melbourne", "Brisbane"],
        correctAnswer: "Canberra"
    },
    {
        question: "Who painted 'Starry Night'?",
        answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        correctAnswer: "Vincent van Gogh"
    },
    {
        question: "What is the main ingredient in guacamole?",
        answers: ["Avocado", "Tomato", "Onion", "Lemon"],
        correctAnswer: "Avocado"
    },
    {
        question: "Which continent is the largest by land area?",
        answers: ["Asia", "Africa", "North America", "South America"],
        correctAnswer: "Asia"
    },
    {
        question: "What is the tallest mountain in the world?",
        answers: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
        correctAnswer: "Mount Everest"
    },
    {
        question: "Who is known as the 'Father of Modern Physics'?",
        answers: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Niels Bohr"],
        correctAnswer: "Albert Einstein"
    },
    {
        question: "What is the national sport of Canada?",
        answers: ["Ice Hockey", "Lacrosse", "Soccer", "Baseball"],
        correctAnswer: "Ice Hockey"
    },
    {
        question: "Which famous scientist developed the theory of relativity?",
        answers: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Stephen Hawking"],
        correctAnswer: "Albert Einstein"
    },
    {
        question: "In which city is the Eiffel Tower located?",
        answers: ["Paris", "London", "Rome", "Berlin"],
        correctAnswer: "Paris"
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: ["Au", "Ag", "Fe", "Cu"],
        correctAnswer: "Au"
    },
    {
        question: "Who composed the 'Symphony No. 9'?",
        answers: ["Ludwig van Beethoven", "Wolfgang Amadeus Mozart", "Johann Sebastian Bach", "Franz Schubert"],
        correctAnswer: "Ludwig van Beethoven"
    },
    {
        question: "Which country is famous for the Great Barrier Reef?",
        answers: ["Australia", "Brazil", "Mexico", "India"],
        correctAnswer: "Australia"
    },
    {
        question: "Who composed the famous piano piece 'Für Elise'?",
        answers: ["Ludwig van Beethoven", "Wolfgang Amadeus Mozart", "Johann Sebastian Bach", "Frédéric Chopin"],
        correctAnswer: "Ludwig van Beethoven"
    },
    {
        question: "Which planet is known as the 'Morning Star' or 'Evening Star'?",
        answers: ["Venus", "Mercury", "Mars", "Jupiter"],
        correctAnswer: "Venus"
    },
    {
        question: "What is the chemical symbol for iron?",
        answers: ["Fe", "Au", "Ag", "Pb"],
        correctAnswer: "Fe"
    },
    {
        question: "Who is the author of 'The Great Gatsby'?",
        answers: ["F. Scott Fitzgerald", "Ernest Hemingway", "John Steinbeck", "Toni Morrison"],
        correctAnswer: "F. Scott Fitzgerald"
    },
    {
        question: "What is the largest organ in the human body?",
        answers: ["Skin", "Liver", "Heart", "Brain"],
        correctAnswer: "Skin"
    },
    {
        question: "Who painted 'The Persistence of Memory'?",
        answers: ["Salvador Dalí", "Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci"],
        correctAnswer: "Salvador Dalí"
    },
    {
        question: "Which planet is known for its beautiful rings?",
        answers: ["Saturn", "Uranus", "Neptune", "Jupiter"],
        correctAnswer: "Saturn"
    },
    {
        question: "What is the chemical symbol for silver?",
        answers: ["Ag", "Au", "Pt", "Cu"],
        correctAnswer: "Ag"
    },
    {
        question: "Who wrote the novel 'Pride and Prejudice'?",
        answers: ["Jane Austen", "Charlotte Brontë", "Emily Dickinson", "Virginia Woolf"],
        correctAnswer: "Jane Austen"
    },
    {
        question: "What is the largest desert in the world?",
        answers: ["Antarctica", "Sahara", "Arabian", "Gobi"],
        correctAnswer: "Antarctica"
    }
];
