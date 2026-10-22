#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
python3 serve.py --host 127.0.0.1 --port 8765
