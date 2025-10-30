import os
import json

# Folder to scan
NOTES_DIR = "notes"

def scan_folder(folder):
    result = {}
    for root, dirs, files in os.walk(folder):
        rel_root = os.path.relpath(root, folder)
        # Only top-level folder name (Sessions, NPCs, etc.)
        top_folder = rel_root.split(os.sep)[0] if rel_root != "." else ""
        for f in files:
            if f.endswith(".md"):
                if top_folder not in result:
                    result[top_folder] = {}
                result[top_folder][f] = {}  # empty object
    return result

if __name__ == "__main__":
    nav_structure = {"notes": scan_folder(NOTES_DIR)}
    with open("source/json/NavBar.json", "w", encoding="utf-8") as f:
        json.dump(nav_structure, f, indent=2, ensure_ascii=False)
    print("notes.json updated!")