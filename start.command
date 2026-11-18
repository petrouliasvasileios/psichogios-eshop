#!/bin/bash
cd "$(dirname "$0")" || exit 1
echo "▶ ΨΥΧΟΓΥΙΟΣ e-shop — τοπική εκκίνηση"
if [ ! -d node_modules ]; then
  echo "▶ Εγκατάσταση πακέτων (μία φορά, ~1-2 λεπτά)…"
  npm install --no-audit --no-fund || { echo "✗ Αποτυχία npm install"; read -r; exit 1; }
fi
( sleep 6; open http://localhost:3000 ) &
echo "▶ Εκκίνηση… άνοιγμα στο http://localhost:3000 (Ctrl+C για τερματισμό)"
npm run dev
