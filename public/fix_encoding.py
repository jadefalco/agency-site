#!/usr/bin/env python3
import sys

path = r'c:\Users\jdmen\Documents\GitHub\agency-site\portfolio\terra-cut-supply\assets\index-Bej5R9fp.js'

try:
    # Read the file
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Define replacements - using different approach
    replacements = [
        ('Ãƒâ€"', '×'),      # 300 width symbol
        ('Ã¢â‚¬Â³', '″'),    # inch symbol  
        ('Ã¢â‚¬â€œ', '–'),   # long dash
        ('Ã¢â‚¬Â¢', '•'),    # bullet
    ]
    
    # Apply replacements
    for old, new in replacements:
        count = content.count(old)
        if count > 0:
            content = content.replace(old, new)
            print(f"Replaced {count} instances of mojibake")
    
    # Write back
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Encoding fixed successfully!")
    
except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
    sys.exit(1)
