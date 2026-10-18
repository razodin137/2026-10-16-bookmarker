/**
 * Bookmarker - Visual Tab & Bookmark Vault
 * Prototype Showcase Script
 */

// Initial seed bookmarks showcasing visual previews of "what is actually inside"
const SEED_BOOKMARKS = [
  {
    id: "bm-1",
    url: "https://sqlite.org/wal.html",
    title: "Architecture of SQLite: How WAL Mode and Virtual Pagers Work",
    domain: "sqlite.org",
    category: "Engineering & Systems",
    tags: ["database", "systems", "architecture", "c"],
    date: "2026-10-16",
    readingTime: "12 min read",
    isInbox: true,
    isStarred: true,
    summary: "Deep dive into write-ahead logging (WAL), concurrency models, and how SQLite supports thousands of concurrent readers with zero locking contention.",
    insideSnippet: "PRAGMA journal_mode=WAL; scales concurrent reads up to 120,000 req/s with zero reader-writer lock contention.",
    visualType: "sqlite-wal"
  },
  {
    id: "bm-2",
    url: "https://linear.app/method/keyboard-first",
    title: "Linear Design System: Crafting Keyboard-First Interfaces & 60fps Micro-Interactions",
    domain: "linear.app",
    category: "Design & UI",
    tags: ["ui", "design-systems", "ux", "shortcuts"],
    date: "2026-10-15",
    readingTime: "7 min read",
    isInbox: true,
    isStarred: true,
    summary: "How Linear structures fast modal dialogs, global shortcut dispatchers, and CSS GPU-accelerated spring animations that feel native.",
    insideSnippet: "60fps animation budget: only animating transform and opacity, with centralized command-k fuzzy matcher.",
    visualType: "linear-ui"
  },
  {
    id: "bm-3",
    url: "https://arxiv.org/abs/1706.03762",
    title: "Attention Is All You Need — Interactive Multi-Head Self-Attention Walkthrough",
    domain: "arxiv.org",
    category: "AI & Research",
    tags: ["ai", "transformers", "deep-learning", "paper"],
    date: "2026-10-14",
    readingTime: "18 min read",
    isInbox: false,
    isStarred: false,
    summary: "Interactive breakdown of Query, Key, and Value vector transformations, scaled dot-product matrices, and positional embeddings.",
    insideSnippet: "Softmax(QKᵀ / √d_k)V with 8 parallel attention heads projecting into 512-dim subspace.",
    visualType: "attention-matrix"
  },
  {
    id: "bm-4",
    url: "https://github.com/astral-sh/uv",
    title: "uv: An Extremely Fast Python Package and Project Manager in Rust",
    domain: "github.com",
    category: "Tools & Repos",
    tags: ["rust", "python", "devtools", "cli"],
    date: "2026-10-13",
    readingTime: "5 min read",
    isInbox: false,
    isStarred: true,
    summary: "Benchmarks and architectural breakdown showing how uv achieves 10-100x faster package resolution than pip using global hardlink caches.",
    insideSnippet: "10-100x faster pip installs via content-addressed hardlink storage and parallel wheel extraction.",
    visualType: "benchmark-chart"
  },
  {
    id: "bm-5",
    url: "https://danluu.com/cpu-caches/",
    title: "Why CPU Caches and Data Locality Matter More Than Big-O Complexity",
    domain: "danluu.com",
    category: "Engineering & Systems",
    tags: ["performance", "hardware", "cpu", "systems"],
    date: "2026-10-12",
    readingTime: "14 min read",
    isInbox: true,
    isStarred: false,
    summary: "Empirical benchmarks showing why iterating a contiguous flat array beats a balanced tree by 8x due to L1/L2 cache misses.",
    insideSnippet: "L1 Cache hit: 1ns vs Main RAM access: ~80ns (80x latency gap makes contiguous layout win).",
    visualType: "cpu-cache-diagram"
  },
  {
    id: "bm-6",
    url: "https://paulgraham.com/greatwork.html",
    title: "How to Do Great Work — Paul Graham",
    domain: "paulgraham.com",
    category: "Essays & Reading",
    tags: ["essays", "productivity", "career", "creativity"],
    date: "2026-10-10",
    readingTime: "25 min read",
    isInbox: false,
    isStarred: true,
    summary: "A comprehensive essay on finding problems at the frontier of knowledge, developing taste, and cultivating genuine intellectual curiosity.",
    insideSnippet: "The way to do great work is to choose problems where curiosity and personal obsession outlast brute force willpower.",
    visualType: "essay-quote"
  },
  {
    id: "bm-7",
    url: "https://prowebtype.com/fluid-scales/",
    title: "Fluid Typography Scales and Variable Font Axes for Dense Web Apps",
    domain: "prowebtype.com",
    category: "Design & UI",
    tags: ["typography", "css", "web-design", "frontend"],
    date: "2026-10-09",
    readingTime: "9 min read",
    isInbox: true,
    isStarred: false,
    summary: "Formulas and CSS clamp() techniques to dynamically adjust font weight, letter spacing, and optical size based on viewport width.",
    insideSnippet: "clamp(1rem, 0.9rem + 0.45vw, 1.35rem) with font-variation-settings: 'opsz' 32, 'wght' 580.",
    visualType: "typography-specimen"
  },
  {
    id: "bm-8",
    url: "https://omar.website/tabfs/",
    title: "TabFS: Mount Your Browser Tabs as a Filesystem on Your Operating System",
    domain: "omar.website",
    category: "Tools & Repos",
    tags: ["browser", "filesystem", "unix", "tools"],
    date: "2026-10-08",
    readingTime: "8 min read",
    isInbox: true,
    isStarred: false,
    summary: "FUSE filesystem extension that exposes each browser tab as a folder with title.txt, url.txt, and text.txt accessible via standard Unix pipes.",
    insideSnippet: "$ cat /mnt/tabs/42/text.txt | grep -i 'pricing' -> Treat open tabs like standard unix files.",
    visualType: "terminal-tree"
  },
  {
    id: "bm-9",
    url: "https://psyche.co/ideas/the-psychology-of-open-tabs",
    title: "The Psychology of Open Tabs: Why Hoarding Information Stresses Working Memory",
    domain: "psyche.co",
    category: "Essays & Reading",
    tags: ["psychology", "cognition", "focus", "habits"],
    date: "2026-10-05",
    readingTime: "11 min read",
    isInbox: false,
    isStarred: false,
    summary: "Why leaving dozens of tabs open triggers the Zeigarnik effect (unfinished task anxiety) and how structured bookmark vaulting restores focus.",
    insideSnippet: "Each open browser tab acts as an open cognitive loop, quietly competing for attentional bandwidth.",
    visualType: "cognitive-loop"
  }
];

// State Management
const STORAGE_KEY = "bookmarker_vault_v1";
const THEME_KEY = "bookmarker_theme";
const VIEW_KEY = "bookmarker_view_mode";

class BookmarkerApp {
  constructor() {
    this.bookmarks = this.loadBookmarks();
    this.activeCollection = "all"; // 'all', 'inbox', 'favorites'
    this.activeCategory = null;
    this.activeTag = null;
    this.searchQuery = "";
    this.sortMode = "newest"; // 'newest', 'oldest', 'domain', 'title'
    this.viewMode = localStorage.getItem(VIEW_KEY) || "grid";

    this.initElements();
    this.initTheme();
    this.initEventListeners();
    this.render();
  }

  loadBookmarks() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Could not read from localStorage, using seed bookmarks", e);
    }
    return [...SEED_BOOKMARKS];
  }

  saveBookmarks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.bookmarks));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  }

  initElements() {
    // Topbar & Search
    this.searchInput = document.getElementById("searchInput");
    this.searchKbd = document.getElementById("searchKbd");
    this.sortSelect = document.getElementById("sortSelect");
    this.gridViewBtn = document.getElementById("gridViewBtn");
    this.listViewBtn = document.getElementById("listViewBtn");
    this.themeToggleBtn = document.getElementById("themeToggleBtn");

    // Sidebar
    this.sidebar = document.getElementById("sidebar");
    this.sidebarBackdrop = document.getElementById("sidebarBackdrop");
    this.openSidebarBtn = document.getElementById("openSidebarBtn");
    this.closeSidebarBtn = document.getElementById("closeSidebarBtn");
    this.libraryNavList = document.getElementById("libraryNavList");
    this.categoryNavList = document.getElementById("categoryNavList");
    this.sidebarTagList = document.getElementById("sidebarTagList");
    this.clearTagBtn = document.getElementById("clearTagBtn");
    this.sessionStatusText = document.getElementById("sessionStatusText");
    this.resetFiltersBrand = document.getElementById("resetFiltersBrand");

    // Feed Header & Stats
    this.activeCollectionEyebrow = document.getElementById("activeCollectionEyebrow");
    this.activeViewTitle = document.getElementById("activeViewTitle");
    this.activeViewSubtitle = document.getElementById("activeViewSubtitle");
    this.visibleCountStat = document.getElementById("visibleCountStat");
    this.unreadCountStat = document.getElementById("unreadCountStat");
    this.activeFiltersBar = document.getElementById("activeFiltersBar");
    this.activeFilterChips = document.getElementById("activeFilterChips");
    this.resetAllFiltersBtn = document.getElementById("resetAllFiltersBtn");

    // Content container & Empty state
    this.bookmarksContainer = document.getElementById("bookmarksContainer");
    this.emptyState = document.getElementById("emptyState");
    this.emptyResetBtn = document.getElementById("emptyResetBtn");

    // Modal
    this.openDumpModalBtn = document.getElementById("openDumpModalBtn");
    this.dumpModal = document.getElementById("dumpModal");
    this.closeDumpModalBtn = document.getElementById("closeDumpModalBtn");
    this.cancelDumpModalBtn = document.getElementById("cancelDumpModalBtn");
    this.addBookmarkForm = document.getElementById("addBookmarkForm");

    // Toast
    this.toast = document.getElementById("toast");
  }

  initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(THEME_KEY, next);
  }

  initEventListeners() {
    // Theme toggle
    this.themeToggleBtn.addEventListener("click", () => this.toggleTheme());

    // Search input
    this.searchInput.addEventListener("input", (e) => {
      this.searchQuery = e.target.value.trim().toLowerCase();
      this.renderFeed();
    });

    // Keyboard shortcut '/' to search
    window.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== this.searchInput && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        e.preventDefault();
        this.searchInput.focus();
        this.searchInput.select();
      }
      if (e.key === "Escape") {
        if (!this.dumpModal.classList.contains("hidden")) {
          this.closeModal();
        } else if (document.activeElement === this.searchInput) {
          this.searchInput.blur();
        }
      }
    });

    // Sort select
    this.sortSelect.addEventListener("change", (e) => {
      this.sortMode = e.target.value;
      this.renderFeed();
    });

    // View toggles
    this.gridViewBtn.addEventListener("click", () => this.setViewMode("grid"));
    this.listViewBtn.addEventListener("click", () => this.setViewMode("list"));

    // Sidebar Mobile Toggle
    this.openSidebarBtn.addEventListener("click", () => {
      this.sidebar.classList.add("open");
      this.sidebarBackdrop.classList.add("active");
    });
    this.closeSidebarBtn.addEventListener("click", () => {
      this.sidebar.classList.remove("open");
      this.sidebarBackdrop.classList.remove("active");
    });
    this.sidebarBackdrop.addEventListener("click", () => {
      this.sidebar.classList.remove("open");
      this.sidebarBackdrop.classList.remove("active");
    });

    // Brand reset click
    this.resetFiltersBrand.addEventListener("click", (e) => {
      e.preventDefault();
      this.resetAllFilters();
    });

    // Nav list collection selection
    this.libraryNavList.addEventListener("click", (e) => {
      const btn = e.target.closest(".nav-item");
      if (!btn) return;
      const collection = btn.dataset.collection;
      if (collection) {
        this.setCollection(collection);
      }
    });

    // Category Nav Click
    this.categoryNavList.addEventListener("click", (e) => {
      const btn = e.target.closest(".nav-item");
      if (!btn) return;
      const category = btn.dataset.category;
      this.setCategory(this.activeCategory === category ? null : category);
    });

    // Tag Nav Click
    this.sidebarTagList.addEventListener("click", (e) => {
      const chip = e.target.closest(".tag-chip");
      if (!chip) return;
      const tag = chip.dataset.tag;
      this.setTag(this.activeTag === tag ? null : tag);
    });

    this.clearTagBtn.addEventListener("click", () => this.setTag(null));

    // Reset filters buttons
    this.resetAllFiltersBtn.addEventListener("click", () => this.resetAllFilters());
    this.emptyResetBtn.addEventListener("click", () => this.resetAllFilters());

    // Modal triggers
    this.openDumpModalBtn.addEventListener("click", () => this.openModal());
    this.closeDumpModalBtn.addEventListener("click", () => this.closeModal());
    this.cancelDumpModalBtn.addEventListener("click", () => this.closeModal());
    this.dumpModal.addEventListener("click", (e) => {
      if (e.target === this.dumpModal) this.closeModal();
    });

    // Form submission
    this.addBookmarkForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleTabDumpSubmit();
    });
  }

  setViewMode(mode) {
    this.viewMode = mode;
    localStorage.setItem(VIEW_KEY, mode);
    if (mode === "list") {
      this.bookmarksContainer.classList.add("mode-list");
      this.listViewBtn.classList.add("active");
      this.gridViewBtn.classList.remove("active");
    } else {
      this.bookmarksContainer.classList.remove("mode-list");
      this.gridViewBtn.classList.add("active");
      this.listViewBtn.classList.remove("active");
    }
  }

  setCollection(col) {
    this.activeCollection = col;
    // Update active class on nav
    const items = this.libraryNavList.querySelectorAll(".nav-item");
    items.forEach(el => el.classList.toggle("active", el.dataset.collection === col));
    this.render();
  }

  setCategory(cat) {
    this.activeCategory = cat;
    this.render();
  }

  setTag(tag) {
    this.activeTag = tag;
    this.render();
  }

  resetAllFilters() {
    this.activeCollection = "all";
    this.activeCategory = null;
    this.activeTag = null;
    this.searchQuery = "";
    this.searchInput.value = "";
    this.setCollection("all");
  }

  openModal() {
    this.dumpModal.classList.remove("hidden");
    document.getElementById("bmUrl").focus();
  }

  closeModal() {
    this.dumpModal.classList.add("hidden");
    this.addBookmarkForm.reset();
  }

  showToast(msg) {
    this.toast.textContent = msg;
    this.toast.classList.remove("hidden");
    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      this.toast.classList.add("hidden");
    }, 2800);
  }

  handleTabDumpSubmit() {
    const rawUrls = document.getElementById("bmUrl").value.trim();
    if (!rawUrls) return;

    const urls = rawUrls.split("\n").map(u => u.trim()).filter(Boolean);
    const category = document.getElementById("bmCategory").value;
    const title = document.getElementById("bmTitle").value.trim();
    const summary = document.getElementById("bmSummary").value.trim();
    const snippet = document.getElementById("bmSnippet").value.trim();
    const tagsRaw = document.getElementById("bmTags").value.trim();
    const tags = tagsRaw ? tagsRaw.split(",").map(t => t.trim().toLowerCase().replace(/^#/, "")).filter(Boolean) : ["dumped-tab"];

    const newBookmarks = [];
    urls.forEach((url, index) => {
      let cleanDomain = "web";
      try {
        const parsed = new URL(url.startsWith("http") ? url : "https://" + url);
        cleanDomain = parsed.hostname.replace(/^www\./, "");
      } catch (e) {
        cleanDomain = url.split("/")[0] || "link";
      }

      const generatedTitle = (urls.length === 1 && title) 
        ? title 
        : `Dumped Tab: ${cleanDomain} (${index + 1}/${urls.length})`;

      const item = {
        id: "bm-" + Date.now() + "-" + index,
        url: url.startsWith("http") ? url : "https://" + url,
        title: generatedTitle,
        domain: cleanDomain,
        category: category || "Tools & Repos",
        tags: tags.length ? tags : ["tab-dump"],
        date: new Date().toISOString().split("T")[0],
        readingTime: "5 min read",
        isInbox: true, // Dumped tabs start in Tab Inbox
        isStarred: false,
        summary: summary || `Captured from browser session. Ready for review, categorization, and archiving.`,
        insideSnippet: snippet || `Tab dump captured from ${cleanDomain} with active session context.`,
        visualType: "generic-code"
      };
      newBookmarks.unshift(item);
    });

    this.bookmarks = [...newBookmarks, ...this.bookmarks];
    this.saveBookmarks();
    this.closeModal();
    this.showToast(urls.length === 1 ? "Link saved to Tab Inbox!" : `${urls.length} tabs dumped into Inbox!`);
    this.render();
  }

  toggleStar(id) {
    const item = this.bookmarks.find(b => b.id === id);
    if (!item) return;
    item.isStarred = !item.isStarred;
    this.saveBookmarks();
    this.render();
    this.showToast(item.isStarred ? "Bookmark pinned to Favorites" : "Removed from Favorites");
  }

  toggleInbox(id) {
    const item = this.bookmarks.find(b => b.id === id);
    if (!item) return;
    item.isInbox = !item.isInbox;
    this.saveBookmarks();
    this.render();
    this.showToast(item.isInbox ? "Moved back to Tab Inbox" : "Marked as reviewed & archived");
  }

  copyLink(url) {
    navigator.clipboard.writeText(url).then(() => {
      this.showToast("Link copied to clipboard!");
    }).catch(() => {
      this.showToast("Copied link: " + url);
    });
  }

  // --- Filtering & Sorting ---
  getFilteredBookmarks() {
    return this.bookmarks.filter(bm => {
      // Collection filter
      if (this.activeCollection === "inbox" && !bm.isInbox) return false;
      if (this.activeCollection === "favorites" && !bm.isStarred) return false;

      // Category filter
      if (this.activeCategory && bm.category !== this.activeCategory) return false;

      // Tag filter
      if (this.activeTag && !bm.tags.includes(this.activeTag)) return false;

      // Search query
      if (this.searchQuery) {
        const query = this.searchQuery;
        const matchesTitle = bm.title.toLowerCase().includes(query);
        const matchesDomain = bm.domain.toLowerCase().includes(query);
        const matchesSummary = bm.summary.toLowerCase().includes(query);
        const matchesSnippet = bm.insideSnippet && bm.insideSnippet.toLowerCase().includes(query);
        const matchesTags = bm.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDomain && !matchesSummary && !matchesSnippet && !matchesTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (this.sortMode === "newest") return new Date(b.date) - new Date(a.date);
      if (this.sortMode === "oldest") return new Date(a.date) - new Date(b.date);
      if (this.sortMode === "domain") return a.domain.localeCompare(b.domain);
      if (this.sortMode === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  }

  // --- Visual Preview SVG Generators ---
  // High fidelity vector graphics representing what is *inside* each link
  generateVisualSVG(type, domain, category) {
    switch (type) {
      case "sqlite-wal":
        return `
          <svg class="preview-svg" viewBox="0 0 380 185" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="380" height="185" fill="#0f172a"/>
            <!-- Diagram grid -->
            <path d="M0 30 H380 M0 60 H380 M0 90 H380 M0 120 H380 M0 150 H380" stroke="#1e293b" stroke-width="1"/>
            <path d="M60 0 V185 M120 0 V185 M180 0 V185 M240 0 V185 M300 0 V185" stroke="#1e293b" stroke-width="1"/>
            <!-- SQLite WAL Architecture -->
            <rect x="25" y="45" width="95" height="95" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
            <text x="72" y="78" fill="#93c5fd" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">Main DB</text>
            <text x="72" y="98" fill="#64748b" font-size="9" text-anchor="middle" font-family="monospace">B-Tree Pager</text>
            <rect x="35" y="110" width="75" height="18" rx="3" fill="#0f172a"/>
            <text x="72" y="122" fill="#38bdf8" font-size="8" text-anchor="middle" font-family="monospace">read-only lock</text>

            <!-- Arrow connecting to WAL -->
            <path d="M125 92 H160" stroke="#60a5fa" stroke-width="2" stroke-dasharray="3 3"/>
            <polygon points="160,92 153,88 153,96" fill="#60a5fa"/>

            <!-- WAL Ring Buffer -->
            <rect x="165" y="35" width="185" height="115" rx="8" fill="#132338" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="257" y="58" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle" font-family="sans-serif">WAL Ring Buffer (.wal)</text>
            
            <!-- Frames -->
            <rect x="180" y="75" width="45" height="58" rx="4" fill="#0f172a" stroke="#22d3ee" stroke-width="1"/>
            <text x="202" y="96" fill="#22d3ee" font-size="9" text-anchor="middle" font-family="monospace">F #101</text>
            <text x="202" y="114" fill="#64748b" font-size="8" text-anchor="middle" font-family="monospace">Pg 4</text>

            <rect x="235" y="75" width="45" height="58" rx="4" fill="#0f172a" stroke="#3b82f6" stroke-width="1"/>
            <text x="257" y="96" fill="#93c5fd" font-size="9" text-anchor="middle" font-family="monospace">F #102</text>
            <text x="257" y="114" fill="#64748b" font-size="8" text-anchor="middle" font-family="monospace">Pg 17</text>

            <rect x="290" y="75" width="45" height="58" rx="4" fill="#1e3a5f" stroke="#60a5fa" stroke-width="1.5"/>
            <text x="312" y="96" fill="#bfdbfe" font-size="9" text-anchor="middle" font-weight="700" font-family="monospace">F #103</text>
            <text x="312" y="114" fill="#60a5fa" font-size="8" text-anchor="middle" font-family="monospace">Commit</text>
            
            <circle cx="25" cy="20" r="4" fill="#ef4444"/>
            <circle cx="37" cy="20" r="4" fill="#f59e0b"/>
            <circle cx="49" cy="20" r="4" fill="#10b981"/>
            <text x="350" y="22" fill="#64748b" font-size="9" font-family="monospace" text-anchor="end">sqlite3::wal_checkpoint</text>
          </svg>
        `;

      case "linear-ui":
        return `
          <svg class="preview-svg" viewBox="0 0 380 185" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="380" height="185" fill="#12151e"/>
            <!-- Linear Command Palette Mockup -->
            <rect x="30" y="24" width="320" height="138" rx="10" fill="#1c2030" stroke="#333b56" stroke-width="1.5"/>
            <!-- Search bar -->
            <rect x="44" y="38" width="292" height="30" rx="6" fill="#131724" stroke="#434e72" stroke-width="1"/>
            <circle cx="58" cy="53" r="5" stroke="#717f9e" stroke-width="1.5"/>
            <line x1="62" y1="57" x2="66" y2="61" stroke="#717f9e" stroke-width="1.5"/>
            <text x="74" y="57" fill="#cbd5e1" font-size="10" font-family="sans-serif">Set issue status to...</text>
            <rect x="305" y="44" width="22" height="18" rx="3" fill="#242c44"/>
            <text x="316" y="56" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="monospace">⌘K</text>
            <!-- Items -->
            <rect x="44" y="78" width="292" height="24" rx="4" fill="#263152"/>
            <circle cx="56" cy="90" r="4" fill="#f59e0b"/>
            <text x="68" y="94" fill="#ffffff" font-size="10" font-weight="600" font-family="sans-serif">In Progress</text>
            <text x="316" y="93" fill="#818cf8" font-size="9" text-anchor="end" font-family="monospace">P</text>

            <rect x="44" y="106" width="292" height="24" rx="4" fill="transparent"/>
            <circle cx="56" cy="118" r="4" fill="#10b981"/>
            <text x="68" y="122" fill="#94a3b8" font-size="10" font-family="sans-serif">Done (Closed)</text>
            <text x="316" y="121" fill="#64748b" font-size="9" text-anchor="end" font-family="monospace">D</text>

            <rect x="44" y="134" width="292" height="20" rx="4" fill="transparent"/>
            <circle cx="56" cy="144" r="4" fill="#64748b"/>
            <text x="68" y="147" fill="#64748b" font-size="9" font-family="sans-serif">Duplicate / Cancelled</text>
          </svg>
        `;

      case "attention-matrix":
        return `
          <svg class="preview-svg" viewBox="0 0 380 185" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="380" height="185" fill="#0d1117"/>
            <!-- Multihead attention diagram -->
            <text x="30" y="26" fill="#58a6ff" font-size="10" font-weight="700" font-family="monospace">Attention(Q,K,V) Heatmap Matrix</text>
            
            <!-- Heatmap cells -->
            <g transform="translate(30, 40)">
              <!-- Row 1 -->
              <rect x="0" y="0" width="24" height="24" fill="#1f6feb" rx="2"/>
              <rect x="28" y="0" width="24" height="24" fill="#388bfd" rx="2"/>
              <rect x="56" y="0" width="24" height="24" fill="#1158c7" rx="2"/>
              <rect x="84" y="0" width="24" height="24" fill="#0d419d" rx="2"/>
              <!-- Row 2 -->
              <rect x="0" y="28" width="24" height="24" fill="#0d419d" rx="2"/>
              <rect x="28" y="28" width="24" height="24" fill="#58a6ff" rx="2"/>
              <rect x="56" y="28" width="24" height="24" fill="#1f6feb" rx="2"/>
              <rect x="84" y="28" width="24" height="24" fill="#1158c7" rx="2"/>
              <!-- Row 3 -->
              <rect x="0" y="56" width="24" height="24" fill="#1158c7" rx="2"/>
              <rect x="28" y="56" width="24" height="24" fill="#1f6feb" rx="2"/>
              <rect x="56" y="56" width="24" height="24" fill="#79c0ff" rx="2"/>
              <rect x="84" y="56" width="24" height="24" fill="#388bfd" rx="2"/>
              <!-- Row 4 -->
              <rect x="0" y="84" width="24" height="24" fill="#0d419d" rx="2"/>
              <rect x="28" y="84" width="24" height="24" fill="#1158c7" rx="2"/>
              <rect x="56" y="84" width="24" height="24" fill="#388bfd" rx="2"/>
              <rect x="84" y="84" width="24" height="24" fill="#a5d6ff" rx="2"/>
            </g>

            <!-- Vector projections block -->
            <rect x="170" y="40" width="180" height="108" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
            <text x="185" y="62" fill="#7ee787" font-size="10" font-family="monospace">Q = X · W_Q  (dim 64)</text>
            <text x="185" y="82" fill="#79c0ff" font-size="10" font-family="monospace">K = X · W_K  (dim 64)</text>
            <text x="185" y="102" fill="#ffa657" font-size="10" font-family="monospace">V = X · W_V  (dim 64)</text>
            <path d="M185 116 H330" stroke="#30363d" stroke-width="1"/>
            <text x="185" y="134" fill="#e6edf3" font-size="10" font-weight="600" font-family="monospace">Score = Softmax(QKᵀ/√64)</text>
          </svg>
        `;

      case "benchmark-chart":
        return `
          <svg class="preview-svg" viewBox="0 0 380 185" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="380" height="185" fill="#18181b"/>
            <text x="25" y="28" fill="#e4e4e7" font-size="11" font-weight="700" font-family="sans-serif">Package Resolution Speed (Cold Cache)</text>
            <!-- Bar 1: uv (Rust) -->
            <text x="25" y="60" fill="#a1a1aa" font-size="9" font-family="monospace">uv (Rust)</text>
            <rect x="110" y="48" width="25" height="18" rx="3" fill="#10b981"/>
            <text x="145" y="61" fill="#34d399" font-size="10" font-weight="700" font-family="monospace">0.14s (Fastest)</text>

            <!-- Bar 2: poetry -->
            <text x="25" y="96" fill="#a1a1aa" font-size="9" font-family="monospace">poetry</text>
            <rect x="110" y="84" width="145" height="18" rx="3" fill="#f59e0b"/>
            <text x="265" y="97" fill="#fbbf24" font-size="9" font-family="monospace">3.82s</text>

            <!-- Bar 3: pip-tools -->
            <text x="25" y="132" fill="#a1a1aa" font-size="9" font-family="monospace">pip-tools</text>
            <rect x="110" y="120" width="230" height="18" rx="3" fill="#ef4444"/>
            <text x="305" y="133" fill="#ffffff" font-size="9" font-weight="600" font-family="monospace">11.40s</text>

            <line x1="110" y1="42" x2="110" y2="152" stroke="#3f3f46" stroke-width="1.5"/>
            <text x="25" y="165" fill="#71717a" font-size="8" font-family="sans-serif">Resolved 180 transitive dependencies against PyPI mirror</text>
          </svg>
        `;

      case "cpu-cache-diagram":
        return `
          <svg class="preview-svg" viewBox="0 0 380 185" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="380" height="185" fill="#0f172a"/>
            <!-- CPU Hierarchy Pyramid / Latencies -->
            <text x="30" y="26" fill="#38bdf8" font-size="11" font-weight="700" font-family="sans-serif">CPU Memory Hierarchy Latency</text>
            <!-- L1 -->
            <rect x="30" y="42" width="90" height="24" rx="4" fill="#3b82f6"/>
            <text x="75" y="58" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle" font-family="monospace">L1: 1ns</text>
            <text x="135" y="58" fill="#94a3b8" font-size="9" font-family="sans-serif">32KB (4 cycles)</text>

            <!-- L2 -->
            <rect x="30" y="74" width="140" height="24" rx="4" fill="#2563eb"/>
            <text x="100" y="90" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle" font-family="monospace">L2: 4ns</text>
            <text x="185" y="90" fill="#94a3b8" font-size="9" font-family="sans-serif">512KB (14 cycles)</text>

            <!-- L3 -->
            <rect x="30" y="106" width="200" height="24" rx="4" fill="#1d4ed8"/>
            <text x="130" y="122" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle" font-family="monospace">L3: 20ns</text>
            <text x="245" y="122" fill="#94a3b8" font-size="9" font-family="sans-serif">16MB Shared</text>

            <!-- Main RAM -->
            <rect x="30" y="138" width="310" height="24" rx="4" fill="#1e293b" stroke="#ef4444" stroke-width="1.5"/>
            <text x="185" y="154" fill="#f87171" font-size="10" font-weight="700" text-anchor="middle" font-family="monospace">Main RAM: 80–100ns (Cache Miss Penalty)</text>
          </svg>
        `;

      case "essay-quote":
        return `
          <svg class="preview-svg" viewBox="0 0 380 185" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="380" height="185" fill="#fdfcf8"/>
            <!-- Editorial Essay Snapshot -->
            <rect x="25" y="20" width="330" height="145" rx="6" fill="#ffffff" stroke="#e2d9cc" stroke-width="1.5"/>
            <text x="45" y="48" fill="#8c7355" font-size="10" font-weight="700" font-family="serif" letter-spacing="1">ESSAY EXCERPT</text>
            <text x="45" y="78" fill="#292524" font-size="14" font-family="serif" font-style="italic">“Work on what you are genuinely</text>
            <text x="45" y="100" fill="#292524" font-size="14" font-family="serif" font-style="italic">curious about, not what you’re</text>
            <text x="45" y="122" fill="#292524" font-size="14" font-family="serif" font-style="italic">supposed to work on.”</text>
            <line x1="45" y1="138" x2="140" y2="138" stroke="#d6c7b2" stroke-width="1.5"/>
            <text x="45" y="152" fill="#a89984" font-size="9" font-family="sans-serif">— Paul Graham, July 2023</text>
          </svg>
        `;

      case "typography-specimen":
        return `
          <svg class="preview-svg" viewBox="0 0 380 185" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="380" height="185" fill="#18181b"/>
            <!-- Variable Typography Specimen -->
            <text x="30" y="32" fill="#a1a1aa" font-size="9" font-family="monospace">font-variation-settings: 'wght' 720, 'opsz' 48</text>
            <text x="30" y="88" fill="#f43f5e" font-size="44" font-weight="800" font-family="sans-serif" letter-spacing="-1">Aa Bb 42</text>
            <text x="30" y="125" fill="#fafafa" font-size="15" font-weight="300" font-family="sans-serif">The quick brown fox jumps over the lazy dog</text>
            <rect x="30" y="145" width="220" height="6" rx="3" fill="#27272a"/>
            <rect x="30" y="145" width="140" height="6" rx="3" fill="#f43f5e"/>
            <circle cx="170" cy="148" r="6" fill="#ffffff"/>
            <text x="260" y="152" fill="#a1a1aa" font-size="10" font-family="monospace">vw clamp()</text>
          </svg>
        `;

      case "terminal-tree":
        return `
          <svg class="preview-svg" viewBox="0 0 380 185" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="380" height="185" fill="#090d16"/>
            <!-- Terminal Header -->
            <rect x="20" y="15" width="340" height="155" rx="8" fill="#111827" stroke="#1f2937" stroke-width="1"/>
            <circle cx="38" cy="30" r="4" fill="#ef4444"/>
            <circle cx="50" cy="30" r="4" fill="#f59e0b"/>
            <circle cx="62" cy="30" r="4" fill="#10b981"/>
            <text x="190" y="33" fill="#6b7280" font-size="9" text-anchor="middle" font-family="monospace">bash — 80x24</text>
            <!-- Tree output -->
            <text x="38" y="58" fill="#10b981" font-size="10" font-family="monospace">$ tree /mnt/tabs/14/</text>
            <text x="38" y="78" fill="#9ca3af" font-size="9.5" font-family="monospace">/mnt/tabs/14/</text>
            <text x="38" y="96" fill="#9ca3af" font-size="9.5" font-family="monospace">├── <tspan fill="#60a5fa">url.txt</tspan>      ("https://github.com/...")</text>
            <text x="38" y="114" fill="#9ca3af" font-size="9.5" font-family="monospace">├── <tspan fill="#60a5fa">title.txt</tspan>    ("uv: Fast Python...")</text>
            <text x="38" y="132" fill="#9ca3af" font-size="9.5" font-family="monospace">└── <tspan fill="#34d399">body.html</tspan>    (24.5 KB DOM tree)</text>
            <text x="38" y="154" fill="#10b981" font-size="10" font-family="monospace">$ echo "close" > /mnt/tabs/14/action</text>
          </svg>
        `;

      case "cognitive-loop":
        return `
          <svg class="preview-svg" viewBox="0 0 380 185" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="380" height="185" fill="#0f172a"/>
            <!-- Working memory cognitive overload diagram -->
            <text x="25" y="28" fill="#94a3b8" font-size="10" font-weight="700" font-family="sans-serif">Working Memory & Tab Hoarding (Miller's Law)</text>
            
            <circle cx="100" cy="100" r="48" stroke="#334155" stroke-width="2" stroke-dasharray="4 4"/>
            <circle cx="100" cy="100" r="32" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
            <text x="100" y="98" fill="#93c5fd" font-size="9" font-weight="700" text-anchor="middle" font-family="sans-serif">Active Focus</text>
            <text x="100" y="110" fill="#60a5fa" font-size="8" text-anchor="middle" font-family="monospace">4±1 chunks</text>

            <!-- Orbiting Open Tabs (Distraction) -->
            <rect x="70" y="38" width="40" height="14" rx="3" fill="#ef4444"/>
            <text x="90" y="48" fill="#ffffff" font-size="7" text-anchor="middle" font-family="sans-serif">Tab 1</text>
            
            <rect x="140" y="70" width="40" height="14" rx="3" fill="#f59e0b"/>
            <text x="160" y="80" fill="#ffffff" font-size="7" text-anchor="middle" font-family="sans-serif">Tab 2</text>

            <rect x="135" y="125" width="40" height="14" rx="3" fill="#ef4444"/>
            <text x="155" y="135" fill="#ffffff" font-size="7" text-anchor="middle" font-family="sans-serif">Tab 3</text>

            <rect x="35" y="115" width="40" height="14" rx="3" fill="#f59e0b"/>
            <text x="55" y="125" fill="#ffffff" font-size="7" text-anchor="middle" font-family="sans-serif">Tab 4</text>

            <!-- Vault Solution box -->
            <rect x="210" y="55" width="145" height="90" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
            <text x="282" y="78" fill="#34d399" font-size="10" font-weight="700" text-anchor="middle" font-family="sans-serif">Bookmarker Vault</text>
            <text x="282" y="98" fill="#cbd5e1" font-size="8.5" text-anchor="middle" font-family="sans-serif">Closing tab offloads</text>
            <text x="282" y="112" fill="#cbd5e1" font-size="8.5" text-anchor="middle" font-family="sans-serif">anxiety &amp; stores context</text>
            <text x="282" y="130" fill="#10b981" font-size="8.5" font-weight="600" text-anchor="middle" font-family="monospace">Zeigarnik loop closed ✓</text>
          </svg>
        `;

      default:
        // Generic modern code/preview card
        return `
          <svg class="preview-svg" viewBox="0 0 380 185" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="380" height="185" fill="#131c2e"/>
            <circle cx="30" cy="24" r="4" fill="#ef4444"/>
            <circle cx="42" cy="24" r="4" fill="#f59e0b"/>
            <circle cx="54" cy="24" r="4" fill="#10b981"/>
            <text x="70" y="27" fill="#64748b" font-size="9" font-family="monospace">${domain}</text>
            
            <rect x="25" y="44" width="330" height="115" rx="6" fill="#1a263d" stroke="#223249" stroke-width="1"/>
            <text x="40" y="70" fill="#38bdf8" font-size="11" font-weight="700" font-family="monospace">${category}</text>
            <text x="40" y="94" fill="#cbd5e1" font-size="10" font-family="sans-serif">Captured bookmark context &amp; preview</text>
            <rect x="40" y="110" width="120" height="8" rx="4" fill="#2d3d5c"/>
            <rect x="40" y="126" width="200" height="8" rx="4" fill="#24344d"/>
            <rect x="40" y="142" width="70" height="6" rx="3" fill="#3b82f6"/>
          </svg>
        `;
    }
  }

  // Helper to extract first letter for favicon
  getFaviconInitial(domain) {
    if (!domain) return "W";
    const clean = domain.replace(/^www\./, "");
    return clean.charAt(0).toUpperCase();
  }

  // --- Render Functions ---
  render() {
    this.renderSidebar();
    this.renderFeedHeader();
    this.renderFeed();
  }

  renderSidebar() {
    // 1. Library Counts
    const allCount = this.bookmarks.length;
    const inboxCount = this.bookmarks.filter(b => b.isInbox).length;
    const favCount = this.bookmarks.filter(b => b.isStarred).length;

    document.getElementById("count-all").textContent = allCount;
    document.getElementById("count-inbox").textContent = inboxCount;
    document.getElementById("count-favorites").textContent = favCount;

    // 2. Categories
    const categoryMap = {};
    this.bookmarks.forEach(b => {
      categoryMap[b.category] = (categoryMap[b.category] || 0) + 1;
    });

    const categoryIcons = {
      "Engineering & Systems": `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
      "Design & UI": `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
      "AI & Research": `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
      "Tools & Repos": `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
      "Essays & Reading": `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`
    };

    const defaultIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`;

    this.categoryNavList.innerHTML = Object.entries(categoryMap).map(([cat, count]) => {
      const isActive = this.activeCategory === cat;
      const icon = categoryIcons[cat] || defaultIcon;
      return `
        <li>
          <button class="nav-item ${isActive ? 'active' : ''}" data-category="${cat}">
            <span class="nav-item-left">
              ${icon}
              <span>${cat}</span>
            </span>
            <span class="nav-badge">${count}</span>
          </button>
        </li>
      `;
    }).join("");

    // 3. Tags
    const tagMap = {};
    this.bookmarks.forEach(b => {
      b.tags.forEach(t => {
        tagMap[t] = (tagMap[t] || 0) + 1;
      });
    });

    const sortedTags = Object.entries(tagMap).sort((a, b) => b[1] - a[1]);
    this.sidebarTagList.innerHTML = sortedTags.map(([tag, count]) => {
      const isActive = this.activeTag === tag;
      return `
        <button class="tag-chip ${isActive ? 'active' : ''}" data-tag="${tag}">
          #${tag} <span style="opacity: 0.65; margin-left: 2px;">${count}</span>
        </button>
      `;
    }).join("");

    this.clearTagBtn.classList.toggle("hidden", !this.activeTag);

    // 4. Session status summary
    this.sessionStatusText.textContent = `${allCount} links stored (${inboxCount} unreviewed)`;
  }

  renderFeedHeader() {
    let title = "All Bookmarks";
    let eyebrow = "LIBRARY OVERVIEW";
    let subtitle = "Visual snapshots, key takeaways, and extracted context from your saved tabs and links.";

    if (this.activeCollection === "inbox") {
      title = "Tab Dump Inbox";
      eyebrow = "OPEN SESSIONS";
      subtitle = "Tabs dumped from active browsing sessions waiting to be reviewed, tagged, or read.";
    } else if (this.activeCollection === "favorites") {
      title = "Starred & Pinned";
      eyebrow = "KEY REFERENCES";
      subtitle = "High-value articles, tools, and technical references you frequently revisit.";
    }

    if (this.activeCategory) {
      title = this.activeCategory;
      eyebrow = "CATEGORY";
      subtitle = `Bookmarks and tabs categorized under ${this.activeCategory}.`;
    }

    this.activeCollectionEyebrow.textContent = eyebrow;
    this.activeViewTitle.textContent = title;
    this.activeViewSubtitle.textContent = subtitle;

    // Filter chips bar
    const hasFilter = this.activeCategory || this.activeTag || this.searchQuery || this.activeCollection !== "all";
    if (hasFilter) {
      this.activeFiltersBar.classList.remove("hidden");
      let chipsHtml = "";
      if (this.activeCollection !== "all") {
        chipsHtml += `
          <span class="filter-chip-removable">
            ${this.activeCollection === "inbox" ? "Inbox" : "Starred"}
            <button onclick="window.bookmarkerApp.setCollection('all')">✕</button>
          </span>
        `;
      }
      if (this.activeCategory) {
        chipsHtml += `
          <span class="filter-chip-removable">
            ${this.activeCategory}
            <button onclick="window.bookmarkerApp.setCategory(null)">✕</button>
          </span>
        `;
      }
      if (this.activeTag) {
        chipsHtml += `
          <span class="filter-chip-removable">
            #${this.activeTag}
            <button onclick="window.bookmarkerApp.setTag(null)">✕</button>
          </span>
        `;
      }
      if (this.searchQuery) {
        chipsHtml += `
          <span class="filter-chip-removable">
            "${this.searchQuery}"
            <button onclick="window.bookmarkerApp.resetSearch()">✕</button>
          </span>
        `;
      }
      this.activeFilterChips.innerHTML = chipsHtml;
    } else {
      this.activeFiltersBar.classList.add("hidden");
    }
  }

  resetSearch() {
    this.searchQuery = "";
    this.searchInput.value = "";
    this.render();
  }

  renderFeed() {
    const filtered = this.getFilteredBookmarks();
    this.visibleCountStat.textContent = filtered.length;
    this.unreadCountStat.textContent = this.bookmarks.filter(b => b.isInbox).length;

    if (filtered.length === 0) {
      this.bookmarksContainer.innerHTML = "";
      this.emptyState.classList.remove("hidden");
      return;
    }

    this.emptyState.classList.add("hidden");

    this.bookmarksContainer.innerHTML = filtered.map(bm => {
      const visualSvg = this.generateVisualSVG(bm.visualType, bm.domain, bm.category);
      const faviconLetter = this.getFaviconInitial(bm.domain);
      const isStarred = bm.isStarred;
      const isInbox = bm.isInbox;

      return `
        <article class="bookmark-card" data-id="${bm.id}">
          <!-- Visual Preview Box -->
          <div class="card-preview">
            ${visualSvg}
            <span class="preview-badge-category">${bm.category}</span>
            <div class="preview-badge-status">
              ${isInbox ? `<span class="inbox-dot-pill" title="Unreviewed tab dump">Inbox</span>` : ""}
              <button 
                class="card-star-btn ${isStarred ? 'starred' : ''}" 
                title="${isStarred ? 'Remove from favorites' : 'Star bookmark'}"
                onclick="window.bookmarkerApp.toggleStar('${bm.id}')"
                aria-label="Star bookmark"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </button>
            </div>
          </div>

          <!-- Card Content -->
          <div class="card-content">
            <div class="card-meta-row">
              <span class="card-domain-badge">
                <span class="domain-favicon">${faviconLetter}</span>
                <span>${bm.domain}</span>
              </span>
              <span class="card-date">${bm.date}</span>
            </div>

            <a href="${bm.url}" target="_blank" rel="noopener noreferrer" class="card-title-link" title="${bm.title}">
              ${bm.title}
            </a>

            <!-- What's Inside Callout Box -->
            <div class="card-inside-box">
              <div class="inside-header">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                <span>What's inside this link:</span>
              </div>
              <p class="card-summary">${bm.summary}</p>
              ${bm.insideSnippet ? `<code class="inside-snippet">${bm.insideSnippet}</code>` : ""}
            </div>

            <!-- Tags -->
            <div class="card-tags">
              ${bm.tags.map(tag => `
                <button class="card-tag-pill" onclick="window.bookmarkerApp.setTag('${tag}')">
                  #${tag}
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="card-footer">
            <span class="reading-type-badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>${bm.readingTime || '5 min'}</span>
            </span>

            <div class="card-actions-group">
              <button 
                class="btn-ghost-sm" 
                title="${isInbox ? 'Mark as reviewed / archive' : 'Move back to inbox'}"
                onclick="window.bookmarkerApp.toggleInbox('${bm.id}')"
              >
                ${isInbox ? `
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ` : `
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                  </svg>
                `}
              </button>

              <button 
                class="btn-ghost-sm" 
                title="Copy link" 
                onclick="window.bookmarkerApp.copyLink('${bm.url}')"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>

              <a 
                href="${bm.url}" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="btn-external-link"
                title="Open link in new tab"
              >
                <span>Open</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }
}

// Instantiate on DOM load
document.addEventListener("DOMContentLoaded", () => {
  window.bookmarkerApp = new BookmarkerApp();
  // Set initial view mode based on saved preference
  const savedView = localStorage.getItem(VIEW_KEY) || "grid";
  window.bookmarkerApp.setViewMode(savedView);
});
