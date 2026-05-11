export const LANG_CONFIG = {
  typescript: {
    label: 'TypeScript', color: '#3178C6', mono: 'typescript',
    preview: "import { NextRequest } from 'next/server'\nexport async function POST(req: NextRequest) {",
  },
  javascript: {
    label: 'JavaScript', color: '#F7DF1E', mono: 'javascript',
    preview: "const express = require('express')\napp.post('/api', async (req, res) => {",
  },
  python: {
    label: 'Python', color: '#F7C948', mono: 'python',
    preview: "from fastapi import FastAPI, HTTPException\n@app.post('/items')",
  },
  rust: {
    label: 'Rust', color: '#CE422B', mono: 'rust',
    preview: "fn word_count(s: &str) -> HashMap<&str, usize> {\n    s.split_whitespace().fold(HashMap::new(), |mut m, w| {",
  },
  go: {
    label: 'Go', color: '#00ACD7', mono: 'go',
    preview: "func Handler(w http.ResponseWriter, r *http.Request) {\n    json.NewEncoder(w).Encode(response{OK: true})",
  },
  sql: {
    label: 'SQL', color: '#2ECC71', mono: 'sql',
    preview: "SELECT u.id, COUNT(o.id) AS orders, SUM(o.total)\nFROM users u JOIN orders o ON o.user_id = u.id",
  },
  cpp: {
    label: 'C++', color: '#659AD2', mono: 'cpp',
    preview: "vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int,int> seen;",
  },
  java: {
    label: 'Java', color: '#F89820', mono: 'java',
    preview: "public List<Integer> twoSum(int[] nums, int target) {\n    Map<Integer, Integer> seen = new HashMap<>();",
  },
  bash: {
    label: 'Bash', color: '#4EAA25', mono: 'shell',
    preview: "#!/usr/bin/env bash\nset -euo pipefail",
  },
}

export type LangKey = keyof typeof LANG_CONFIG
