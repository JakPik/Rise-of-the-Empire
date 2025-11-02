import os
import json

# Folder to scan
NOTES_DIR = "notes"

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
                if "--DEAD--" in content:
                    arr.append("--DEAD--")
                if "--P1--" in content:
                    arr.append("P1")
            # Add file entry with marker if dead
            if len(arr) > 0:
                text = "[" + arr[0]
                for i in range (1,len(arr)):
                    text += "," + arr[i]
                text += "]"
                result[item] = text
            else:
                result[item] = []
    return result

if __name__ == "__main__":
    nav_structure = {"notes": scan_folder(NOTES_DIR)}
    with open("source/json/NavBar.json", "w", encoding="utf-8") as f:
        json.dump(nav_structure, f, indent=2, ensure_ascii=False)
    print("notes.json updated!")