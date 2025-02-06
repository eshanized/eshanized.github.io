#!/bin/bash

# Author: Eshan Roy
# Date: 06-02-2025
# Description: This script automates the configuration of Git settings, including username, email, and other options.

# Color definitions
RESET="\e[0m"
GREEN="\e[32m"
RED="\e[31m"
YELLOW="\e[33m"
CYAN="\e[36m"

# Function to display usage
usage() {
    echo -e "${GREEN}Usage: $0 [options]${RESET}"
    echo -e "${YELLOW}Options:${RESET}"
    echo -e "  -h, --help                     Show this help message"
    exit 1
}

# Function to set Git username
set_git_username() {
    read -p "Enter your Git username: " GIT_USERNAME
    git config --global user.name "$GIT_USERNAME"
    echo -e "${GREEN}Git username set to: $GIT_USERNAME${RESET}"
}

# Function to set Git email
set_git_email() {
    read -p "Enter your Git email: " GIT_EMAIL
    git config --global user.email "$GIT_EMAIL"
    echo -e "${GREEN}Git email set to: $GIT_EMAIL${RESET}"
}

# Function to set default branch name
set_default_branch() {
    read -p "Enter your default branch name (e.g., main or master): " DEFAULT_BRANCH
    git config --global init.defaultBranch "$DEFAULT_BRANCH"
    echo -e "${GREEN}Default branch set to: $DEFAULT_BRANCH${RESET}"
}

# Function to set Git editor
set_git_editor() {
    read -p "Enter your preferred Git editor (e.g., vim, nano, code): " GIT_EDITOR
    git config --global core.editor "$GIT_EDITOR"
    echo -e "${GREEN}Git editor set to: $GIT_EDITOR${RESET}"
}

# Function to display current Git configuration
display_current_config() {
    echo -e "${CYAN}Current Git configuration:${RESET}"
    git config --list
}

# Parse command-line options
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -h|--help) usage ;;
        *) echo -e "${RED}Unknown option: $1${RESET}"; usage ;;
    esac
    shift
done

# Main menu for Git configuration
echo -e "${CYAN}Git Configuration Script${RESET}"
echo "Please choose an option:"
echo "1) Set Git username"
echo "2) Set Git email"
echo "3) Set default branch name"
echo "4) Set Git editor"
echo "5) Display current Git configuration"
echo "6) Exit"

while true; do
    read -p "Enter your choice (1-6): " choice
    case $choice in
        1) set_git_username ;;
        2) set_git_email ;;
        3) set_default_branch ;;
        4) set_git_editor ;;
        5) display_current_config ;;
        6) echo -e "${GREEN}Exiting...${RESET}"; exit 0 ;;
        *) echo -e "${RED}Invalid choice. Please try again.${RESET}" ;;
    esac
done