document.addEventListener('DOMContentLoaded', () => {
    // --- DATA --- 
    const userData = {
        name: "ÜLKƏR <span class='highlight'>XURŞUDOVA</span>",
        title: "STUDENT",
        contact: [
            { icon: "phone.png", text: "+994-51-305-43-59" },
            { icon: "email.png", text: "xursudova29@gmail.com" },
            { icon: "location.png", text: "Yasamal rayonu, Vasif Əliyev 42" }
        ],
        socialMedia: [
        ],
        education: [
            { period: "2013 - 2024", school: "Qəbələ şəhər Pərviz Osmanov adına 2 saylı tam orta məktəb" },
            { period: "2024 - 2025", school: "Azərbaycan Texniki Universiteti - İnformasiya Təhlükəsizliyi" }
        ],
        skills: ["Liderlik", "Proqramlaşdırma dilləri (Python, C++)", "Frontend Texnologiyaları (HTML, CSS və s.)", "Ofis Proqramları (Word, Excel, PowerPoint)", "Yaradıcı düşüncə və təşəbbüskarlıq", "Problemləri analiz etmə və həll etmə"],
        languages: ["Azərbaycan - Çox yaxşı", "English - Elementary", "Türk - Yaxşı"],
        profile: "Təzə biliklərə açıq, öyrənməyi sevən biriyəm. Verilən tapşırıqları məsuliyyətlə yerinə yetirirəm və daima öz üzərimdə işləyirəm",
        workExperience: [
            {
                title: "Video Redaktoru – PixelFrame Studios",
                details: ["Redaktə edilmiş qısa və uzun formalı məzmun...", "Qısa müddət ərzində təqdim olunan layihələr..."]
            },
            {
                title: "İT Dəstək Köməkçisi – BrightTech Universiteti",
                details: ["Tələbələrə texniki yardım göstərilib...", "Sənədləşdirilmiş dəstək biletləri və vaxtında həlli təmin edilmişdir."]
            }
        ],
        reference: "Əli Kamal İT dəstək komandasında part-time işlədiyim müddətdə menecerim olub...",
        certifications: [
            {
                name: "Python Hamı üçün İxtisas",
                description: "Python proqramlaşdırmasını əhatə edən çox kurslu ixtisas..."
            },
            {
                name: "AWS Sertifikatlı Bulud Təcrübəçisi",
                description: "Bulud hesablama əsasları üçün giriş səviyyəsində sertifikatlaşdırma..."
            }
        ],
        projects: [
            {
                name: "Portfolio veb saytının inkişafı",
                description: "HTML, CSS və JavaScript-dən istifadə edərək tam cavab verən şəxsi portfel yaradın..."
            },
            {
                name: "Kibertəhlükəsizlik Laboratoriyasının Simulyasiyası",
                description: "VirtualBox və Kali Linux istifadə edərək virtual nüfuz test laboratoriyası hazırlayıb..."
            }
        ]
    };

    // --- ADD DATA TO PAGE ---
    document.getElementById('userName').innerHTML = userData.name;
    document.getElementById('userTitle').textContent = userData.title;

    const createList = (array, iconPath = "") => {
        return array.map(item => 
            `<p class="editable" contenteditable="false"><img src="photos/${iconPath}${item.icon || ''}" alt="" class="icon"> ${item.text}</p>`
        ).join('');
    };

    const createEducation = (array) => {
        return array.map(item => `<p><strong>${item.period}</strong><br>${item.school}</p>`).join('');
    };

    const createSkills = (array) => {
        return `<ul style="list-style-type: none;">${array.map(skill => `<li>${skill}</li>`).join('')}</ul>`;
    };

    const createWork = (array) => {
        return array.map(job => `
            <p><strong>${job.title}</strong></p>
            <ul style="list-style-type: none;">${job.details.map(d => `<li>${d}</li>`).join('')}</ul>
        `).join('');
    };

    const createCertifications = (array) => {
        return array.map(cert => `
            <p><strong>${cert.name}</strong></p>
            <p>${cert.description}</p>
        `).join('');
    };

    const createProjects = (array) => {
        return array.map(project => `
            <p><strong>${project.name}</strong></p>
            <p>${project.description}</p>
        `).join('');
    };

    document.getElementById('contactInfo').innerHTML = createList(userData.contact);
    document.getElementById('socialMedia').innerHTML = createList(userData.socialMedia);
    document.getElementById('educationInfo').innerHTML = createEducation(userData.education);
    document.getElementById('skillsInfo').innerHTML = createSkills(userData.skills);
    document.getElementById('languagesInfo').innerHTML = createSkills(userData.languages);
    document.getElementById('profileInfo').innerHTML = `<p>${userData.profile}</p>`;
    document.getElementById('workExperience').innerHTML = createWork(userData.workExperience);
    document.getElementById('referenceInfo').innerHTML = `<p>${userData.reference}</p>`;
    document.getElementById('certificationsInfo').innerHTML = createCertifications(userData.certifications);
    document.getElementById('projectsInfo').innerHTML = createProjects(userData.projects);

    // --- OLD FUNCTIONS (Edit, Save, Accordion, Zip) ---
    const editBtn = document.getElementById('editBtn');
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    let isEditing = false;

    // Accordion open/close
    accordionBtns.forEach(button => {
        button.addEventListener('click', () => {
            const panel = button.nextElementSibling;
            if (panel.classList.contains('active')) {
                panel.style.maxHeight = null;
                panel.classList.remove('active');
            } else {
                panel.classList.add('active');
                panel.style.maxHeight = "300px";
            }
        });
    });

    // Toggle edit mode
    editBtn.addEventListener('click', () => {
        isEditing = !isEditing;
        editBtn.textContent = isEditing ? 'Save' : 'Edit';

        // Open Accordion panels
        accordionBtns.forEach(btn => {
            const panel = btn.nextElementSibling;
            panel.classList.add('active');
            panel.style.maxHeight = "300px";
        });

        // Activate all editable fields
        const editableElements = document.querySelectorAll('h1, h3, .accordion-panel p, .accordion-panel li, .accordion-panel .editable');
        editableElements.forEach(el => {
            el.setAttribute('contenteditable', isEditing);
        });

        // Save
        if (!isEditing) {
            downloadFiles();
        }
    });

    // Add a new line on Enter key
    const panels = document.querySelectorAll('.accordion-panel');
    panels.forEach(panel => {
        panel.addEventListener('keydown', e => {
            if (!isEditing) return;
            if (e.key === 'Enter') {
                e.preventDefault();
                document.execCommand('insertHTML', false, '<br><br>');
            }
        });
    });

    // Download the page as ZIP
    async function downloadFiles() {
        const zip = new JSZip();

        // Add HTML file
        const html = document.documentElement.outerHTML;
        zip.file("index.html", html);

        // Add CSS file
        const cssPath = Array.from(document.styleSheets).find(s => s.href && s.href.endsWith("style.css"))?.href;
        if (cssPath) {
            try {
                const response = await fetch(cssPath);
                const cssText = await response.text();
                zip.file("style.css", cssText);
            } catch (err) {
                console.warn("CSS dosyası alınamadı:", err);
            }
        }

        // Add script file
        const scriptPath = Array.from(document.scripts).find(s => s.src && s.src.endsWith("script.js"))?.src;
        if (scriptPath) {
            try {
                const response = await fetch(scriptPath);
                const scriptText = await response.text();
                zip.file("script.js", scriptText);
            } catch (err) {
                console.warn("Script dosyası alınamadı:", err);
            }
        }

        // Add photos
        const images = [...document.querySelectorAll("img")];
        for (let img of images) {
            const src = img.src;
            if (src.startsWith("blob:")) continue;
            try {
                const res = await fetch(src);
                const blob = await res.blob();
                const name = img.src.split("/").pop();
                zip.file(`photos/${name}`, blob);
            } catch (err) {
                console.warn("Resim yüklenemedi:", src);
            }
        }

        // Download ZIP
        zip.generateAsync({ type: "blob" }).then(content => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = 'cv.zip';
            a.click();
        });
    }
});
