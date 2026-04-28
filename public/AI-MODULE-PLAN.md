# AI Module — Implementation Plan
## Pure Advance Command Center
**Date:** April 28, 2026

---

## What We Have (Assets)

### Knowledge Base (pureadvance-v2)
- 66+ MIMS-Harvard repos analyzed (open-source bio-AI tools)
- 14 HIGH-priority repos with detailed guides
- Bt bioreactor due diligence (Flores 1997, Boniolo 2012, Sarrafzadeh 2006)
- Full AI-Biotech landscape report (ChatGPT Deep Research × 3 iterations)
- BIO-AI-MODELS-AND-COMMUNITIES.md — 25+ models, 10 data repos
- Source of truth: company.yaml, team-roster.yaml, partnerships.yaml, timeline.yaml
- Product specs: INSEBT URS, LETHA formulation, Coolvex patent data

### Open-Source Models (ready to use)
| Model | What | License | How |
|-------|------|---------|-----|
| **BtToxin_Digger** | Mine Cry/Vip/Cyt genes from genomes | Open | CLI tool |
| **CryProcessor** | Classify Cry toxin genes | Open | CLI tool |
| **ESM-2** (Meta) | Protein embeddings, structure prediction | MIT | HuggingFace |
| **ESMFold** (Meta) | Protein structure from sequence | MIT | HuggingFace |
| **Evo 2** (Arc Institute) | Genome-scale foundation model (40B) | Apache 2.0 | GitHub |
| **Nucleotide Transformer** | DNA foundation model (500M-2.5B) | Custom | HuggingFace |
| **AlphaFold 3** (server) | Protein-DNA-RNA-ligand complexes | Free (non-commercial) | Web API |
| **Boltz-1/2** | Open-source AF3 alternative | MIT | GitHub |
| **RFdiffusion** | Diffusion-based protein design | Apache 2.0 | GitHub |
| **DiffDock** | Molecular docking | MIT | GitHub |
| **ToolUniverse** (InstaDeep) | 1,295 biomedical tools via MCP | Open | GitHub |
| **TxAgent** | Multi-agent therapeutic reasoning | Open | GitHub |
| **PrimeKG** | Biomedical knowledge graph (129K nodes) | Open | HuggingFace |
| **TxGNN** | Therapeutic knowledge graph neural network | Open | GitHub |

### Data Sources (APIs)
| Database | What | Access |
|----------|------|--------|
| UniProt | 202M+ protein sequences | Free API |
| AlphaFold DB | 200M+ predicted structures | Free API |
| RCSB PDB | Experimental structures | Free REST API |
| NCBI GenBank | Nucleotide sequences | Free (Entrez API) |
| TOXiTAXi | Bt toxin bioassay database (118 combos, 38 species) | Free |
| BPPRC | Cry/Vip/Cyt nomenclature | Free |

---

## 5 Implementable AI Modules

### Module 1: Knowledge RAG (Semantic Search)
**What:** Query all PA research documents using natural language
**How:**
- Embed pureadvance-v2 docs (YAML, MD, research reports) using `BGE-M3` or `nomic-embed-text`
- Store in local vector DB (ChromaDB or Qdrant)
- Query via semantic search → return source-cited answers
- Use `gpt-4o-mini` or local `llama-3.3-70b` for answer synthesis

**Stack:** Python + ChromaDB + sentence-transformers + FastAPI backend
**Effort:** 2-3 days
**Showcase:** Scientists ask "What's the kLa criterion for Bt scale-up?" → gets Flores 1997 data with DOI

### Module 2: Bt Genomics Pipeline
**What:** Analyze Bt genome sequences → identify Cry toxins → predict structure
**How:**
- Upload FASTA → BtToxin_Digger identifies Cry/Vip/Cyt genes
- CryProcessor classifies toxins by nomenclature
- ESM-2 generates protein embeddings
- ESMFold predicts 3D structures
- Cross-reference against TOXiTAXi bioassay database
- Results displayed as interactive cards with structure viewer

**Stack:** Python + BioPython + HuggingFace transformers + 3Dmol.js
**Effort:** 5-7 days
**Showcase:** Upload Bt genome → get Cry toxin inventory with predicted structures and known bioactivity

### Module 3: Knowledge Graph Explorer
**What:** Interactive graph of PA's research ecosystem
**How:**
- Build from: products, partners, team, publications, tools, organisms
- Use Neo4j or in-memory graph (D3.js force-directed)
- Query: "What tools are relevant to INSEBT?" → shows BtToxin_Digger, CryProcessor, ESM-2, AlphaFold
- Or: "Who works on biocontrol?" → Prof. Ahmed Tayel + relevant papers

**Stack:** D3.js + JSON graph data + API endpoints
**Effort:** 3-4 days
**Showcase:** Interactive network graph connecting products, people, papers, tools, organisms

### Module 4: Bioinformatics Dashboard
**What:** Live data panels from public bio databases
**How:**
- UniProt API → search for Bt Cry proteins → show sequence info
- AlphaFold DB → fetch predicted structures for Cry toxins
- TOXiTAXi → show bioassay data for Bt × pest combinations
- RCSB PDB → show experimental Bt toxin structures
- Display as cards with expandable details

**Stack:** Next.js API routes + fetch to public APIs + React components
**Effort:** 3-4 days
**Showcase:** Live query of UniProt for "Bacillus thuringiensis Cry1Ac" → sequence, structure, bioassay data

### Module 5: Agent Swarm (Multi-Agent Research)
**What:** Orchestrated AI agents that collaborate on research tasks
**How:**
- **Literature Agent** — searches PubMed, arXiv for Bt papers
- **Genomics Agent** — runs BtToxin_Digger + CryProcessor on sequences
- **Structure Agent** — runs ESMFold on identified toxins
- **Cross-Reference Agent** — maps findings to TOXiTAXi + BPPRC databases
- **Report Agent** — synthesizes all findings into structured report
- Orchestrator coordinates agents, manages state, produces final output

**Stack:** Python + LangGraph or CrewAI + tool integrations
**Effort:** 7-10 days
**Showcase:** "Analyze this Bt strain" → agents collaborate → structured dossier with gene IDs, structures, bioactivity predictions

---

## Priority Order (by impact × feasibility)

| # | Module | Impact | Feasibility | Priority |
|---|--------|--------|-------------|----------|
| 1 | Knowledge RAG | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 🔴 DO FIRST |
| 4 | Bioinformatics Dashboard | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 🟡 DO SECOND |
| 3 | Knowledge Graph | ⭐⭐⭐⭐ | ⭐⭐⭐ | 🟡 DO THIRD |
| 2 | Bt Genomics Pipeline | ⭐⭐⭐⭐⭐ | ⭐⭐ | 🔵 DO FOURTH |
| 5 | Agent Swarm | ⭐⭐⭐⭐⭐ | ⭐⭐ | 🔵 DO FIFTH |

---

## Quick Wins (can implement TODAY)

### 1. RAG over pureadvance-v2
```python
# Pseudocode
docs = load_all_markdown("pureadvance-v2/Pure Advance/")
chunks = chunk(docs, size=512, overlap=50)
embeddings = embed(chunks, model="BAAI/bge-m3")
db = ChromaDB.from_embeddings(embeddings)
# Query
results = db.similarity_search("kLa criterion for Bt bioreactor")
answer = llm.synthesize(results, query)
```

### 2. UniProt live search
```python
# Search for Bt Cry toxins
url = "https://rest.uniprot.org/uniprotkb/search?query=organism_id:1428+AND+cry&format=json"
# Returns: Cry1Aa, Cry1Ab, Cry1Ac, Cry2Aa, etc.
```

### 3. AlphaFold structure fetcher
```python
# Get predicted structure for Cry1Ac
url = "https://alphafold.ebi.ac.uk/api/prediction/Q03731"  # UniProt ID
# Returns: PDB file URL, pLDDT confidence scores
```

---

## For the Command Center (Next.js integration)

Each module becomes an API route + UI component:

```
/api/ai/rag/search          → RAG query endpoint
/api/ai/genomics/analyze    → Bt genome analysis
/api/ai/graph/query         → Knowledge graph queries
/api/ai/bio/uniprot         → UniProt search proxy
/api/ai/bio/alphafold       → AlphaFold structure fetch
/api/ai/agents/research     → Agent swarm orchestrator
```

**UI:** `/ai` page with tabbed interface:
- 🔍 **Search** — RAG-powered knowledge search
- 🧬 **Genomics** — Bt genome analysis tools
- 🌐 **Graph** — Interactive knowledge graph
- 📊 **Databases** — Live bio database queries
- 🤖 **Agents** — Multi-agent research orchestrator

---

*Next step: Start with Module 1 (Knowledge RAG) — highest impact, lowest effort, immediately useful for all team members.*
