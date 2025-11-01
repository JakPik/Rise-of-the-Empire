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
                file_path = os.path.join(root, f)
                is_dead = False
                # check for --DEAD-- tag
                with open(file_path, "r", encoding="utf-8") as md_file:
                    content = md_file.read()
                    if "--DEAD--" in content:
                        is_dead = True
                if is_dead:
                    result[top_folder][f] = "--DEAD--"  # empty object
                else:
                    result[top_folder][f] = {}  # empty object
    return result

if __name__ == "__main__":
    nav_structure = {"notes": scan_folder(NOTES_DIR)}
    with open("source/json/NavBar.json", "w", encoding="utf-8") as f:
        json.dump(nav_structure, f, indent=2, ensure_ascii=False)
    print("notes.json updated!")