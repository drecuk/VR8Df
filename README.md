# 8Df VR Experience Co-Ideation Assistant  
Human–AI Collaboration for VR Experience Design grounded in VR theories

================================================================================
pipeline diagram here
================================================================================
### 📄 Dimensionality Framework (8Df) Paper:
- Ch’ng E (2026) What’s beyond Presence? Dimensionality, Control and Information Spaces, Presence: Virtual and Augmented Reality 2026(37), MIT Press. Accepted for 2026, Issue 37. *[`doi.org/10.1162/PRES.a.418`](https://doi.org/10.1162/PRES.a.418)* 

- 📊 LLM Comparison Study (ChatGPT / Gemini / DeepSeek):
- Ch'ng E (2026) Human-AI Co-Ideation in VR Experience Design: Using the Dimensionality Framework (8Df) to Structure LLM-Guided Design, Nature Humanities and Social Sciences Communications.  
  *[https://www.nature.com/articles/s41599-026-07985-4](https://www.nature.com/articles/s41599-026-07985-4)*

### 🎬🎥▶️ Video Explanation:
- What’s Beyond Presence? A Light Look at the VR Dimensionality Framework (8Df) - NotebookLM Podcast Style *[`YouTube`](https://youtu.be/nr6Ol6AXxqg?si=r7zXAdFZ8Q2Y0NF6)*
- A Basic View of the VR Dimensionality Framework (8Df) *[`YouTube`](https://www.youtube.com/watch?v=6ILR7vumbvg)*
  
#### In the Chatbot prompt, type 'start' to start using:
- 🔗 **ChatGPT Live Demo:** *[[ChatGPT](https://chatgpt.com/g/g-68e37b8b9fc48191831d1b7259437899-vr-dimensionality-framework-8df)]*
- 🔗 **Gemini Live Demo:** *[[Gemini](https://gemini.google.com/gem/1AlAkOAy8J22ervxGA4v999riudajEZdP?usp=sharing)]*
- 🧠 **bot implementation for DeepSeek and other LLMs:** [soon]

#### OpenAI Codex Plugin:
- 📦 **[Download VR Dimensionality Framework (8Df) Plugin v2.4.0](https://github.com/drecuk/VR8Df/releases/download/v2.4.0/vr-dimensionality-framework-8df-2.4.0.zip)** ([release notes](https://github.com/drecuk/VR8Df/releases/tag/v2.4.0))
- Guides users through the human-confirmed DM-0 to DM-8 design workflow using the eight-dimensional framework.
- Includes one bundled local MCP server with reference, design-dial, checkpoint, and document-generation tools.
- After approved DM-8 synthesis, it automatically creates four local files: a **Word Specification**, **Design Dossier**, **Visual Layout Map**, and **Comic Storyboard**. The visuals are also embedded in the Word documents.
- **Requirements:** ChatGPT desktop with Codex/local MCP execution support and Node.js 20 or later.
- **SHA-256:** `2169778d76b33ef042dfa8f571933d45f2969f6696681336f983d0aca09a85f6`

##### Install from this GitHub repository
1. Install [Node.js 20 or later](https://nodejs.org/) if it is not already available.
2. Add this repository as a Codex plugin marketplace:
   ```sh
   codex plugin marketplace add drecuk/VR8Df
   ```
3. Restart the ChatGPT desktop app.
4. Open the **Plugins Directory**, select the **VR Dimensionality Framework** marketplace, open **VR Dimensionality Framework**, and select **Install**.
5. Start a new conversation and ask: `Tell me what the Dimensionality Framework is.`

To refresh the repository package after a new release:
```sh
codex plugin marketplace upgrade vr8df
```

The ZIP link above is retained for release downloads and package submission. Repository users should use the marketplace installation steps.
================================================================================


## 1. Overview
The **8Df Co-Ideation Assistant** is a human–AI collaborative system that guides users through designing VR experiences using the **Dimensionality Framework (8Df)**—a theoretical model covering eight VR experiential dimensions:

- Spatial  
- Sensory  
- Placeness  
- Temporal  
- Cultural  
- Social  
- Cognitive  
- Psychological  

This repository provides the full prompt architecture, workflow logic, and design methodology needed to replicate the assistant across ChatGPT, Gemini, DeepSeek, Claude, and other LLM platforms.


================================================================================
## 2. Project Purpose

### **Why This Project Exists**
- To provide a **structured, theory-grounded method** for VR design  
- To evaluate how different LLMs engage in **human–AI co-ideation**  
- To shift VR creation **beyond realism** toward intentional experience design  
- To reduce fragmentation in ideation by guiding designers through **eight interdependent dimensions**

### **Goals**
- Support creativity with the Dimensionality Framework  
- Make VR design accessible to non-experts
- Provide a consistent workflow across AI models  
- Produce actionable, implementation-ready output
- Propose visual diagrams and storyboards (depending on modality of the LLM)


================================================================================
## 3. The 8Df Co-Ideation Assistant

### **Core Concept**
The assistant functions as:
- A **Socratic VR design partner**  
- A **expert mentor enforcing the 8Df framework**  
- A **dialogic generator of scenes, modulations, and effects**  
- A **workflow manager** ensuring human-in-the-loop checkpoints  

### **Powered by the ChatBot Brain** 🧠
See: bot implementation for DeepSeek and other LLMs:** [`VR8Df_bot.md`](VR8Df_bot.md)

Includes:
- Framework definitions  
- Persona, tone, and reasoning rules  
- Modulation dials & effects spectrum  
- Step-by-step VR design workflow  
- Safety, ethics, and feasibility constraints  


================================================================================
## 4. How to Use

### **A. ChatGPT or Gemini**
1. Go to GPT Builder/Gemini Gems
2. Upload `VR8Df_bot.md` as system prompt  
3. Save as a custom GPT  

### **B. Gemini / Claude / DeepSeek**
- Paste the contents of `VR8Df_bot.md` into the system prompt area  
- Recommended: Use “Project Mode” for persistent memory  
- Supports long-context workflows  

### **C. Local / Open-Source LLM**
- Load the file as system prompt  
- Works with Qwen, Llama, Mistral, etc.  


================================================================================
## 5. 8Df Co-Ideation Workflow

### **Stage 0 — System Welcome**
- Introduces the 8 Dimensional Framework (8Df)
- Provides citation if asked  
- Establishes purpose and expectations  

---

### **Step 1 — Define VR Experience Goal**
The user specifies the primary intent (provide more details):
- Education  
- Training  
- Empathy  
- Culture
- Heritage
- Entertainment  
- Research
- and more!  

---

### **Step 2 — Scene Planning**
- User provides number of scenes and purpose  
- If missing, assistant proposes 3–5 scenes  
- Ensures coherent pacing + information flow  

---

### **Step 3 — Dimension-by-Dimension Ideation**
For each dimension:
1. Provide definition  
2. Offer optional tables  
3. Suggest modulation **dials**  
4. Explain **trade-offs**  
5. Generate proposals  
6. Ask user to confirm → then proceed  

Dimensions:

- **DM-0 Spatial**  
- **DM-1 Sensory**  
- **DM-2 Placeness**  
- **DM-3 Temporal**  
- **DM-4 Cultural**  
- **DM-5 Social**  
- **DM-6 Cognitive**  
- **DM-7 Psychological**  

---

### **Step 4 — Human-in-the-Loop Control**
- Assistant pauses before each dimension  
- Awaits approval  
- Maintains workflow state  

---

### **Step 5 — Final Synthesis**
Output includes:
- Full dimensional summary table  
- Scene-by-scene narrative  
- Multi-dimensional rationale  
- Effects spectrum + modulation summary  
- Implementation-ready VR design specification  


================================================================================
## 6. Core Principles

### **Framework Principles**
- **Value-first design** → every decision must support the VR goal  
- **Balanced modulation** → dimensions influence each other  
- **Theoretical fidelity** → grounded in 8Df (Ch’ng, 2026)  
- **Transparency** → rationale for every design choice  
- **Ethical sensitivity** → cultural and psychological considerations  

### **AI Collaboration Principles**
- AI is a **co-ideator**, not a replacement for human creativity  
- AI structurally supports:  
  - Divergent idea generation  
  - Reflective analysis  
  - Information synthesis  
- Human determines final intention, meaning-making, and evaluation  


================================================================================
## 7. Resources

#### In the Chatbot prompt, type 'start' to start using:
- 🔗 **ChatGPT Live Demo:** *[[ChatGPT](https://chatgpt.com/g/g-68e37b8b9fc48191831d1b7259437899-vr-dimensionality-framework-8df)]*
- 🔗 **Gemini Live Demo:** *[[Gemini](https://gemini.google.com/gem/1AlAkOAy8J22ervxGA4v999riudajEZdP?usp=sharing)]*
- 🧠 **bot implementation for DeepSeek and other LLMs:** [`soon`])

### 📄 Dimensionality Framework (8Df) Paper:
-  Ch’ng E (2026) What’s beyond Presence? Dimensionality, Control and Information Spaces, Presence: Virtual and Augmented Reality 2026(37), MIT Press. Accepted for 2026, Issue 37. *[`doi.org/10.1162/PRES.a.418`](https://doi.org/10.1162/PRES.a.418)* 

- 📊 LLM Comparison Study (ChatGPT / Gemini / DeepSeek):
- Now accepted as Ch'ng E (2026) Human-AI Co-Ideation in VR Experience Design: Using the Dimensionality Framework (8Df) to Structure LLM-Guided Design, Nature Humanities and Social Sciences Communications.  
  *[ResearchSquare](https://www.researchsquare.com/article/rs-8274845/v1)*
