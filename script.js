const jobs = {
  mount: {
    kicker: "CURRENT ROLE · HEALTHCARE", number: "01 / 05", title: "Senior Data Engineer",
    summary: "Building a governed healthcare data platform that brings clinical, claims, patient, provider, laboratory, and operational information together for analytics, machine learning, and emerging GenAI use cases.",
    focus: ["Cloud batch and streaming ingestion", "Lakehouse layers and reusable transformations", "Healthcare data quality, governance, and security", "ML data preparation and RAG workflows"],
    tags: ["AWS", "Databricks", "PySpark", "Kafka", "Airflow", "Delta Lake", "MLflow", "Amazon Bedrock"],
    note: "Dependable pipelines, clear data layers, and trusted data for the people and systems downstream."
  },
  citi: {
    kicker: "FINANCIAL SERVICES · AZURE", number: "02 / 05", title: "Data Engineer",
    summary: "Developed an Azure-based enterprise data platform for financial and transactional data, supporting ingestion, transformation, quality checks, and analytical consumption across batch, CDC, and near-real-time workloads.",
    focus: ["ADF ingestion and workflow orchestration", "Databricks, PySpark, and Delta Lake transformations", "Dimensional models and incremental processing", "Security, lineage, and deployment automation"],
    tags: ["Azure Data Factory", "ADLS Gen2", "Databricks", "Delta Lake", "Synapse", "Event Hubs", "Purview", "Terraform"],
    note: "Structured processing and clear controls help financial data remain consistent, traceable, and ready for analysis."
  },
  cvs: {
    kicker: "HEALTHCARE · AWS", number: "03 / 05", title: "Senior Data Engineer",
    summary: "Built and supported healthcare data pipelines bringing together clinical, claims, patient, provider, laboratory, and operational data for reporting, analytics, and machine learning.",
    focus: ["Distributed Spark and PySpark processing", "Batch, incremental, and CDC ingestion", "Data quality, reconciliation, and dimensional modeling", "Sensitive-data handling and operational monitoring"],
    tags: ["AWS", "S3", "Glue", "EMR", "Redshift", "Athena", "Kafka", "Airflow"],
    note: "Healthcare data needs both engineering discipline and careful handling of sensitive information."
  },
  boa: {
    kicker: "BANKING · GOOGLE CLOUD", number: "04 / 05", title: "Data Engineer",
    summary: "Worked on a GCP data platform processing banking and financial information from databases, enterprise applications, files, and event-driven sources into curated analytical datasets.",
    focus: ["Python, Spark, Hadoop, and Hive processing", "GCS ingestion and BigQuery analytical models", "Kafka event ingestion and workflow scheduling", "Source-to-target validation and pipeline monitoring"],
    tags: ["GCP", "Cloud Storage", "Dataproc", "BigQuery", "Cloud Composer", "Airflow", "Kafka", "PySpark"],
    note: "Reusable ingestion and transformation patterns help keep distributed data workflows consistent."
  },
  walmart: {
    kicker: "RETAIL · PYTHON DEVELOPMENT", number: "05 / 05", title: "Python Developer",
    summary: "Developed Python applications and data-processing components for retail product, inventory, order, pricing, and operational information, integrating databases and internal services.",
    focus: ["Python utilities and ETL routines", "SQL, relational databases, and reconciliation", "REST API integration and data validation", "Linux-based application support and troubleshooting"],
    tags: ["Python", "SQL", "Pandas", "NumPy", "Flask", "SQLAlchemy", "REST APIs", "Linux"],
    note: "A foundation in application development shaped a practical approach to reusable, maintainable data processing."
  }
};
const tabs = [...document.querySelectorAll(".timeline-item")];
const fields = {
  kicker: document.querySelector("#job-kicker"),
  number: document.querySelector("#job-number"),
  title: document.querySelector("#job-title"),
  summary: document.querySelector("#job-summary"),
  focus: document.querySelector("#job-focus"),
  tags: document.querySelector("#job-tags"),
  note: document.querySelector(".detail-note p")
};
function showJob(key) {
  const job = jobs[key];
  if (!job) return;
  tabs.forEach(tab => {
    const selected = tab.dataset.job === key;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  fields.kicker.textContent = job.kicker;
  fields.number.textContent = job.number;
  fields.title.textContent = job.title;
  fields.summary.textContent = job.summary;
  fields.focus.replaceChildren(...job.focus.map(text => {
    const li = document.createElement("li"); li.textContent = text; return li;
  }));
  fields.tags.replaceChildren(...job.tags.map(text => {
    const tag = document.createElement("span"); tag.textContent = text; return tag;
  }));
  fields.note.textContent = job.note;
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => showJob(tab.dataset.job));
  tab.addEventListener("keydown", event => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowDown") next = (index + 1) % tabs.length;
    if (event.key === "ArrowUp") next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    tabs[next].focus(); showJob(tabs[next].dataset.job);
  });
});
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("open", open);
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open"); menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}));
const toast = document.querySelector(".toast");
let toastTimeout;
document.querySelector(".copy-phone").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("+1 (469) 213-8738");
    toast.textContent = "Phone number copied";
  } catch {
    toast.textContent = "Phone: +1 (469) 213-8738";
  }
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2200);
});
document.querySelector("#year").textContent = new Date().getFullYear();
