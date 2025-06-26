import requests
from bs4 import BeautifulSoup
import pandas as pd

url = "https://github.com/trending"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
}
response = requests.get(url, headers=headers)

if response.status_code != 200:
    print(f"Failed to fetch page. Status code: {response.status_code}")
    exit()

soup = BeautifulSoup(response.text, 'html.parser')

repos = soup.find_all('article', class_='Box-row')[:5]

repo_data = []

for repo in repos:
    anchor = repo.h2.a
    repo_name = anchor.text.strip().replace('\n', '').replace(' ', '')
    link = "https://github.com" + anchor['href']
    repo_data.append({'Repository Name': repo_name, 'Link': link})

df = pd.DataFrame(repo_data)
df.to_csv("top5_trending_repos.csv", index=False)
print("Saved top 5 trending repos to 'top5_trending_repos.csv'")
