from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# --------------------------
# Configuration
# --------------------------
USERNAME = "uni.nformeduser" 
PASSWORD = "******"        

INSTAGRAM_URL = "https://www.instagram.com/"
TARGET_USERNAME = "cbitosc"

# --------------------------
# Start WebDriver
# --------------------------
driver = webdriver.Chrome()
driver.maximize_window()
driver.get(INSTAGRAM_URL)
wait = WebDriverWait(driver, 15)

# --------------------------
# Login to Instagram
# --------------------------
username_input = wait.until(EC.presence_of_element_located((By.NAME, "username")))
password_input = driver.find_element(By.NAME, "password")

username_input.send_keys(USERNAME)
password_input.send_keys(PASSWORD)
password_input.send_keys(Keys.ENTER)

# Wait for home page to load
wait.until(EC.presence_of_element_located((By.XPATH, "//nav")))


try:
    not_now = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[text()='Not now' or text()='Not Now']")))
    not_now.click()
except:
    pass

try:
    turn_off = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[text()='Not now' or text()='Not Now']")))
    turn_off.click()
except:
    pass

# --------------------------
# Search for target account
# --------------------------
try:
    search_box = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@aria-label='Search input']")))
    search_box.clear()
    search_box.send_keys(TARGET_USERNAME)
    time.sleep(2)
    search_box.send_keys(Keys.ENTER)
    time.sleep(1)
    search_box.send_keys(Keys.ENTER)
    time.sleep(5)
except Exception as e:
    print("Error during search:", e)
    driver.quit()
    exit()

# --------------------------
# Follow the account (if not followed)
# --------------------------
try:
    follow_button = wait.until(EC.presence_of_element_located((By.XPATH, "//button[text()='Follow']")))
    follow_button.click()
    print(f"Followed {TARGET_USERNAME}.")
    time.sleep(2)
except:
    print(f"Already following {TARGET_USERNAME} or follow button not found.")

# --------------------------
# Extract profile data
# --------------------------
try:
    # Wait for profile stats
    stats = wait.until(EC.presence_of_all_elements_located(
        (By.XPATH, "//ul[contains(@class, '_ac2a')]/li/div/span")
    ))
  
    # Wait for bio
    bio_element = wait.until(EC.presence_of_element_located(
        (By.XPATH, "//div[contains(@class, '_aacl') and contains(@class, '_aacx') and contains(@class, '_aad7')]")
    ))

    posts = stats[0].text
    followers = stats[1].text
    following = stats[2].text
    bio = bio_element.text

    # Save to file
    with open("cbitosc_info.txt", "w", encoding="utf-8") as file:
        file.write(f"Account: @{TARGET_USERNAME}\n")
        file.write(f"Bio: {bio}\n")
        file.write(f"Posts: {posts}\n")
        file.write(f"Followers: {followers}\n")
        file.write(f"Following: {following}\n")

    print("✅ Data written to cbitosc_info.txt")
except Exception as e:
    print("❌ Error extracting data:", str(e))

# --------------------------
# Close browser
# --------------------------
driver.quit()
