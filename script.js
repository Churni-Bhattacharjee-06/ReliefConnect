// SOS Generator
function generateSOS() {
    let name = document.getElementById("name").value;
    let location = document.getElementById("location").value;
    let type = document.getElementById("type").value;

    let message = `SOS ALERT

My name is ${name}.
I am stuck near ${location}.
Need immediate assistance due to ${type}.
Please help.`;

    document.getElementById("output").value = message;
}

// Copy SOS
function copySOS() {
    let text = document.getElementById("output");

    navigator.clipboard.writeText(text.value);

    alert("SOS message copied!");
}

// Checklist Progress
const checkboxes = document.querySelectorAll(".item");

checkboxes.forEach(box => {
    box.addEventListener("change", () => {
        updateProgress();
        calculateScore();
    });
});

function updateProgress() {
    let checked = document.querySelectorAll(".item:checked").length;
    let total = checkboxes.length;

    let percent = (checked / total) * 100;

    document.getElementById("progress-bar").style.width =
        percent + "%";

    document.getElementById("progress-text").textContent =
        `${Math.round(percent)}% Prepared`;
}

// Shelter Data
const shelters = [
    {
        name: "KIIT Hall",
        capacity: 500
    },
    {
        name: "Community Center",
        capacity: 300
    },
    {
        name: "School Building",
        capacity: 200
    }
];

// Display Shelters
function displayShelters(list = shelters) {
    let container =
        document.getElementById("shelter-list");

    container.innerHTML = "";

    list.forEach(shelter => {
        container.innerHTML += `
            <div class="card">
                <h3>${shelter.name}</h3>
                <p>Capacity: ${shelter.capacity}</p>
            </div>
        `;
    });
}

// Search Shelters
function searchShelters() {
    let search =
        document.getElementById("search")
        .value
        .toLowerCase();

    let filtered = shelters.filter(shelter =>
        shelter.name.toLowerCase().includes(search)
    );

    displayShelters(filtered);
}

document
.getElementById("search")
.addEventListener("keyup", searchShelters);

// Safety Guide
function showGuide(type) {

    let content =
        document.getElementById("guide-content");

    let guides = {

        cyclone: `
            <ul>
                <li>Stay indoors.</li>
                <li>Avoid windows.</li>
                <li>Charge devices.</li>
                <li>Keep emergency kit ready.</li>
            </ul>
        `,

        flood: `
            <ul>
                <li>Move to higher ground.</li>
                <li>Avoid flood water.</li>
                <li>Switch off electricity.</li>
                <li>Follow official alerts.</li>
            </ul>
        `,

        earthquake: `
            <ul>
                <li>Drop, Cover, Hold.</li>
                <li>Stay away from glass.</li>
                <li>Do not use lifts.</li>
                <li>Move to open space.</li>
            </ul>
        `
    };

    content.innerHTML = guides[type];
}

// Preparedness Score
function calculateScore() {

    let checked =
        document.querySelectorAll(".item:checked").length;

    let total = checkboxes.length;

    let score =
        Math.round((checked / total) * 100);

    document.getElementById("score-text")
        .textContent =
        `Score: ${score} / 100`;

    let suggestions =
        document.getElementById("suggestions");

    if (score === 100) {

        suggestions.innerHTML =
            "Excellent! You are fully prepared.";

    } else {

        suggestions.innerHTML = `
            Consider adding:
            <ul>
                <li>Radio</li>
                <li>Spare Batteries</li>
                <li>Water Purification Tablets</li>
            </ul>
        `;
    }
}

// Initial Load
displayShelters();
updateProgress();
calculateScore();