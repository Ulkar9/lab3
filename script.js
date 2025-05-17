const data = {
  name: "Xurşudova Ülkər",
  title: "Tələbə",
  personalInfo: [
    { icon: "calendar.png", value: "29.09.2007" },
    { icon: "phone.png", value: "051-305-43-59" },
    { icon: "gmail.jpg", value: "xursudova29@gmail.com" },
    { icon: "location.png", value: "Bakı şəhəri, Yasamal rayonu, Vasif Əliyev 42" }
  ],
  sections: [
    {
      title: "Təhsil",
      content: "Qəbələ şəhər Pərviz Osmanov adına 2 saylı tam orta məktəb (2013–2024)\nAzərbaycan Texniki Universiteti - İnformasiya Təhlükəsizliyi (2024–2028)"
    },
    {
      title: "Şəxsi Keyfiyyətlər",
      content: "Məsuliyyətli\nÖyrənməyə açıq\nAnalitik düşünmək"
    },
    {
      title: "Haqqımda",
      content: "Təzə biliklərə açıq, öyrənməyi sevən biriyəm..."
    }
  ]
};

function loadSidebar() {
  const sidebar = document.getElementById("sidebar");
  let html = `<img src="my photo.jpg" alt="Photo" class="profile">
  <h2>Şəxsi məlumatlar</h2><hr>`;

  data.personalInfo.forEach((info, index) => {
    html += `
      <div class="personal-item">
        <img src="${info.icon}" class="icon">
        <input type="text" value="${info.value}" id="personal-${index}" disabled>
        <button onclick="editPersonal(${index})">Düzəliş et</button>
        <button onclick="savePersonal(${index})">Yadda saxla</button>
      </div>`;
  });

  sidebar.innerHTML = html;
}

function editPersonal(index) {
  document.getElementById(`personal-${index}`).disabled = false;
}

function savePersonal(index) {
  const input = document.getElementById(`personal-${index}`);
  data.personalInfo[index].value = input.value;
  input.disabled = true;
  alert("Şəxsi məlumat yadda saxlanıldı!");
}

function loadContent() {
  document.getElementById("cv-name").innerText = data.name;
  document.getElementById("cv-title").innerText = data.title;

  const accordion = document.getElementById("accordion-content");
  accordion.innerHTML = "";

  data.sections.forEach((section, index) => {
    accordion.innerHTML += `
      <button class="accordion-btn">${section.title}</button>
      <div class="accordion-panel">
        <textarea rows="4" data-index="${index}">${section.content}</textarea>
        <button onclick="saveSection(${index})">Yadda saxla</button>
      </div>`;
  });

  setupAccordion();
}

function saveSection(index) {
  const textArea = document.querySelector(`textarea[data-index="${index}"]`);
  data.sections[index].content = textArea.value;
  alert("Bölmə məlumatı yadda saxlanıldı!");
}

function setupAccordion() {
  const buttons = document.querySelectorAll(".accordion-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      panel.style.display = (panel.style.display === "block") ? "none" : "block";
    });
  });
}

document.getElementById("add-section").addEventListener("click", () => {
  const newTitle = prompt("Bölmə başlığı:");
  if (newTitle) {
    data.sections.push({ title: newTitle, content: "" });
    loadContent();
  }
});

loadSidebar();
loadContent();
