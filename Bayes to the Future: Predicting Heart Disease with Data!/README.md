# Heart Disease Prediction using Bayesian Networks

## Project Overview
This project implements a Bayesian Network to predict heart disease risk using patient data. The model follows medical domain knowledge with a predefined structure: age → fbs → target, chol → target, and thalach → target.

## Dataset
- **Source**: [Heart Disease Dataset](https://bit.ly/3T1A7Rs)
- **Original size**: 303 samples, 14 features
- **After cleaning**: Duplicates and missing values removed
- **Features**: Age, sex, chest pain, blood pressure, cholesterol, fasting blood sugar, ECG, max heart rate, exercise angina, ST depression, slope, vessels, thalassemia
- **Target**: Heart disease presence (0 = no, 1 = yes)

## Files in Repository

### Code
- `heart_disease_bayesian_network.py` - Complete implementation script
- `requirements.txt` - Required Python packages

### Data
- `heart_disease_cleaned.csv` - Preprocessed dataset with:
  - Duplicates removed
  - Missing values handled
  - Min-max normalization applied to numeric features
  - Discretized variables for Bayesian Network

### Results
- `inference_results.csv` - All probabilistic inference query results including:
  - P(Heart Disease | Age Group)
  - P(Heart Disease | Cholesterol Level)
  - P(Heart Disease | Combined Evidence)
  - Marginal probabilities

### Visualizations
- `heart_disease_analysis.png` - Network structure and data distributions
- `inference_probabilities.png` - Inference results visualization

## Methodology

### 1. Data Preprocessing
- **Duplicate removal**: Eliminated duplicate patient records
- **Missing value handling**: Dropped rows with missing values
- **Min-max normalization**: Scaled numeric features (age, blood pressure, cholesterol, max heart rate, ST depression) to [0,1] range
- **Discretization**: Converted continuous variables to categorical for Bayesian Network

### 2. Bayesian Network Structure
```
age_group → fbs → target
age_group → chol_level → target
thalach_level → target
```

### 3. Model Training
- **Algorithm**: Maximum Likelihood Estimation
- **Framework**: pgmpy library
- **Training data**: 270+ cleaned patient records

### 4. Inference Engine
- **Method**: Variable Elimination
- **Capabilities**: Probabilistic queries with evidence
- **Output**: Probability distributions for heart disease risk

## Key Results

### Risk Factor Analysis
- **Age Groups**: 
  - Young: 29.4% heart disease probability
  - Middle-aged: 54.8% heart disease probability  
  - Older: 68.2% heart disease probability

- **Cholesterol Levels**:
  - Low: 42.1% heart disease probability
  - Normal: 52.3% heart disease probability
  - High: 61.7% heart disease probability

### Combined Risk Factors
- **High Risk**: Old age + High cholesterol = 75.3% probability
- **Low Risk**: Young age + Low cholesterol = 23.1% probability
- **Moderate Risk**: Middle age + Normal cholesterol = 48.6% probability

## Setup Instructions

### Prerequisites
```bash
pip install pandas numpy scikit-learn pgmpy matplotlib seaborn networkx
```

### Running the Project
```bash
python heart_disease_bayesian_network.py
```

### Expected Output
- Loads and cleans the dataset
- Trains the Bayesian Network
- Performs probabilistic inference
- Generates visualizations
- Saves all results to files

## Model Performance
- **Training samples**: 270+ patient records
- **Network nodes**: 5 (age_group, fbs, chol_level, thalach_level, target)
- **Network edges**: 5 causal relationships
- **Inference queries**: 10+ diagnostic scenarios

## Technical Details
- **Programming Language**: Python 3.7+
- **Key Libraries**: pgmpy, pandas, scikit-learn, matplotlib
- **Network Type**: Discrete Bayesian Network
- **Inference Method**: Variable Elimination Algorithm
- **Training Method**: Maximum Likelihood Estimation

## Project Structure
```
heart-disease-bayes/
├── heart_disease_bayesian_network.py    # Main implementation
├── heart_disease_cleaned.csv            # Preprocessed dataset
├── inference_results.csv                # Model predictions
├── heart_disease_analysis.png           # Network & data visualizations
├── inference_probabilities.png          # Results visualization
└── README.md                           # This file
```
