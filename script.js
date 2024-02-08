document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const alphabetListContainer = document.getElementById('alphabet-list');
            const accordionContainer = document.getElementById('accordion-container');
            data.sort((a, b) => a.title.localeCompare(b.title));

            const initialLetters = Array.from(new Set(data.map(item => item.title[0].toUpperCase()))).sort();
            

            initialLetters.forEach(letter => {
                const letterLink = document.createElement('a');
                letterLink.href = `#${letter}`;
                letterLink.textContent = letter;

                alphabetListContainer.appendChild(letterLink);
            });

            data.forEach(item => {
                const accordionItem = document.createElement('div');
                accordionItem.className = 'accordion-item';

                const accordionTitle = document.createElement('div');
                accordionTitle.className = 'accordion-title';
                accordionTitle.id = item.title[0].toUpperCase(); // Tambahkan id untuk anchor link
                // const alphabetLink = document.createElement('a');
                // alphabetLink.href = `#${accordionTitle.id}`;
                // alphabetLink.textContent = accordionTitle.id;

                // Menambahkan tautan huruf awal ke daftar huruf awal
                // alphabetListContainer.appendChild(alphabetLink);
                accordionTitle.textContent = item.title;

                const accordionContent = document.createElement('div');
                accordionContent.className = 'accordion-content';
                accordionContent.textContent = item.content;

                accordionItem.appendChild(accordionTitle);
                accordionItem.appendChild(accordionContent);
                accordionContainer.appendChild(accordionItem);


            });
        })
        .catch(error => console.error('Error:', error));
});

const az = document.getElementById("a-z");
const azbox = document.getElementById("azbox"); 

az.addEventListener("click", () => {
    azbox.classList.toggle("hidden");
})

let mybutton = document.getElementById("backtop");
window.onscroll = function() {scrollFunction()};// When the user scrolls down 20px from the top of the document, show the button

function scrollFunction() {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const dynamicText = document.getElementById("anim");
const words = ["dimanapun dan kapanpun", "dengan sekali sentuh😮‍💨",];

// Variables to track the position and deletion status of the word
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    dynamicText.textContent = currentChar;
    dynamicText.classList.add("stop-blinking");

    if (!isDeleting && charIndex < currentWord.length) {
        // If condition is true, type the next character
        charIndex++;
        setTimeout(typeEffect, 50);
    } else if (isDeleting && charIndex > 0) {
        // If condition is true, remove the previous character
        charIndex--;
        setTimeout(typeEffect, 50);
    } else {
        // If word is deleted then switch to the next word
        isDeleting = !isDeleting;
        dynamicText.classList.remove("stop-blinking");
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 800);
    }
}
typeEffect();
