#!/bin/bash

echo "Searching for lingering 'next-router-worker' processes..."
PIDS=$(ps aux | grep next-router-worker | grep -v grep | awk '{print $2}')

if [ -z "$PIDS" ]; then
  echo "✅ No 'next-router-worker' processes found."
else
  echo "⚠️  Found processes: $PIDS"
  echo "Killing processes..."
  for PID in $PIDS; do
    kill -9 $PID && echo "Killed process $PID"
  done
fi

# Optional cleanup
if [ -d ".next" ]; then
  echo "Removing .next directory..."
  rm -rf .next
  echo "✅ .next directory removed."
else
  echo "No .next directory found."
fi

echo "🧼 Cleanup complete."
