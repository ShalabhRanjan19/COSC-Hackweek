# Resume Analyzer CLI

A powerful Python command-line tool that analyzes PDF resumes to extract key information, count skill mentions, and provide improvement suggestions.

## Features

- **PDF Text Extraction**: Uses multiple extraction methods (PyPDF2 and pdfminer) for reliable text extraction
- **Skill Analysis**: Identifies and counts technical skills across multiple categories:
  - Programming Languages (Python, Java, JavaScript, etc.)
  - Databases (SQL, MySQL, MongoDB, etc.)
  - Machine Learning/AI (TensorFlow, PyTorch, etc.)
  - Web Technologies (React, Angular, Django, etc.)
  - Cloud/DevOps (AWS, Docker, Kubernetes, etc.)
  - Data Tools (Tableau, Power BI, etc.)
- **Soft Skills Detection**: Identifies leadership, communication, teamwork, and other soft skills
- **Structure Analysis**: Checks for essential resume sections (contact info, experience, education, skills, projects)
- **Improvement Suggestions**: Provides actionable recommendations to enhance the resume
- **Export Results**: Save analysis results to JSON format

## Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd resume-analyzer-cli
```

2. Install required dependencies:


 install :
```bash
pip install PyPDF2 pdfminer.six
```

## Usage

### Basic Analysis
```bash
python resume_analyzer.py path/to/resume.pdf
```

### Save Results to JSON
```bash
python resume_analyzer.py resume.pdf --output analysis_results.json
```

### Detailed Analysis (shows extracted text preview)
```bash
python resume_analyzer.py resume.pdf --detailed
```

### Help
```bash
python resume_analyzer.py --help
```


## Supported File Formats

- PDF files only (`.pdf` extension required)

## Technical Details

### Skill Categories Analyzed

1. **Programming Languages**: Python, Java, JavaScript, TypeScript, C++, C#, PHP, Ruby, Go, Rust, Kotlin, Swift, Scala, R, MATLAB
2. **Databases**: SQL, MySQL, PostgreSQL, MongoDB, Redis, SQLite, Oracle, Cassandra, Elasticsearch, DynamoDB
3. **ML/AI**: Machine Learning, Deep Learning, Neural Networks, TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy, Keras, OpenCV
4. **Web Technologies**: HTML, CSS, React, Angular, Vue, Node.js, Express, Django, Flask, Spring, Laravel, Bootstrap
5. **Cloud/DevOps**: AWS, Azure, GCP, Docker, Kubernetes, Jenkins, Git, GitHub, GitLab, CI/CD, Terraform, Ansible
6. **Data Tools**: Tableau, Power BI, Excel, Spark, Hadoop, Kafka, Airflow, Jupyter, R Studio

### Text Extraction Methods

The tool uses multiple PDF extraction methods for reliability:
1. **PyPDF2**: Primary extraction method
2. **pdfminer**: Fallback method for complex PDFs

### Structure Analysis

The tool checks for these essential resume sections:
- Contact information (email, phone)
- Work experience
- Education
- Skills section
- Projects/portfolio


## Contributing

Feel free to submit issues and enhancement requests!
Made with ❤️ Shalabh Ranjan

