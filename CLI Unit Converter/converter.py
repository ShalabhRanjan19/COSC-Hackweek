
import argparse

def celsius_to_fahrenheit(c):
    return (c * 9/5) + 32

def fahrenheit_to_celsius(f):
    return (f - 32) * 5/9

parser = argparse.ArgumentParser(description="Convert temperatures between Celsius and Fahrenheit.")
parser.add_argument("unit", choices=["C", "F"], help="Input temperature unit: 'C' for Celsius or 'F' for Fahrenheit")
parser.add_argument("value", type=float, help="Temperature value to convert")

args = parser.parse_args()

if args.unit == "C":
    result = celsius_to_fahrenheit(args.value)
    print(f"{args.value}°C = {result:.2f}°F")
else:
    result = fahrenheit_to_celsius(args.value)
    print(f"{args.value}°F = {result:.2f}°C")
