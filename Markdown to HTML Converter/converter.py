import markdown
import argparse

def convert_markdown_to_html(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as md_file:
        text = md_file.read()
        html = markdown.markdown(text)

    with open(output_file, 'w', encoding='utf-8') as html_file:
        html_file.write(html)
    print(f"Converted '{input_file}' to '{output_file}' successfully!")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert Markdown to HTML")
    parser.add_argument("input", help="Path to the input markdown file")
    parser.add_argument("output", help="Path to the output HTML file")

    args = parser.parse_args()
    convert_markdown_to_html(args.input, args.output)
