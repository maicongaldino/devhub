// Dados dos submenus para cada módulo (Agora com SUBTÓPICOS)
const submenus = {
  home: "",
  python: `
                <div class="topic-header">Lógica Básica</div>
                <a href="#py-condicionais" class="subtopic-link"><i class="fa-solid fa-code-branch"></i> Condicionais</a>
                <a href="#py-loops" class="subtopic-link"><i class="fa-solid fa-rotate"></i> Loops</a>
                <a href="#py-listas" class="subtopic-link"><i class="fa-solid fa-list-ol"></i> Listas</a>
                <a href="#py-dicts" class="subtopic-link"><i class="fa-solid fa-book"></i> Dicionários</a>

                <div class="topic-header">Pandas (Dados)</div>
                <a href="#pd-leitura" class="subtopic-link"><i class="fa-solid fa-file-csv"></i> Leitura & Info</a>
                <a href="#pd-filtros" class="subtopic-link"><i class="fa-solid fa-filter"></i> Filtros & Seleção</a>
                <a href="#pd-limpeza" class="subtopic-link"><i class="fa-solid fa-broom"></i> Limpeza (NaN)</a>
                
                <div class="topic-header">Visualização</div>
                <a href="#viz-matplotlib" class="subtopic-link"><i class="fa-solid fa-chart-line"></i> Matplotlib</a>
                <a href="#viz-seaborn" class="subtopic-link"><i class="fa-solid fa-chart-pie"></i> Seaborn</a>
                <a href="#viz-integracao" class="subtopic-link"><i class="fa-solid fa-puzzle-piece"></i> Integração</a>
            `,
  git: `
                <div class="topic-header">Comandos Essenciais</div>
                <a href="#git-init" class="subtopic-link"><i class="fa-solid fa-play"></i> git init</a>
                <a href="#git-add" class="subtopic-link"><i class="fa-solid fa-plus"></i> git add</a>
                <a href="#git-commit" class="subtopic-link"><i class="fa-solid fa-check"></i> git commit</a>
                <a href="#git-push" class="subtopic-link"><i class="fa-solid fa-cloud-arrow-up"></i> git push</a>
                <a href="#git-pull" class="subtopic-link"><i class="fa-solid fa-cloud-arrow-down"></i> git pull</a>
            `,
};

// Index para busca
let searchIndex = [];

function buildSearchIndex() {
  searchIndex = [];
  const sections = document.querySelectorAll("section[id]");

  sections.forEach((section) => {
    let title = section.getAttribute("data-title");
    if (!title) {
      const h3 = section.querySelector("h3");
      title = h3 ? h3.innerText : section.id;
    }

    const parentView = section.closest('div[id^="view-"]');
    const moduleId = parentView ? parentView.id.replace("view-", "") : "";

    searchIndex.push({
      id: section.id,
      moduleId: moduleId,
      title: title,
      text: section.innerText.toLowerCase(),
    });
  });
}

function handleSearch() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const resultsContainer = document.getElementById("search-results");

  if (query.length < 2) {
    resultsContainer.classList.add("hidden");
    return;
  }

  const results = searchIndex.filter(
    (item) =>
      item.title.toLowerCase().includes(query) || item.text.includes(query)
  );

  if (results.length > 0) {
    resultsContainer.innerHTML = results
      .map(
        (item) => `
                    <div class="search-item p-3 border-b border-gray-700 last:border-0 flex items-center" 
                         onclick="goToResult('${item.moduleId}', '${item.id}')">
                        <span class="w-2 h-2 rounded-full mr-3 ${item.moduleId === "python" ? "bg-yellow-500" : "bg-orange-500"
          }"></span>
                        <div>
                            <div class="text-sm font-bold text-gray-200">${item.title}</div>
                            <div class="text-xs text-gray-500 uppercase">${item.moduleId}</div>
                        </div>
                    </div>
                `
      )
      .join("");
    resultsContainer.classList.remove("hidden");
  } else {
    resultsContainer.innerHTML =
      '<div class="p-3 text-sm text-gray-500 text-center">Nenhum resultado encontrado</div>';
    resultsContainer.classList.remove("hidden");
  }
}

function goToResult(moduleId, sectionId) {
  document.getElementById("search-input").value = "";
  document.getElementById("search-results").classList.add("hidden");

  switchView(moduleId);

  setTimeout(() => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      element.classList.add("bg-gray-800");
      setTimeout(() => element.classList.remove("bg-gray-800"), 1000);
    }
  }, 100);
}

function switchView(viewName) {
  document.getElementById("view-home").classList.add("hidden-section");
  document.getElementById("view-python").classList.add("hidden-section");
  document.getElementById("view-git").classList.add("hidden-section");

  const selectedView = document.getElementById(`view-${viewName}`);
  if (selectedView) {
    selectedView.classList.remove("hidden-section");
  }

  document.querySelectorAll(".module-link").forEach((btn) => btn.classList.remove("active"));
  const activeBtn = document.getElementById(`btn-${viewName}`);
  if (activeBtn) activeBtn.classList.add("active");

  const submenuContainer = document.getElementById("submenu-container");
  submenuContainer.innerHTML = submenus[viewName] || "";

  document.querySelectorAll(".subtopic-link").forEach((link) => {
    link.addEventListener("click", function () {
      document.querySelectorAll(".subtopic-link").forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  if (!window.isSearching) window.scrollTo(0, 0);
}

window.addEventListener("load", () => {
  switchView("home");
  setTimeout(buildSearchIndex, 500);
});

document.addEventListener("click", (e) => {
  if (!e.target.closest("#search-input") && !e.target.closest("#search-results")) {
    document.getElementById("search-results").classList.add("hidden");
  }
});
