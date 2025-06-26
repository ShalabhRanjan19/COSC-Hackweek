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
```bash
pip install -r requirements.txt
```

Or install manually:
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

## Example Output

```
============================================================
           RESUME ANALYSIS RESULTS
============================================================

📊 DOCUMENT STATS:
   Total words extracted: 342

🏗️  RESUME STRUCTURE:
   ✅ Contact Info
   ✅ Experience
   ✅ Education
   ✅ Skills
   ❌ Projects

🔧 TECHNICAL SKILLS FOUND:

   Programming Languages:
     • Python: 3 mention(s)
     • Java: 2 mention(s)
     • JavaScript: 1 mention(s)

   Databases:
     • SQL: 2 mention(s)
     • MySQL: 1 mention(s)

   Machine Learning:
     • Machine Learning: 2 mention(s)
     • TensorFlow: 1 mention(s)

💡 SOFT SKILLS FOUND:
     • Leadership: 1 mention(s)
     • Communication: 1 mention(s)

📈 IMPROVEMENT SUGGESTIONS:
   1. Add a projects section to showcase your work
   2. Add cloud/DevOps skills if relevant to your field
   3. Expand your web technologies section
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

## Limitations

- Only supports PDF files
- Accuracy depends on PDF text extraction quality
- Skill matching is based on exact word/phrase matching
- May not catch all variations of skill names

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.

## Development

To extend the skill categories, modify the `tech_skills` dictionary in the `ResumeAnalyzer` class. To add new analysis features, extend the `analyze_resume_structure` method.

## Troubleshooting

**Common Issues:**

1. **"Required libraries not installed"**
   - Run: `pip install PyPDF2 pdfminer.six`

2. **"Could not extract meaningful text from PDF"**
   - The PDF might be image-based or encrypted
   - Try converting to a text-based PDF first

3. **Low skill detection**
   - Ensure skills are spelled correctly in the resume
   - The tool looks for exact matches (case-insensitive)

## Sample Test

Create a test resume PDF with various skills mentioned and run:
```bash
python resume_analyzer.py test_resume.pdf --detailed --output test_results.json
```

This will show you exactly how the tool processes and analyzes resume content.