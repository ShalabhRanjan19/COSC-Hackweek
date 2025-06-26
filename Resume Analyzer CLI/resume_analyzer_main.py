#!/usr/bin/env python3
"""
Resume Analyzer CLI Tool
Extracts text from PDF resumes, counts key skill mentions, and suggests improvements.
"""

import argparse
import sys
import os
from pathlib import Path
import re
from collections import Counter
from typing import Dict, List, Tuple
import json

try:
    import PyPDF2
    import pdfminer.high_level as pdfminer
except ImportError:
    print("Error: Required libraries not installed.")
    print("Please install with: pip install PyPDF2 pdfminer.six")
    sys.exit(1)

class ResumeAnalyzer:
    def __init__(self):
        self.tech_skills = {
            'programming_languages': [
                'python', 'java', 'javascript', 'typescript', 'c++', 'c#', 'php', 
                'ruby', 'go', 'rust', 'kotlin', 'swift', 'scala', 'r', 'matlab'
            ],
            'databases': [
                'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'sqlite', 
                'oracle', 'cassandra', 'elasticsearch', 'dynamodb'
            ],
            'ml_ai': [
                'machine learning', 'ml', 'artificial intelligence', 'ai', 
                'deep learning', 'neural networks', 'tensorflow', 'pytorch', 
                'scikit-learn', 'pandas', 'numpy', 'keras', 'opencv'
            ],
            'web_technologies': [
                'html', 'css', 'react', 'angular', 'vue', 'node.js', 'express', 
                'django', 'flask', 'spring', 'laravel', 'bootstrap'
            ],
            'cloud_devops': [
                'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 
                'git', 'github', 'gitlab', 'ci/cd', 'terraform', 'ansible'
            ],
            'data_tools': [
                'tableau', 'power bi', 'excel', 'spark', 'hadoop', 'kafka', 
                'airflow', 'jupyter', 'r studio'
            ]
        }
        
        self.soft_skills = [
            'leadership', 'communication', 'teamwork', 'problem solving',
            'project management', 'agile', 'scrum', 'collaboration',
            'analytical', 'creative', 'adaptable', 'detail-oriented'
        ]

    def extract_text_pymupdf(self, pdf_path: str) -> str:
        """Extract text using PyPDF2 as primary method"""
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text = ""
                for page in pdf_reader.pages:
                    text += page.extract_text() + "\n"
                return text
        except Exception as e:
            print(f"PyPDF2 extraction failed: {e}")
            return ""

    def extract_text_pdfminer(self, pdf_path: str) -> str:
        """Extract text using pdfminer as fallback"""
        try:
            return pdfminer.extract_text(pdf_path)
        except Exception as e:
            print(f"PDFMiner extraction failed: {e}")
            return ""

    def extract_text(self, pdf_path: str) -> str:
        """Extract text from PDF using multiple methods"""
        if not os.path.exists(pdf_path):
            raise FileNotFoundError(f"Resume file not found: {pdf_path}")
        
        # Try PyPDF2 first
        text = self.extract_text_pymupdf(pdf_path)
        
        # If PyPDF2 fails or returns minimal text, try pdfminer
        if len(text.strip()) < 100:
            print("Trying alternative extraction method...")
            text = self.extract_text_pdfminer(pdf_path)
        
        if len(text.strip()) < 50:
            raise ValueError("Could not extract meaningful text from PDF")
        
        return text

    def clean_text(self, text: str) -> str:
        """Clean and normalize extracted text"""
        # Remove extra whitespace and normalize
        text = re.sub(r'\s+', ' ', text)
        # Remove special characters but keep essential punctuation
        text = re.sub(r'[^\w\s\-\+\#\.\,\(\)]', ' ', text)
        return text.lower().strip()

    def count_skills(self, text: str) -> Dict[str, Dict[str, int]]:
        """Count occurrences of technical and soft skills"""
        results = {}
        
        # Count technical skills by category
        for category, skills in self.tech_skills.items():
            category_counts = {}
            for skill in skills:
                # Use word boundaries for more accurate matching
                pattern = r'\b' + re.escape(skill.lower()) + r'\b'
                count = len(re.findall(pattern, text))
                if count > 0:
                    category_counts[skill] = count
            
            if category_counts:
                results[category] = category_counts
        
        # Count soft skills
        soft_skill_counts = {}
        for skill in self.soft_skills:
            pattern = r'\b' + re.escape(skill.lower()) + r'\b'
            count = len(re.findall(pattern, text))
            if count > 0:
                soft_skill_counts[skill] = count
        
        if soft_skill_counts:
            results['soft_skills'] = soft_skill_counts
        
        return results

    def analyze_resume_structure(self, text: str) -> Dict[str, bool]:
        """Analyze resume structure and completeness"""
        structure_analysis = {}
        
        # Check for common resume sections
        sections = {
            'contact_info': [r'email', r'phone', r'@'],
            'experience': [r'experience', r'work history', r'employment'],
            'education': [r'education', r'degree', r'university', r'college'],
            'skills': [r'skills', r'technical skills', r'competencies'],
            'projects': [r'projects', r'portfolio']
        }
        
        for section, patterns in sections.items():
            found = any(re.search(pattern, text, re.IGNORECASE) for pattern in patterns)
            structure_analysis[section] = found
        
        return structure_analysis

    def generate_suggestions(self, skill_counts: Dict, structure: Dict) -> List[str]:
        """Generate improvement suggestions based on analysis"""
        suggestions = []
        
        # Structure suggestions
        if not structure.get('contact_info', False):
            suggestions.append("Add clear contact information (email, phone)")
        
        if not structure.get('skills', False):
            suggestions.append("Include a dedicated skills section")
        
        if not structure.get('projects', False):
            suggestions.append("Add a projects section to showcase your work")
        
        # Skill diversity suggestions
        total_categories = len(skill_counts)
        if total_categories < 3:
            suggestions.append("Consider adding more diverse technical skills")
        
        # Specific skill suggestions based on what's missing
        if 'programming_languages' not in skill_counts:
            suggestions.append("Include specific programming languages you know")
        
        if 'databases' not in skill_counts:
            suggestions.append("Mention database technologies if applicable")
        
        if 'cloud_devops' not in skill_counts:
            suggestions.append("Add cloud/DevOps skills if relevant to your field")
        
        if 'soft_skills' not in skill_counts:
            suggestions.append("Include soft skills like leadership, communication, teamwork")
        
        # Skill frequency suggestions
        for category, skills in skill_counts.items():
            if category != 'soft_skills' and len(skills) < 2:
                suggestions.append(f"Expand your {category.replace('_', ' ')} section")
        
        return suggestions

    def display_results(self, skill_counts: Dict, structure: Dict, suggestions: List[str], word_count: int):
        """Display analysis results in a formatted way"""
        print("\n" + "="*60)
        print("           RESUME ANALYSIS RESULTS")
        print("="*60)
        
        print(f"\n📊 DOCUMENT STATS:")
        print(f"   Total words extracted: {word_count}")
        
        print(f"\n🏗️  RESUME STRUCTURE:")
        for section, present in structure.items():
            status = "✅" if present else "❌"
            print(f"   {status} {section.replace('_', ' ').title()}")
        
        print(f"\n🔧 TECHNICAL SKILLS FOUND:")
        if not skill_counts:
            print("   No technical skills detected")
        else:
            for category, skills in skill_counts.items():
                if category != 'soft_skills':
                    print(f"\n   {category.replace('_', ' ').title()}:")
                    for skill, count in sorted(skills.items(), key=lambda x: x[1], reverse=True):
                        print(f"     • {skill.title()}: {count} mention(s)")
        
        if 'soft_skills' in skill_counts:
            print(f"\n💡 SOFT SKILLS FOUND:")
            for skill, count in sorted(skill_counts['soft_skills'].items(), key=lambda x: x[1], reverse=True):
                print(f"     • {skill.title()}: {count} mention(s)")
        
        print(f"\n📈 IMPROVEMENT SUGGESTIONS:")
        if not suggestions:
            print("   Great! Your resume covers all key areas.")
        else:
            for i, suggestion in enumerate(suggestions, 1):
                print(f"   {i}. {suggestion}")
        
        print("\n" + "="*60)

    def save_results(self, results: Dict, output_file: str):
        """Save results to JSON file"""
        with open(output_file, 'w') as f:
            json.dump(results, f, indent=2)
        print(f"\n💾 Results saved to: {output_file}")

def main():
    parser = argparse.ArgumentParser(
        description="Analyze PDF resumes for skills and structure",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python resume_analyzer.py resume.pdf
  python resume_analyzer.py resume.pdf --output results.json
  python resume_analyzer.py resume.pdf --detailed
        """
    )
    
    parser.add_argument('resume_path', help='Path to PDF resume file')
    parser.add_argument('--output', '-o', help='Save results to JSON file')
    parser.add_argument('--detailed', '-d', action='store_true', 
                       help='Show detailed analysis')
    
    args = parser.parse_args()
    
    # Validate file
    if not os.path.exists(args.resume_path):
        print(f"Error: File '{args.resume_path}' not found")
        sys.exit(1)
    
    if not args.resume_path.lower().endswith('.pdf'):
        print("Error: Please provide a PDF file")
        sys.exit(1)
    
    try:
        print("🔍 Analyzing resume...")
        analyzer = ResumeAnalyzer()
        
        # Extract and clean text
        raw_text = analyzer.extract_text(args.resume_path)
        clean_text = analyzer.clean_text(raw_text)
        word_count = len(clean_text.split())
        
        # Perform analysis
        skill_counts = analyzer.count_skills(clean_text)
        structure_analysis = analyzer.analyze_resume_structure(clean_text)
        suggestions = analyzer.generate_suggestions(skill_counts, structure_analysis)
        
        # Display results
        analyzer.display_results(skill_counts, structure_analysis, suggestions, word_count)
        
        # Save results if requested
        if args.output:
            results = {
                'file_analyzed': args.resume_path,
                'word_count': word_count,
                'skills_found': skill_counts,
                'structure_analysis': structure_analysis,
                'suggestions': suggestions
            }
            analyzer.save_results(results, args.output)
        
        if args.detailed:
            print(f"\n📄 EXTRACTED TEXT PREVIEW:")
            print("-" * 40)
            print(raw_text[:500] + "..." if len(raw_text) > 500 else raw_text)
    
    except Exception as e:
        print(f"Error analyzing resume: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()