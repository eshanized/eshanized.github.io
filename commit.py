# Author        : Eshan Roy <eshanized@proton.me>
# Author URL    : https://eshanized.github.io

# NOTE: Run at your own risk.

import os
import subprocess

def commit_with_conventional_message(message, branch):
    # Check if the commit message is conventional
    if not is_conventional(message):
        print("Error: Commit message is not conventional")
        return

    # Add all changes
    subprocess.run(["git", "add", "."])

    # Commit with the conventional message
    subprocess.run(["git", "commit", "-m", message])

    # Push to GitHub
    subprocess.run(["git", "push", "origin", branch])

def pull_from_github(branch):
    # Pull from GitHub
    subprocess.run(["git", "pull", "origin", branch])

def is_conventional(message):
    # Check if the commit message is conventional
    conventional_types = [
        "build", 
        "chore", 
        "ci", 
        "docs", 
        "feat", 
        "fix", 
        "perf", 
        "refactor", 
        "revert", 
        "style", 
        "test",
        ]
    for type in conventional_types:
        if message.startswith(f"{commit_emojis[type]} {type}:") or message.startswith(f"{commit_emojis[type]} {type}("):
            return True
    return False

# Get the conventional commit message type from the user
print("Select a conventional commit message type:")
print("1. feat (new feature) 🎉")
print("2. fix (bug fix) 🔧")
print("3. perf (performance improvement) ⚡️")
print("4. refactor (code refactoring) 💡")
print("5. style (code style change) 💄")
print("6. test (new test) 🧪")
print("7. docs (documentation change) 📚")
print("8. build (build process change) 🏗️")
print("9. chore (miscellaneous task) 🧹")
print("10. revert (revert previous commit) 🚨")

option = int(input("Enter the number of your chosen option: "))

commit_types = [
    "feat", 
    "fix", 
    "perf", 
    "refactor", 
    "style", 
    "test", 
    "docs", 
    "build", 
    "chore", 
    "revert"
    ]
commit_type = commit_types[option - 1]

commit_emojis = {
    "feat": "🎉",
    "fix": "🔧",
    "perf": "⚡️",
    "refactor": "💡",
    "style": "💄",
    "test": "🧪",
    "docs": "📚",
    "build": "🏗️",
    "chore": "🧹",
    "revert": "🚨",
    "ci": "🤖"  # added ci key
}

# Get the scope and description from the user
scope = input("Enter the scope (optional): ")
description = input("Enter the description: ")

# Get the branch name from the user
branch = "master" # or "main", "development"

# Construct the conventional commit message
if scope:
    message = f"{commit_emojis[commit_type]} {commit_type}({scope}): {description}"
else:
    message = f"{commit_emojis[commit_type]} {commit_type}: {description}"

# Commit with the conventional message
commit_with_conventional_message(message, branch)

# Pull from GitHub
pull_from_github(branch)