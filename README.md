# Bookmarker 🔖

> **Visual Tab & Bookmark Vault** — Built for dumping browser tabs, categorizing links, and preserving what is *actually inside* each bookmark so you never lose context.

Based on the vision in [starter.md](file:///home/mrjohn/Work/tries/2026-10-16-bookmarker/starter.md):
> *"Somewhere visual that shows a sense of what is actually IN that link or that bookmark I've saved. We'll first focus on a simple HTML layout for showcasing these bookmarks."*

---

## 🚀 Quick Start

Open [`index.html`](index.html) directly in any web browser, or serve it with Python:

```bash
# In this directory:
python3 -m http.server 8000
```
Then visit [`http://localhost:8000`](http://localhost:8000).

---

## ✨ Features

- **Visual "Inside" Snapshots**: Instead of plain text or missing external images, each card features a custom visual diagram or interface mockup showing what is *inside* the link (e.g., SQLite WAL ring-buffer diagrams, Linear command-k UI, Attention heatmap matrices, compiler benchmarks, CPU cache hierarchy charts, and terminal trees).
- **Extracted Context & "What's Inside" Callouts**: Every bookmark includes a summary plus a dedicated `What's inside this link:` snippet highlighting key code, formulas, or takeaways.
- **Tab Dump Inbox**: A dedicated workflow for dumping open browser tabs into an unread inbox. Review, tag, and archive them when ready.
- **Batch Tab Dump Modal**: Click **"Dump Tabs / Add Link"** to paste one or multiple URLs at once (one per line) with optional categories, snippets, and tags.
- **Category & Tag Filtering**: Browse by categories (*Engineering & Systems*, *Design & UI*, *AI & Research*, *Tools & Repos*, *Essays & Reading*) or filter dynamically by clicking any tag pill.
- **Real-Time Instant Search**: Press `/` anywhere to focus search across titles, inside snippets, domains, and tags.
- **Dual Layout Views**:
  - **Visual Grid**: Rich visual cards with preview graphics and inside takeaways.
  - **Compact List**: Clean, dense tabular view for quickly scanning large dumps of tabs.
- **Light & Dark Mode**: Modern, minimal interface with theme persistence in `localStorage`.
- **Zero External Dependencies**: Clean, semantic HTML5, modern CSS3 variables, and vanilla JavaScript that work 100% offline.
