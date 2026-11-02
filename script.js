// Notepad Interface Controller for Java Lab

let currentExpId = 1;
let currentFileIndex = 0;
let openTabs = [1, 2, 3, 4, 5]; // Default open tabs
let sidebarVisible = true;
let detailsPanelVisible = false;

// Syntax highlighter for Notepad view
function highlightJava(rawCode) {
  let code = rawCode
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Comments
  code = code.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="np-hl-comment">$1</span>');
  code = code.replace(/(\/\/[^\n]*)/g, '<span class="np-hl-comment">$1</span>');

  // Strings
  code = code.replace(/(".*?")/g, '<span class="np-hl-string">$1</span>');

  // Annotations
  code = code.replace(/(@[A-Za-z0-9_]+)/g, '<span class="np-hl-annotation">$1</span>');

  // Keywords
  const keywords = [
    'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class',
    'const', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extends', 'final',
    'finally', 'float', 'for', 'goto', 'if', 'implements', 'import', 'instanceof', 'int',
    'interface', 'long', 'native', 'new', 'package', 'private', 'protected', 'public',
    'return', 'short', 'static', 'strictfp', 'super', 'switch', 'synchronized', 'this',
    'throw', 'throws', 'transient', 'try', 'void', 'volatile', 'while', 'record'
  ];
  const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  code = code.replace(keywordRegex, '<span class="np-hl-keyword">$1</span>');

  // Types
  const types = ['String', 'Scanner', 'System', 'Math', 'Thread', 'Object', 'Exception',
                 'ArithmeticException', 'ArrayIndexOutOfBoundsException', 'Random', 'File',
                 'Map', 'HashMap', 'LinkedHashMap', 'BufferedReader', 'FileReader', 'Connection',
                 'DriverManager', 'Statement', 'ResultSet', 'SQLException', 'HttpServlet',
                 'HttpServletRequest', 'HttpServletResponse', 'PrintWriter'];
  const typeRegex = new RegExp(`\\b(${types.join('|')})\\b`, 'g');
  code = code.replace(typeRegex, '<span class="np-hl-type">$1</span>');

  // Numbers
  code = code.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="np-hl-number">$1</span>');

  return code;
}

// Copy helper
function copyToClipboard(text, message = "Copied to clipboard!") {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message);
    }).catch(() => {
      fallbackCopy(text, message);
    });
  } else {
    fallbackCopy(text, message);
  }
}

function fallbackCopy(text, message) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(message);
  } catch (err) {
    showToast("Failed to copy automatically");
  }
  document.body.removeChild(textArea);
}

// Toast
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('np-toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

// Download helper
function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Saved ${filename}`);
}

// Active Experiment getters
function getActiveExp() {
  return EXPERIMENTS.find(e => e.id === currentExpId) || EXPERIMENTS[0];
}

function getActiveFile() {
  const exp = getActiveExp();
  return exp.files[currentFileIndex] || exp.files[0];
}

// Render Tabs Bar (Windows 11 Notepad style)
function renderTabs() {
  const tabsBar = document.getElementById('tabs-bar');
  if (!tabsBar) return;

  // Make sure current experiment is in openTabs
  if (!openTabs.includes(currentExpId)) {
    openTabs.push(currentExpId);
  }

  let html = '';
  openTabs.forEach(id => {
    const exp = EXPERIMENTS.find(e => e.id === id);
    if (!exp) return;
    const file = exp.files[0];
    const isActive = id === currentExpId;

    html += `
      <div class="np-tab ${isActive ? 'active' : ''}" onclick="selectExperiment(${id})">
        <span class="tab-exp-id">E${id.toString().padStart(2, '0')}</span>
        <span>${file.filename}</span>
        <span class="tab-close-btn" onclick="event.stopPropagation(); closeTab(${id})">✕</span>
      </div>
    `;
  });

  html += `
    <button class="new-tab-btn" onclick="openNextTab()" title="Open Next Experiment Tab">+</button>
  `;

  tabsBar.innerHTML = html;
}

function closeTab(id) {
  if (openTabs.length <= 1) {
    showToast("At least one tab must remain open");
    return;
  }
  openTabs = openTabs.filter(t => t !== id);
  if (currentExpId === id) {
    currentExpId = openTabs[0];
    currentFileIndex = 0;
  }
  renderTabs();
  renderActiveView();
}

function openNextTab() {
  // Find first experiment not currently in openTabs
  const nextExp = EXPERIMENTS.find(e => !openTabs.includes(e.id));
  if (nextExp) {
    openTabs.push(nextExp.id);
    selectExperiment(nextExp.id);
  } else {
    showToast("All 20 experiment tabs are already open!");
  }
}

// Render Sidebar File Tree
function renderSidebarTree(query = '') {
  const tree = document.getElementById('exp-tree');
  if (!tree) return;

  const filtered = EXPERIMENTS.filter(exp => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return exp.title.toLowerCase().includes(q) ||
           exp.files.some(f => f.filename.toLowerCase().includes(q) || f.code.toLowerCase().includes(q)) ||
           `exp ${exp.id}`.includes(q) ||
           exp.id.toString() === q;
  });

  if (filtered.length === 0) {
    tree.innerHTML = `<li style="padding: 12px; color: var(--np-text-muted); font-size: 11px;">No matching files</li>`;
    return;
  }

  tree.innerHTML = filtered.map(exp => {
    const file = exp.files[0];
    const isActive = exp.id === currentExpId;
    return `
      <li class="tree-item ${isActive ? 'active' : ''}" onclick="selectExperiment(${exp.id})">
        <span class="tree-icon">📄</span>
        <span class="tree-text">${exp.id.toString().padStart(2, '0')}_${file.filename}</span>
      </li>
    `;
  }).join('');
}

// Render Experiments Menu Dropdown
function renderExpMenu() {
  const menu = document.getElementById('menu-exp');
  if (!menu) return;

  menu.innerHTML = EXPERIMENTS.map(exp => `
    <div class="dropdown-item" onclick="selectExperiment(${exp.id})">
      <span>${exp.id.toString().padStart(2, '0')}. ${exp.title}</span>
      <span class="shortcut">${exp.category}</span>
    </div>
  `).join('');
}

// Select an experiment
function selectExperiment(id) {
  currentExpId = id;
  currentFileIndex = 0;
  closeAllMenus();

  if (!openTabs.includes(id)) {
    openTabs.push(id);
  }

  renderTabs();
  renderSidebarTree(document.getElementById('sidebar-search-input')?.value || '');
  renderActiveView();
}

// Render Active Code and Gutter
function renderActiveView() {
  const exp = getActiveExp();
  const file = getActiveFile();

  // Window title
  const titleEl = document.getElementById('window-title');
  if (titleEl) {
    titleEl.textContent = `${file.filename} - Notepad`;
  }
  document.title = `${file.filename} - Notepad`;

  // Multi-file switcher (e.g. Exp 10 & Exp 16)
  const switcher = document.getElementById('inner-file-switcher');
  if (exp.files.length > 1) {
    switcher.style.display = 'flex';
    switcher.innerHTML = exp.files.map((f, idx) => `
      <button class="inner-file-btn ${idx === currentFileIndex ? 'active' : ''}" onclick="switchInnerFile(${idx})">
        📄 ${f.filename}
      </button>
    `).join('');
  } else {
    switcher.style.display = 'none';
  }

  // Code editor content
  const editor = document.getElementById('editor-content');
  if (editor) {
    editor.innerHTML = highlightJava(file.code);
  }

  // Update Line Numbers Gutter
  const lines = file.code.split('\n').length;
  const gutter = document.getElementById('editor-gutter');
  if (gutter) {
    let gutterHtml = '';
    for (let i = 1; i <= lines; i++) {
      gutterHtml += i + '<br>';
    }
    gutter.innerHTML = gutterHtml;
  }

  // Update Status bar line count
  const statusLine = document.getElementById('status-line-col');
  if (statusLine) {
    statusLine.textContent = `Ln ${lines}, Col 1`;
  }

  // Update Details Panel
  renderDetailsPanel(exp);
}

function switchInnerFile(idx) {
  currentFileIndex = idx;
  renderActiveView();
}

// Render Lab Details Panel (Aim, Commands, Inputs, Outputs, Viva)
function renderDetailsPanel(exp) {
  document.getElementById('panel-title').textContent = `Exp ${exp.id}: ${exp.title}`;
  document.getElementById('panel-aim').textContent = exp.aim;
  document.getElementById('panel-compile-cmd').textContent = exp.compileCmd;
  document.getElementById('panel-run-cmd').textContent = exp.runCmd;
  document.getElementById('panel-input').textContent = exp.sampleInput;
  document.getElementById('panel-output').textContent = exp.sampleOutput;
  document.getElementById('panel-note').textContent = exp.note;
  document.getElementById('panel-result').textContent = exp.result;

  const vivaList = document.getElementById('panel-viva-list');
  if (exp.viva && exp.viva.length > 0) {
    vivaList.innerHTML = exp.viva.map(q => {
      const parts = q.split('?');
      if (parts.length > 1) {
        return `<li><strong>${parts[0]}?</strong> ${parts.slice(1).join('?')}</li>`;
      }
      return `<li>${q}</li>`;
    }).join('');
  } else {
    vivaList.innerHTML = `<li>Review the core concept of ${exp.title}.</li>`;
  }
}

// Quick Copy Actions
function copyActiveCode() {
  const file = getActiveFile();
  copyToClipboard(file.code, `Copied ${file.filename} code!`);
  closeAllMenus();
}

function downloadActiveFile() {
  const file = getActiveFile();
  downloadFile(file.filename.split('/').pop(), file.code);
  closeAllMenus();
}

function copyCompileCmd() {
  const exp = getActiveExp();
  copyToClipboard(exp.compileCmd, "Copied javac command!");
  closeAllMenus();
}

function copyRunCmd() {
  const exp = getActiveExp();
  copyToClipboard(exp.runCmd, "Copied java command!");
  closeAllMenus();
}

function copySampleInput() {
  const exp = getActiveExp();
  copyToClipboard(exp.sampleInput, "Copied sample input!");
  closeAllMenus();
}

function copySampleOutput() {
  const exp = getActiveExp();
  copyToClipboard(exp.sampleOutput, "Copied expected output!");
  closeAllMenus();
}

// Menu interactions
function toggleMenu(event, menuId) {
  event.stopPropagation();
  const menu = document.getElementById(menuId);
  const parent = menu.parentElement;
  const isAlreadyActive = parent.classList.contains('active');

  closeAllMenus();

  if (!isAlreadyActive) {
    parent.classList.add('active');
  }
}

function closeAllMenus() {
  document.querySelectorAll('.menu-item').forEach(item => {
    item.classList.remove('active');
  });
}

// Panel and Sidebar Toggles
function toggleSidebar() {
  const sidebar = document.getElementById('np-sidebar');
  sidebarVisible = !sidebarVisible;
  sidebar.classList.toggle('collapsed', !sidebarVisible);
  const menuText = document.getElementById('sidebar-menu-text');
  if (menuText) {
    menuText.textContent = sidebarVisible ? 'Hide Explorer' : 'Show Explorer';
  }
  closeAllMenus();
}

function toggleDetailsPanel() {
  const panel = document.getElementById('np-details-panel');
  detailsPanelVisible = !detailsPanelVisible;
  panel.classList.toggle('hidden', !detailsPanelVisible);
  closeAllMenus();
}

function openVivaDirectly() {
  const panel = document.getElementById('np-details-panel');
  detailsPanelVisible = true;
  panel.classList.remove('hidden');
  closeAllMenus();
  showToast("Showing Viva & Lab Notes");
}

function focusSearch() {
  const input = document.getElementById('sidebar-search-input');
  if (!sidebarVisible) toggleSidebar();
  input.focus();
  closeAllMenus();
}

// Panic Mode (Disguise)
function togglePanicMode() {
  document.body.classList.toggle('panic-mode');
  if (document.body.classList.contains('panic-mode')) {
    document.title = "Overview (Java Platform SE 17 & JDK 17)";
  } else {
    const file = getActiveFile();
    document.title = `${file.filename} - Notepad`;
  }
  closeAllMenus();
}

// Theme Toggle (Dark Notepad <-> Light Notepad)
function toggleTheme() {
  const current = document.body.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', next);
  localStorage.setItem('np-theme', next);
  const themeText = document.getElementById('theme-menu-text');
  if (themeText) {
    themeText.textContent = next === 'dark' ? 'Switch to Light Notepad' : 'Switch to Dark Notepad';
  }
  showToast(next === 'dark' ? 'Dark Notepad Mode' : 'Light Notepad Mode');
  closeAllMenus();
}

// Global Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Restore theme
  const saved = localStorage.getItem('np-theme') || 'dark';
  document.body.setAttribute('data-theme', saved);
  const themeText = document.getElementById('theme-menu-text');
  if (themeText) {
    themeText.textContent = saved === 'dark' ? 'Switch to Light Notepad' : 'Switch to Dark Notepad';
  }

  // Initialize Right panel as hidden by default for maximum Notepad stealth
  document.getElementById('np-details-panel').classList.add('hidden');

  renderExpMenu();
  renderTabs();
  renderSidebarTree();
  renderActiveView();

  // Search input
  const searchInput = document.getElementById('sidebar-search-input');
  searchInput.addEventListener('input', (e) => {
    renderSidebarTree(e.target.value);
  });

  // Clicking outside closes menus
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu-item')) {
      closeAllMenus();
    }
  });

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // ESC -> Panic mode
    if (e.key === 'Escape') {
      togglePanicMode();
      return;
    }

    // Ctrl+S -> Download .java
    if (e.ctrlKey && e.key.toLowerCase() === 's') {
      e.preventDefault();
      downloadActiveFile();
      return;
    }

    // Ctrl+B -> Toggle Sidebar
    if (e.ctrlKey && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      toggleSidebar();
      return;
    }

    // Ctrl+F -> Focus search
    if (e.ctrlKey && e.key.toLowerCase() === 'f') {
      e.preventDefault();
      focusSearch();
      return;
    }

    // Alt+M -> Toggle Notes / Viva
    if (e.altKey && e.key.toLowerCase() === 'm') {
      e.preventDefault();
      toggleDetailsPanel();
      return;
    }

    // Alt+T -> Toggle Theme
    if (e.altKey && e.key.toLowerCase() === 't') {
      e.preventDefault();
      toggleTheme();
      return;
    }

    // Alt+C -> Copy javac
    if (e.altKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      copyCompileCmd();
      return;
    }

    // Alt+R -> Copy java
    if (e.altKey && e.key.toLowerCase() === 'r') {
      e.preventDefault();
      copyRunCmd();
      return;
    }

    // C / D when not inside input
    if (!['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      if (e.key.toLowerCase() === 'c' && !e.ctrlKey) {
        copyActiveCode();
      } else if (e.key.toLowerCase() === 'd' && !e.ctrlKey) {
        downloadActiveFile();
      }
    }
  });
});
