import random
import time

def animate_roll():
    print("Rolling the dice", end="", flush=True)
    for _ in range(3):
        time.sleep(0.5)
        print(".", end="", flush=True)
    print()  # line break

def roll_dice():
    return random.randint(1, 6)

if __name__ == "__main__":
    input("Press Enter to roll the dice 🎲")
    animate_roll()
    result = roll_dice()
    print(f"You rolled: {result}")
