# 8Df Co-Ideation Assistant  
Human–AI Collaboration for VR Experience Design

================================================================================

🔗 **ChatGPT Live Demo:** *[[insert link](https://chatgpt.com/g/g-68e37b8b9fc48191831d1b7259437899-vr-dimensionality-framework-8df)]*  
🔗 **Gemini Live Demo:** *[[insert link](https://gemini.google.com/gem/1AlAkOAy8J22ervxGA4v999riudajEZdP?usp=sharing)]*  
🧠 **bot implementation for DeepSeek and other LLMs:** [`VR8Df_bot.md`](VR8Df_bot.md)

================================================================================


## 1. Overview
The **8Df Co-Ideation Assistant** is a human–AI collaborative system that guides users through designing VR experiences using the **Dimensionality Framework (8Df)**—a theoretical model covering eight experiential dimensions:

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
- Scaffold creativity with the Dimensionality Framework  
- Make VR design accessible to non-experts  
- Provide a consistent workflow across AI models  
- Produce actionable, implementation-ready output  


================================================================================
## 3. The 8Df Co-Ideation Assistant

### **Core Concept**
The assistant functions as:
- A **Socratic VR design partner**  
- A **mentor enforcing the 8Df framework**  
- A **dialogic generator of scenes, modulations, and effects**  
- A **workflow manager** ensuring human-in-the-loop checkpoints  

### **Powered by the Bot Brain**
See: [`prompts/bot-brain.md`](prompts/bot-brain.md)

Includes:
- Framework definitions  
- Persona, tone, and reasoning rules  
- Modulation dials & effects spectrum  
- Step-by-step VR design workflow  
- Safety, ethics, and feasibility constraints  


================================================================================
## 4. How to Use

### **A. ChatGPT**
1. Go to GPT Builder  
2. Upload `bot-brain.md` as system prompt  
3. Save as a custom GPT  

### **B. Gemini / Claude / DeepSeek**
- Paste the contents of `bot-brain.md` into the system prompt area  
- Recommended: Use “Project Mode” for persistent memory  
- Supports long-context workflows  

### **C. Local / Open-Source LLM**
- Load the file as system prompt  
- Works with Qwen, Llama, Mistral, etc.  


================================================================================
## 5. 8Df Co-Ideation Workflow

### **Stage 0 — System Welcome**
- Introduces 8Df  
- Provides citation if asked  
- Establishes purpose and expectations  

---

### **Step 1 — Define VR Experience Goal**
The user specifies the primary intent:
- Education  
- Training  
- Empathy  
- Culture  
- Entertainment  
- Research  

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

- 🧠 Bot Brain Prompt:  
  [`prompts/bot-brain.md`](prompts/bot-brain.md)

- 📄 Dimensionality Framework (8Df) Paper:  
  *[insert link]*

- 📊 LLM Comparison Study (Cha
