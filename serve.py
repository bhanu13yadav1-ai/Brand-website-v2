#!/usr/bin/env python3
"""Simple local static server for the BLACKED Phase 1–2 review ZIP."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import argparse, os
parser=argparse.ArgumentParser()
parser.add_argument('--host', default='127.0.0.1')
parser.add_argument('--port', type=int, default=8765)
args=parser.parse_args()
os.chdir(Path(__file__).resolve().parent)
server=ThreadingHTTPServer((args.host,args.port),SimpleHTTPRequestHandler)
print(f'BLACKED review preview: http://{args.host}:{args.port}/index.html')
print(f'Diagnostics: http://{args.host}:{args.port}/phase2-image-diagnostics.html')
try: server.serve_forever()
except KeyboardInterrupt: print('Preview server stopped.')
finally: server.server_close()
