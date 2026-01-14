import os
import json
import re

# Folder to scan
NOTES_DIR = "notes"

PLAYERS = ["DM","ALGAAR","KRAG","LYBA","SADOSU","RAAL","TOHRU"]
FORBIDEN_TAGS = ["", ":|:", "|:", ":|", "-:|:"]
STATUS_TAGS = ["CRAFTSMAN", "CURSED", "DIVINE", "GUARD", "HEALER", "MAGIC", "MERCHANT", "MISSING", "NOBLE", "ROGUE", "SCHOLAR", "UNDEAD", "WARRIOR"]

def scan_folder(folder):
    result = {}
    for item in os.listdir(folder):
        path = os.path.join(folder, item)
        if os.path.isdir(path):
            # Recursively build subfolder structure
            result[item] = scan_folder(path)
        elif item.endswith(".md"):
            # Check if file contains --DEAD--
            is_dead = False
            arr = []
            with open(path, "r", encoding="utf-8") as md_file:
                content = md_file.read()

                tags = set(re.findall(r'--(.*?)--', content))
                for tag in tags:
                    tag = tag.upper()
                    if tag == "ALGAR":
                        tag = "ALGAAR"
                        is_dead = True
                    if FORBIDEN_TAGS.__contains__(tag) or STATUS_TAGS.__contains__(tag):
                        continue
                    if PLAYERS.__contains__(tag):
                        arr.append(tag)
                    else:
                        arr.append(f"--{tag}--")
            # Add file entry with marker if dead
            if len(arr) > 0:
                result[item] = arr
            else:
                result[item] = []
    return result

if __name__ == "__main__":
    nav_structure = {"notes": scan_folder(NOTES_DIR)}
    with open("source/json/NavBar.json", "w", encoding="utf-8") as f:
        json.dump(nav_structure, f, indent=2, ensure_ascii=False)
    print("notes.json updated!")