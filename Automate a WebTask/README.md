# 🤖 Instagram Automation with Selenium

This project automates a web task using Python and Selenium WebDriver.

It logs into Instagram using a dummy account, searches for the **@cbitosc** account (CBIT Open Source Community), follows it (if not already), extracts its public profile data, and saves that data into a text file.

---

## 📌 Features

- Automates login to Instagram
- Searches for a specific user
- Follows the user account
- Extracts:
  - Bio
  - Number of posts
  - Number of followers
  - Number of following
- Saves the data in a `cbitosc_info.txt` file

---

## 📂 Folder Structure

```
.
├── main.py               # Python script for automation
├── cbitosc_info.txt      # Extracted info from Instagram (manually added if script fails)
└── README.md             # Project documentation
```

---

## 📄 Sample Extracted Data

Manually added data (in case automation fails):

```
Account: @cbitosc
Bio: 
🚀 CBIT Open Source Community
💡 A student-led tech community @ CBIT
🔗 Projects | Events | Workshops
🌐 GitHub: github.com/cbitosc

Posts: 107
Followers: 2,395
Following: 3
```

---

## ⚙️ Tools & Technologies Used

- Python 3.x
- Selenium WebDriver
- ChromeDriver
- PyCharm or any code editor

---

## 🚀 How to Run

1. **Install dependencies**:
   ```bash
   pip install selenium
   ```

2. **Download ChromeDriver**:
   - Visit: https://sites.google.com/chromium.org/driver/
   - Download the version that matches your Chrome browser.
   - Place the `chromedriver.exe` in the same folder as `main.py`.

3. **Edit `main.py`**:
   Replace the placeholder credentials with your dummy Instagram login:
   ```python
   USERNAME = "your_dummy_username"
   PASSWORD = "your_dummy_password"
   ```

4. **Run the script**:
   ```bash
   python main.py
   ```

5. **Check output**:
   A file named `cbitosc_info.txt` will be created with extracted info.

---

## 🛑 Important Notes

- ⚠️ **Use a dummy Instagram account**. Do not use your personal or main account.
- 🔒 Instagram may temporarily block automation-like behavior.
- 🛠 If elements are not found, inspect the site manually and update XPaths.
- ⏳ The Instagram UI can change. This script might break and need updates.

---

## 📧 Contact

Made with ❤️ by **Shalabh Ranjan**  
Feel free to contribute or connect!
