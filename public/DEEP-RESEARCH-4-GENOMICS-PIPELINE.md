# Deep Research Prompt 1: Bt Genomics Pipeline
## For ChatGPT Deep Research Mode

---

**Research Title:** Pure Advance Bt Genomics Pipeline — Full Technical Architecture for Automated Cry Toxin Discovery, Classification, Structure Prediction, and Bioactivity Assessment

**Research Objective:** Design a production-grade, end-to-end bioinformatics pipeline that takes raw Bacillus thuringiensis (Bt) whole genome sequencing data as input and produces a structured dossier of identified Cry/Vip/Cyt toxin genes, their predicted 3D structures, receptor binding predictions, known bioactivity data, and pest specificity recommendations. This pipeline will be Pure Advance's core IP-generating engine for the INSEBT biopesticide platform.

---

## Level 1: Input Layer — Genome Data Acquisition

### 1.1 Sequencing Data Formats & Sources
- What are the standard file formats for whole genome sequencing data (FASTQ, FASTA, GenBank, GFF3)?
- How do we handle raw Illumina short-read vs. Oxford Nanopore long-read vs. hybrid assembly?
- What are the best de novo genome assembly tools for Bt (SPAdes, Unicycler, Flye)?
- How do we quality-check raw reads (FastQC, MultiQC) and trim adapters (Trimmomatic, fastp)?
- What is the recommended coverage depth for Bt genome assembly (>50×? >100×)?

### 1.2 Genome Annotation
- What tools annotate Bt genomes (Prokka, DFAST, NCBI PGAP, RAST)?
- How do we handle the plasmid-heavy genome structure of Bt (6-12 plasmids)?
- What is the standard workflow for identifying open reading frames (ORFs)?
- How do we reconcile multiple annotation sources?

### 1.3 Public Bt Genome Databases
- What Bt genomes are available in NCBI GenBank? How many complete vs. draft?
- What is the Bt type strain collection (ATCC, BGSC)?
- How do we access the Bacillus cereus group reference genomes?
- What metadata is available (isolation source, geographic origin, host pest)?

---

## Level 2: Toxin Gene Identification

### 2.1 BtToxin_Digger (mims-harvard)
- What is the exact algorithm? Hidden Markov Models (HMMs)? BLAST-based? Hybrid?
- What toxin families does it detect (Cry, Cyt, Vip, Sip, Mpp)?
- What HMM profiles does it use? Are they from Bt toxin nomenclature databases?
- What is the sensitivity/specificity on benchmark datasets?
- How does it handle novel toxin genes with no close homologs?
- What input formats does it accept (GenBank, FASTA, GFF)?
- What is the output format (BED, GFF, JSON, CSV)?
- How does it handle pseudogenes and truncated toxin genes?
- What are its computational requirements (CPU, RAM, runtime per genome)?
- Installation: pip install? Docker? Dependencies?

### 2.2 CryProcessor
- What classification scheme does it use (Crickmore nomenclature — 78 Cry groups, 800+ toxins)?
- How does it assign toxin gene names? Sequence identity thresholds? Phylogenetic placement?
- What is the Crickmore Bt toxin nomenclature system (https://www.lifesci.sussex.ac.uk/home/Neil_Crickmore/Bt/)?
- How are new Cry toxin names assigned? What committee handles this?
- What is the relationship between Cry protein toxicity and sequence similarity (e.g., >95% = same subgroup, <45% = new primary rank)?
- How does CryProcessor handle chimeric toxin genes and domain swaps?
- What is its accuracy on the Bt toxin nomenclature database?

### 2.3 Complementary Tools
- What other toxin identification tools exist (BTyper3, BtToxinScanner, BLAST against BPPRC)?
- How do we cross-validate results across multiple tools?
- What is the BPPRC (Bacterial Pesticidal Protein Resource Center) database structure?
- How do we handle the Vip (Vegetative insecticidal protein) and Cyt (Cytolytic) toxin families?

### 2.4 Novel Toxin Discovery
- How do we identify truly novel toxin genes with no database matches?
- What machine learning approaches predict novel toxin function from sequence alone?
- How do we assess whether a novel gene is a true toxin vs. a non-toxic homolog?
- What experimental validation is needed (bioassays, crystal protein expression)?

---

## Level 3: Protein Structure Prediction

### 3.1 ESM-2 / ESMFold (Meta AI)
- What model sizes are available (8M, 35M, 150M, 650M, 3B, 15B)?
- What is the accuracy compared to AlphaFold2 on Bt toxins?
- How do we generate protein embeddings for downstream ML tasks?
- What is the pLDDT confidence score interpretation for Cry toxins?
- Can ESMFold handle multi-domain Cry toxins (~130 kDa, 3 domains)?
- What are the computational requirements for ESM-2 15B inference?
- How do we batch-process hundreds of Cry toxin sequences?

### 3.2 AlphaFold 3 / AlphaFold Server
- What are the limitations of the free AlphaFold server (30 jobs/day, non-commercial)?
- Can it model Cry toxin-receptor complexes (toxin + cadherin receptor)?
- How do we handle post-translational modifications (protoxin activation, cleavage)?
- What is the confidence scoring for protein-protein vs. protein-ligand predictions?

### 3.3 Boltz-1 / Boltz-2 (MIT)
- How does Boltz compare to AlphaFold3 on protein-protein complexes?
- Can it model the Cry toxin binding to BBMV (brush border membrane vesicle) receptors?
- What is the installation and GPU requirement?
- How do we set up Boltz for batch predictions?

### 3.4 RFdiffusion (Rosetta Commons)
- How can diffusion models engineer novel Cry toxin variants with enhanced binding?
- What conditioning strategies are available (hotspot residues, symmetry, scaffolds)?
- Can we design de novo toxins that maintain the three-domain Cry fold?
- What is the computational cost per design?

### 3.5 Structure Visualization
- How do we render interactive 3D protein structures in a web browser (3Dmol.js, NGL Viewer, Mol*)?
- What web components support structure visualization in Next.js?
- How do we display AlphaFold pLDDT confidence coloring?
- How do we highlight binding sites and mutation positions?

---

## Level 4: Receptor Binding & Pest Specificity

### 4.1 Known Bt Receptor Systems
- What are the major Bt toxin receptors in insect midguts?
  - Cadherins (Bt-R1, Bt-R2, Bt-R3)
  - Aminopeptidases N (APN1-4)
  - Alkaline phosphatases (ALP)
  - ABC transporters (ABCC2)
  - Glycolipids and V-ATPase subunits
- How do different Cry toxin domains (I, II, III) interact with these receptors?
- What is the "mode of action" cascade (binding → oligomerization → pore formation → cell lysis)?

### 4.2 Molecular Docking
- How do we model Cry toxin-receptor binding computationally?
- What docking tools are available (HADDOCK, ClusPro, AutoDock Vina, DiffDock)?
- How do we handle the large size of Cry toxin-receptor complexes (>200 kDa combined)?
- What scoring functions are appropriate for protein-protein docking?
- How do we validate docking predictions against known binding data?

### 4.3 ML-Based Binding Prediction
- How can ESM-2 embeddings predict toxin-receptor affinity?
- What training data exists for Bt toxin-receptor binding (TOXiTAXi, published bioassays)?
- Can we build a custom binding prediction model for PA's specific pest targets?
- What features are most predictive (sequence similarity, structural complementarity, electrostatic surface)?

### 4.4 Pest Specificity Prediction
- How do we predict which Cry toxins are active against which pest species?
- What is the TOXiTAXi database structure (118 combinations, 38 species)?
- How do we map PA's target pests (lepidopteran, dipteran, coleopteran) to known Cry toxin activity?
- What is the Red Palm Weevil (Rhynchophorus ferrugineus) receptor profile?
- Which Cry toxins show activity against RPW or related coleopterans?

---

## Level 5: Knowledge Integration & Reporting

### 5.1 Cross-Reference Databases
- How do we integrate data from:
  - TOXiTAXi (bioassay data)
  - BPPRC (nomenclature)
  - UniProt (sequences)
  - AlphaFold DB (structures)
  - PDB (experimental structures)
  - PubMed (literature)
- What APIs are available for programmatic access?
- How do we handle identifier mapping across databases?

### 5.2 Knowledge Graph Construction
- How do we build a knowledge graph linking:
  - Toxin genes → Proteins → Structures → Receptors → Pests → Bioactivity → Literature
- What graph database should we use (Neo4j, in-memory, RDF)?
- What query language (Cypher, SPARQL, GraphQL)?
- How do we make this queryable by non-technical team members?

### 5.3 Automated Report Generation
- What should a "Bt Strain Analysis Report" contain?
  - Genome assembly statistics
  - Identified toxin genes (with coordinates, flanking sequences)
  - Toxin classification (Cry/Vip/Cyt nomenclature)
  - Predicted structures (with pLDDT confidence)
  - Known bioactivity data (from TOXiTAXi)
  - Predicted pest specificity
  - Literature references
  - Novel vs. known toxin flagging
- How do we generate this report automatically from pipeline output?
- What visualization formats (cards, tables, 3D viewers, network graphs)?

---

## Level 6: Production Architecture

### 6.1 Pipeline Orchestration
- What workflow manager (Nextflow, Snakemake, CWL, Airflow)?
- How do we handle long-running jobs (genome assembly: 2-6 hours, structure prediction: 30 min - 2 hours)?
- How do we implement checkpointing and restart on failure?
- What containerization strategy (Docker, Singularity, Apptainer)?

### 6.2 Compute Resources
- What are the GPU requirements for each step?
  - Genome assembly: CPU only (32 cores, 128 GB RAM)
  - Toxin identification: CPU only (4 cores, 16 GB RAM)
  - ESMFold: 1× A100 (40 GB) or 2× RTX 4090
  - Boltz: 1× A100 (80 GB)
  - RFdiffusion: 1× A100 (40 GB)
  - Docking: CPU intensive (16-32 cores per complex)
- What cloud compute options (AWS, GCP, Azure, Lambda Labs, RunPod)?
- What is the cost per genome analysis (estimated)?

### 6.3 Data Storage
- How much storage per genome (raw reads: 20-50 GB, assembly: 500 MB - 2 GB, structures: 100-500 MB)?
- What database strategy for hundreds of genomes (PostgreSQL, SQLite, MongoDB)?
- How do we version control pipeline results?

### 6.4 Integration with Command Center
- How do we expose pipeline results via REST API?
- What frontend components display genomic data (sequence viewers, structure viewers, tables)?
- How do we implement real-time progress tracking?
- What authentication/authorization is needed?

---

## Level 7: Specific PA Use Cases

### 7.1 INSEBT Strain Selection
- How do we screen multiple Bt candidate strains and rank them by predicted efficacy?
- What metrics should we use (toxin gene count, diversity, known bioactivity, novelty)?
- How do we compare Bt kurstaki HD-1 vs. HD-73 vs. PA's proprietary strains?

### 7.2 Multi-Toxin Strain Engineering
- Can we predict which combinations of Cry toxins would be synergistic?
- How do we design a strain with broad-spectrum activity (lepidopteran + dipteran)?
- What is the current understanding of Cry toxin synergism (Cry1 + Cry2, Cry + Cyt)?

### 7.3 Resistance Management
- How do we predict which toxin combinations minimize resistance risk?
- What is the "high-dose/refuge" strategy and how does toxin selection affect it?
- How do we model resistance evolution (modeled fitness costs, receptor mutations)?

### 7.4 PALMORA (Red Palm Weevil)
- What Bt toxins show activity against coleopteran pests?
- What is known about RPW midgut receptors?
- Are there any published Bt bioassays against Rhynchophorus ferrugineus?
- How do we adapt the pipeline for a pest with limited genomic data?

---

**Deliverable:** A complete technical specification document covering all 7 levels, with tool names, versions, installation commands, API endpoints, compute requirements, cost estimates, and integration points with Pure Advance's Command Center (Next.js). Include a prioritized implementation roadmap with timeline estimates.

**Format:** Structured markdown with tables, code blocks for API calls, architecture diagrams (text-based), and decision matrices for tool selection at each pipeline stage.
