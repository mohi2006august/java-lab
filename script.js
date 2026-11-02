// Java Lab Vault - Controller & Logic

let currentExpId = 1;
let currentFileIndex = 0;
let currentFilter = 'All';
let searchQuery = '';

// Highlighting Java syntax offline
function highlightJava(rawCode) {
  // First escape HTML entities
  let code = rawCode
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Multi-line comments
  code = code.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="hl-comment">$1</span>');

  // Single-line comments
  code = code.replace(/(\/\/[^\n]*)/g, '<span class="hl-comment">$1</span>');

  // String literals
  code = code.replace(/(".*?")/g, '<span class="hl-string">$1</span>');

  // Annotations like @Override, @WebServlet
  code = code.replace(/(@[A-Za-z0-9_]+)/g, '<span class="hl-annotation">$1</span>');

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
  code = code.replace(keywordRegex, '<span class="hl-keyword">$1</span>');

  // Common built-in Java types
  const types = ['String', 'Scanner', 'System', 'Math', 'Thread', 'Object', 'Exception',
                 'ArithmeticException', 'ArrayIndexOutOfBoundsException', 'Random', 'File',
                 'Map', 'HashMap', 'LinkedHashMap', 'BufferedReader', 'FileReader', 'Connection',
                 'DriverManager', 'Statement', 'ResultSet', 'SQLException', 'HttpServlet',
                 'HttpServletRequest', 'HttpServletResponse', 'PrintWriter'];
  const typeRegex = new RegExp(`\\b(${types.join('|')})\\b`, 'g');
  code = code.replace(typeRegex, '<span class="hl-type">$1</span>');

  // Numbers
  code = code.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="hl-number">$1</span>');

  return code;
}

// Copy helper with feedback
function copyToClipboard(text, message = "Code copied to clipboard!") {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message);
    }).catch(err => {
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
    console.error('Copy failed', err);
    showToast("Failed to copy automatically");
  }
  document.body.removeChild(textArea);
}

// Toast notification
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.innerHTML = `<span>✓</span> <span>${msg}</span>`;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

// Download file helper
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
  showToast(`Downloading ${filename}`);
}

// Render Sidebar List
function renderSidebar() {
  const listEl = document.getElementById('exp-list');
  listEl.innerHTML = '';

  const filtered = EXPERIMENTS.filter(exp => {
    // Category filter
    let matchCat = true;
    if (currentFilter !== 'All') {
      if (currentFilter === 'Basics' && (exp.id < 1 || exp.id > 3)) matchCat = false;
      else if (currentFilter === 'OOP' && (exp.id < 4 || exp.id > 8)) matchCat = false;
      else if (currentFilter === 'Exceptions' && (exp.id < 11 || exp.id > 12)) matchCat = false;
      else if (currentFilter === 'Threads' && (exp.id < 13 || exp.id > 14)) matchCat = false;
      else if (currentFilter === 'Files/Collections' && (exp.id < 15 || exp.id > 18)) matchCat = false;
      else if (currentFilter === 'Advanced' && (exp.id < 19 || exp.id > 20)) matchCat = false;
    }

    // Search query filter
    let matchSearch = true;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const inTitle = exp.title.toLowerCase().includes(q);
      const inAim = exp.aim.toLowerCase().includes(q);
      const inCode = exp.files.some(f => f.code.toLowerCase().includes(q));
      const inNum = exp.id.toString() === q || `exp ${exp.id}`.includes(q) || `week ${exp.id}`.includes(q);
      matchSearch = inTitle || inAim || inCode || inNum;
    }

    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    listEl.innerHTML = `<li style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No matching experiments found</li>`;
    return;
  }

  filtered.forEach(exp => {
    const li = document.createElement('li');
    li.className = `exp-item ${exp.id === currentExpId ? 'active' : ''}`;
    li.onclick = () => selectExperiment(exp.id);

    li.innerHTML = `
      <div class="exp-item-info">
        <span class="exp-num">E${exp.id.toString().padStart(2, '0')}</span>
        <div class="exp-title-block">
          <div class="exp-title-text">${exp.title}</div>
          <div class="exp-category-text">${exp.category}</div>
        </div>
      </div>
      <button class="exp-quick-copy" title="Quick Copy Code" onclick="event.stopPropagation(); copyExpCode(${exp.id});">
        📋 Copy
      </button>
    `;

    listEl.appendChild(li);
  });
}

function copyExpCode(id) {
  const exp = EXPERIMENTS.find(e => e.id === id);
  if (exp && exp.files.length > 0) {
    copyToClipboard(exp.files[0].code, `Copied Exp ${exp.id} code!`);
  }
}

// Select an experiment
function selectExperiment(id) {
  currentExpId = id;
  currentFileIndex = 0;
  renderSidebar();
  renderDetail();

  // Scroll main content to top
  const contentArea = document.getElementById('content-area');
  if (contentArea) contentArea.scrollTop = 0;

  // On mobile, close sidebar after selection
  const sidebar = document.getElementById('sidebar');
  if (window.innerWidth <= 868) {
    sidebar.classList.remove('open');
  }
}

// Render active experiment detail
function renderDetail() {
  const exp = EXPERIMENTS.find(e => e.id === currentExpId);
  if (!exp) return;

  const currentFile = exp.files[currentFileIndex] || exp.files[0];

  // Title & Badges
  document.getElementById('detail-id').textContent = `EXP ${exp.id.toString().padStart(2, '0')}`;
  document.getElementById('detail-cat').textContent = exp.category;
  document.getElementById('detail-file').textContent = currentFile.filename;
  document.getElementById('detail-title').textContent = exp.title;

  // Aim
  document.getElementById('detail-aim').textContent = exp.aim;

  // File Tabs (if multi-file)
  const tabsContainer = document.getElementById('file-tabs-container');
  if (exp.files.length > 1) {
    tabsContainer.style.display = 'flex';
    tabsContainer.innerHTML = exp.files.map((file, idx) => `
      <div class="file-tab ${idx === currentFileIndex ? 'active' : ''}" onclick="switchFileTab(${idx})">
        📄 ${file.filename}
      </div>
    `).join('');
  } else {
    tabsContainer.style.display = 'none';
  }

  // Active Code block
  document.getElementById('active-code-filename').textContent = currentFile.filename;
  document.getElementById('code-display').innerHTML = highlightJava(currentFile.code);

  // Terminal commands
  document.getElementById('terminal-compile-cmd').textContent = exp.compileCmd;
  document.getElementById('terminal-run-cmd').textContent = exp.runCmd;

  // Sample Input & Output
  document.getElementById('sample-input-content').textContent = exp.sampleInput;
  document.getElementById('sample-output-content').textContent = exp.sampleOutput;

  // Note & Result
  document.getElementById('detail-note').textContent = exp.note;
  document.getElementById('detail-result').textContent = exp.result;

  // Viva Cheat Sheet
  const vivaList = document.getElementById('viva-questions-list');
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

function switchFileTab(idx) {
  currentFileIndex = idx;
  renderDetail();
}

// Action Bar Buttons
function copyActiveCode() {
  const exp = EXPERIMENTS.find(e => e.id === currentExpId);
  if (!exp) return;
  const currentFile = exp.files[currentFileIndex] || exp.files[0];
  copyToClipboard(currentFile.code, `Copied ${currentFile.filename}!`);
}

function downloadActiveFile() {
  const exp = EXPERIMENTS.find(e => e.id === currentExpId);
  if (!exp) return;
  const currentFile = exp.files[currentFileIndex] || exp.files[0];
  downloadFile(currentFile.filename.split('/').pop(), currentFile.code);
}

function copyCompileCmd() {
  const exp = EXPERIMENTS.find(e => e.id === currentExpId);
  if (exp) copyToClipboard(exp.compileCmd, "Copied compile command!");
}

function copyRunCmd() {
  const exp = EXPERIMENTS.find(e => e.id === currentExpId);
  if (exp) copyToClipboard(exp.runCmd, "Copied run command!");
}

function copySampleInput() {
  const exp = EXPERIMENTS.find(e => e.id === currentExpId);
  if (exp) copyToClipboard(exp.sampleInput, "Copied sample input!");
}

function copySampleOutput() {
  const exp = EXPERIMENTS.find(e => e.id === currentExpId);
  if (exp) copyToClipboard(exp.sampleOutput, "Copied sample output!");
}

// Panic / Disguise Mode Toggle
function togglePanicMode() {
  document.body.classList.toggle('panic-mode');
  if (document.body.classList.contains('panic-mode')) {
    document.title = "Overview (Java Platform SE 17 & JDK 17)";
  } else {
    document.title = "Java Lab Vault - Quick Code Hub";
  }
}

// Theme Toggle
function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  const themeBtn = document.getElementById('theme-toggle-btn');
  themeBtn.textContent = newTheme === 'dark' ? '🌙' : '☀️';
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  // Restore saved theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);
  document.getElementById('theme-toggle-btn').textContent = savedTheme === 'dark' ? '🌙' : '☀️';

  // Render initial views
  renderSidebar();
  renderDetail();

  // Search input handler
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderSidebar();
  });

  // Filter pills handler
  document.querySelectorAll('.filter-pills .pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pills .pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-filter');
      renderSidebar();
    });
  });

  // Mobile sidebar toggle
  document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // Keyboard navigation & shortcuts
  window.addEventListener('keydown', (e) => {
    // ESC key toggles Panic / Oracle Disguise mode anytime
    if (e.key === 'Escape') {
      togglePanicMode();
      return;
    }

    // If focused on an input, don't trigger hotkeys
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      return;
    }

    if (e.key === '/' || (e.ctrlKey && e.key.toLowerCase() === 'k')) {
      e.preventDefault();
      searchInput.focus();
    } else if (e.key.toLowerCase() === 'c') {
      copyActiveCode();
    } else if (e.key.toLowerCase() === 'd') {
      downloadActiveFile();
    } else if (e.key.toLowerCase() === 'j' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentExpId < EXPERIMENTS.length) {
        selectExperiment(currentExpId + 1);
      }
    } else if (e.key.toLowerCase() === 'k' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentExpId > 1) {
        selectExperiment(currentExpId - 1);
      }
    } else if (e.key.toLowerCase() === 't') {
      toggleTheme();
    }
  });
});
